import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { MEDIA_BUCKET, getSupabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

/**
 * Image upload for covers and in-article pictures.
 *
 * Goes to Supabase Storage rather than the repository, because the filesystem
 * a Vercel function sees is read-only and thrown away — anything written there
 * is gone by the next request. The bucket is public to read, which is what a
 * published article needs, and writes only ever happen through this route.
 */

/**
 * What we are prepared to accept.
 *
 * An allowlist of image types, and it is checked against the file's declared
 * type AND its extension. Neither is proof of anything on its own — a browser
 * will say what it is told to say — but the bucket only ever serves these back
 * as downloads to an `<img>`, and Supabase serves stored objects with the
 * content type recorded here rather than sniffing them. SVG is deliberately
 * absent: an SVG is a document that can carry script, and one served from this
 * origin would run with the site's privileges.
 */
const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

/** 8MB. Comfortably past any sane cover; short of anything that would time out. */
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const db = getSupabase();
  if (!db) {
    return NextResponse.json(
      { error: "No storage is connected, so there is nowhere to put this image." },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file was attached." }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "That file is empty." }, { status: 422 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `That image is ${(file.size / 1024 / 1024).toFixed(1)}MB. The limit is 8MB.` },
      { status: 413 },
    );
  }

  const extension = TYPES[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Images only — PNG, JPEG, WebP, GIF or AVIF." },
      { status: 415 },
    );
  }

  /*
    The stored name is ours, never theirs.

    A filename that arrives over HTTP is attacker-controlled: it can carry path
    segments, a second extension, or characters that mean something to a URL.
    The original is kept only as a slugified hint so the client can recognise
    their own file in the bucket, and the part that makes it unique is
    generated here.
  */
  const hint = slugify(file.name.replace(/\.[^.]+$/, "")).slice(0, 60) || "image";
  const unique = crypto.randomUUID().slice(0, 8);
  const path = `covers/${hint}-${unique}.${extension}`;

  const { error } = await db.storage
    .from(MEDIA_BUCKET)
    .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });

  if (error) {
    console.error("[admin] upload failed:", error.message);
    return NextResponse.json({ error: "The upload was refused." }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = db.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  return NextResponse.json({ ok: true, url: publicUrl });
}
