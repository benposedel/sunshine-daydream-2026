import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] font-[family-name:var(--font-space-mono)]">
      <main className="flex flex-col items-center px-6 py-16 md:py-24 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-16 md:mb-20">
          <Image
            src="/wabodogs-logo.png"
            alt="WABO DOGS"
            width={500}
            height={80}
            priority
            className="w-[300px] md:w-[450px] lg:w-[500px]"
          />
        </div>

        {/* Presents text */}
        <p className="text-[#EECEC6]/60 text-xs tracking-[0.4em] uppercase mb-6">
          Presents
        </p>

        {/* Tournament Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-8 font-[family-name:var(--font-playfair)] tracking-tight">
          <span className="text-[#EECEC6] block">SUNSHINE</span>
          <span className="text-[#E85A4F] block">DAYDREAM</span>
        </h1>

        {/* Tagline */}
        <p className="text-[#EECEC6]/80 text-sm md:text-base tracking-[0.2em] uppercase mb-20 text-center">
          2 Person Scramble Golf Tournament
        </p>

        {/* Divider */}
        <div className="w-24 h-px bg-[#EECEC6]/20 mb-20" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full mb-20">
          {/* Date */}
          <div className="text-center">
            <div className="text-[#E85A4F] text-xs tracking-[0.3em] uppercase mb-3">
              When
            </div>
            <div className="text-[#EECEC6] text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">
              TBD
            </div>
            <div className="text-[#EECEC6]/50 text-sm mt-2">
              Date Coming Soon
            </div>
          </div>

          {/* Location */}
          <div className="text-center">
            <div className="text-[#E85A4F] text-xs tracking-[0.3em] uppercase mb-3">
              Where
            </div>
            <div className="text-[#EECEC6] text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">
              Glendoveer West
            </div>
            <div className="text-[#EECEC6]/50 text-sm mt-2">
              Portland, OR
            </div>
          </div>

          {/* Format */}
          <div className="text-center">
            <div className="text-[#E85A4F] text-xs tracking-[0.3em] uppercase mb-3">
              Format
            </div>
            <div className="text-[#EECEC6] text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">
              2 Person Scramble
            </div>
            <div className="text-[#EECEC6]/50 text-sm mt-2">
              Team Event
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl text-center mb-16">
          <p className="text-[#EECEC6]/70 text-base md:text-lg leading-relaxed">
            Join us for a day of golf, good vibes, and friendly competition at
            the beautiful Glendoveer West golf course. Grab your partner and
            get ready for a tournament you won&apos;t forget.
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href="/register"
          className="border border-[#E85A4F] text-[#E85A4F] py-4 px-10 text-xs tracking-[0.2em] uppercase hover:bg-[#E85A4F] hover:text-[#0F0F0F] transition-colors"
        >
          Register Now
        </Link>

        {/* Footer */}
        <footer className="mt-24 text-[#EECEC6]/30 text-xs tracking-[0.2em] uppercase">
          <p>A WABO DOGS Production</p>
        </footer>
      </main>
    </div>
  );
}
