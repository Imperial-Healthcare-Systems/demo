import { industryContext } from "@/content/home";
import { ArtCarousel } from "@/components/ArtCarousel";

/**
 * The gallery beside the Industry Context copy.
 *
 * All the behaviour lives in `ArtCarousel` now — this only supplies the slides
 * and the two measurements that are specific to this set.
 *
 * On the frame: 9:8 holds the shape the single plate here originally had, so
 * adding six more images did not move the section's height. It is also the
 * widest frame the globe survives — it has 14.4% of blank height to give and
 * this crop takes 11.1%. Every slide covers rather than contains, so the card's
 * ground is never actually seen; it is set to the lightest plate's colour only
 * as a backstop while an image is still decoding.
 */
export function IndustryCarousel() {
  return (
    <ArtCarousel
      slides={industryContext.gallery}
      label="Industry context imagery"
      aspect="aspect-[9/8]"
      ground="bg-[#e7eefb]"
      /* A fixed width, not a vw fraction: the shell caps at 84rem, so this
         frame tops out at 731px however wide the screen gets. */
      sizes="(max-width: 1023px) 100vw, 760px"
    />
  );
}
