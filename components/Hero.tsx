import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background Image */}
      <img
        src="/sb-speaking.png"
        alt="Sebastian Bimbi"
        className="w-full h-full object-cover opacity-80"
      />

      {/* Overlay Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </header>
  );
};

export default Hero;