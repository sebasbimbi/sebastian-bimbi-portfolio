import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <header className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background Image */}
      <Image
        src="/images/sb-speaking.webp"
        alt="Sebastian Bimbi"
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover opacity-80"
      />

      {/* Overlay Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </header>
  );
};

export default Hero;