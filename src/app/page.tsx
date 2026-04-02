"use client";

export default function TeaserPage() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Looping background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/teaser.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text overlay */}
      <div className="relative z-10 text-center px-4 w-full">
        <h1 className="text-white font-[family-name:var(--font-heading)] font-bold uppercase leading-[1.1] tracking-tight">
          <span className="block text-[clamp(2rem,10vw,8rem)]">
            Registration Opens
          </span>
          <span className="block text-[clamp(1.4rem,6vw,5rem)] mt-2 md:mt-4">
            Monday, April 6th @ 3:00 PM PDT
          </span>
        </h1>
      </div>
    </div>
  );
}
