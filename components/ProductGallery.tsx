'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  image: string;
  name: string;
}

export default function ProductGallery({ image, name }: ProductGalleryProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full aspect-[4/5] bg-cream/5 rounded-2xl overflow-hidden cursor-zoom-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-transform duration-700 ease-out ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        priority
      />
    </div>
  );
}
