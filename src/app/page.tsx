import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen psychedelic-bg font-[family-name:var(--font-space-mono)] poster-border">
      {/* Lava lamp blobs */}
      <div className="lava-blob lava-blob-1" />
      <div className="lava-blob lava-blob-2" />
      <div className="lava-blob lava-blob-3" />
      <div className="lava-blob lava-blob-4" />
      <div className="lava-blob lava-blob-5" />
      <div className="lava-blob lava-blob-6" />
      <div className="lava-blob lava-blob-7" />
      <div className="lava-blob lava-blob-8" />

      <main className="flex flex-col items-center px-6 py-16 md:py-24 max-w-5xl mx-auto">

        {/* Logo */}
        <div className="mb-10 md:mb-12">
          <Image
            src="/wabodogs-logo.png"
            alt="WABO DOGS"
            width={500}
            height={80}
            priority
            className="w-[280px] md:w-[400px] lg:w-[450px]"
          />
        </div>

        {/* Presents text - ribbon style */}
        <div className="ribbon-banner mb-8">
          <p className="text-[#0F2438] text-xs tracking-[0.4em] uppercase font-bold">
            Presents
          </p>
        </div>

        {/* Tournament Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-4 font-[family-name:var(--font-playfair)] tracking-tight">
          <span className="text-[#F5E6D3] block psychedelic-glow">SUNSHINE</span>
          <span className="wavy-text block">DAYDREAM</span>
        </h1>

        {/* Tagline */}
        <p className="text-[#6CB4EE] text-sm md:text-base tracking-[0.2em] uppercase mb-8 text-center">
          2 Person Scramble Golf Tournament
        </p>

        {/* Dancing Bears */}
        <div className="mb-10">
          <Image
            src="/dancing-bears.png"
            alt="Dancing Bears"
            width={400}
            height={80}
            className="w-[280px] md:w-[350px] lg:w-[400px]"
          />
        </div>

        {/* CTA Button - Prominent */}
        <Link
          href="/register"
          className="group relative mb-16 transform hover:scale-105 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-[#E84A8A] blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-[#E84A8A] text-[#0F2438] py-5 px-16 text-lg md:text-xl tracking-[0.15em] uppercase font-bold border-4 border-[#C41E3A] shadow-[0_0_30px_rgba(232,74,138,0.5)] hover:shadow-[0_0_50px_rgba(232,74,138,0.8)] transition-all">
            Register Now
          </div>
        </Link>

        {/* Info Grid - in ornate frame */}
        <div className="ornate-frame w-full max-w-3xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Date */}
            <div className="text-center">
              <div className="text-[#E84A8A] text-xs tracking-[0.3em] uppercase mb-3">
                When
              </div>
              <div className="text-[#F5E6D3] text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">
                TBD
              </div>
              <div className="text-[#6CB4EE]/70 text-sm mt-2">
                Date Coming Soon
              </div>
            </div>

            {/* Location */}
            <div className="text-center">
              <div className="text-[#E84A8A] text-xs tracking-[0.3em] uppercase mb-3">
                Where
              </div>
              <div className="text-[#F5E6D3] text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">
                Glendoveer West
              </div>
              <div className="text-[#6CB4EE]/70 text-sm mt-2">
                Portland, OR
              </div>
            </div>

            {/* Format */}
            <div className="text-center">
              <div className="text-[#E84A8A] text-xs tracking-[0.3em] uppercase mb-3">
                Format
              </div>
              <div className="text-[#F5E6D3] text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">
                2 Person Scramble
              </div>
              <div className="text-[#6CB4EE]/70 text-sm mt-2">
                Team Event
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl text-center mb-10">
          <p className="text-[#F5E6D3]/80 text-base md:text-lg leading-relaxed">
            Join us for a day of golf, good vibes, and friendly competition at
            the beautiful Glendoveer West golf course. Grab your partner and
            get ready for a tournament you won&apos;t forget.
          </p>
          <p className="text-[#DAA520] text-sm mt-4 italic">
            &quot;What a long strange trip it&apos;s been&quot;
          </p>
        </div>

        {/* Footer */}
        <footer className="text-[#6CB4EE]/50 text-xs tracking-[0.2em] uppercase">
          <p>A WABO DOGS Production</p>
        </footer>
      </main>
    </div>
  );
}
