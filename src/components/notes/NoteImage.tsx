import type { ComponentPropsWithoutRef } from "react";

type NoteImageProps = ComponentPropsWithoutRef<"img"> & {
  slug: string;
};

const NoteImage = ({ slug, src = "", alt = "" }: NoteImageProps) => {
  if (typeof src !== "string") return null;

  const realSrc = `/notes/${slug}/${src.substring(2, src.length)}`;

  return (
    <figure className="relative mt-3 -mb-2 overflow-hidden rounded-lg">
      <img
        className="mx-auto h-auto w-[90%]"
        src={realSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      {alt && (
        <figcaption className="mt-2 mb-6 text-center italic">{alt}</figcaption>
      )}
    </figure>
  );
};

export default NoteImage;
