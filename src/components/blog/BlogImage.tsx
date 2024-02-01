import * as React from "react";
import Image from "next/image";

// aspect-w-1 aspect-h-1 sm:aspect-w-3 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9

const BlogImage = ({ children, slug, src, alt, ...props }: any) => {
  const realSrc = `/blog/${slug}/${src.substring(2, src.length)}`;
  return (
    <div className=" w-auto h-auto relative rounded-lg mt-3 -mb-2 overflow-hidden">
      {/* <Image
        {...props}
        alt={alt}
        src={realSrc}
        className="w-full rounded-lg object-contain object-center transition"
        fill={true}
      /> */}
      <img
        className="w-[90%] mx-auto border-2 border-black dark:border-white"
        src={realSrc}
        alt={alt}
      />
      <p className="italic text-center mt-3">{alt}</p>
    </div>
  );
};

export default BlogImage;
