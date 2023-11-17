"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type HeroImage = {
  src: string;
  alt: string;
  base64: string;
};

type HeroImageProps = {
  images: HeroImage[];
};

function getRandomInt(a: number, b: number = 0) {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function HeroImage({ images }: HeroImageProps) {
  const [index, setIndex] = useState({
    value: 0,
    updated: false,
  });

  useEffect(() => {
    if (index.updated) {
      return;
    }

    setIndex({ value: getRandomInt(images.length - 1), updated: true });
  }, [index.updated, images.length]);

  const image = images[index.value];

  return (
    index.updated && (
      <Image
        src={image.src}
        alt={image.alt}
        blurDataURL={image.base64}
        placeholder="blur"
        priority
        width={900}
        height={600}
        quality={100}
        className="object-cover"
      />
    )
  );
}

export default HeroImage;
