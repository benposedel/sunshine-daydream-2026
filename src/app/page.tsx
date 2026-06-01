import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20 relative">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/wabodogs-logo-color.png"
          alt="WABO DOGS"
          width={600}
          height={120}
          priority
          className="w-[280px] md:w-[500px]"
        />
      </div>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-heading)] mb-16">
        Sports and Leisure Club
      </p>

      {/* Activity Buttons */}
      <div className="flex gap-4 md:gap-6 mb-20">
        {/* Golf */}
        <Link
          href="/golf"
          className="w-28 h-28 md:w-36 md:h-36 border-2 border-gray-200 bg-white hover:border-gray-900 transition-colors duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer group"
        >
          <span className="text-3xl md:text-4xl">&#x26F3;</span>
          <span className="text-gray-900 text-sm md:text-base font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase">
            Golf
          </span>
        </Link>

        {/* Running - coming soon */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 border-2 border-gray-200 bg-white flex flex-col items-center justify-center gap-2 opacity-60 group">
          <span className="text-3xl md:text-4xl">&#x1F3C3;</span>
          <span className="text-gray-400 text-sm md:text-base font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase">
            Running
          </span>
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-gray-500 text-xs font-[family-name:var(--font-heading)] font-bold tracking-[0.2em] uppercase">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Softball - coming soon */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 border-2 border-gray-200 bg-white flex flex-col items-center justify-center gap-2 opacity-60 group">
          <span className="text-3xl md:text-4xl">&#x1F94E;</span>
          <span className="text-gray-400 text-sm md:text-base font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase">
            Softball
          </span>
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-gray-500 text-xs font-[family-name:var(--font-heading)] font-bold tracking-[0.2em] uppercase">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Board of Directors Link */}
      <Link
        href="/board"
        className="text-gray-400 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] hover:text-gray-900 transition-colors border-b border-gray-300 hover:border-gray-900 pb-1"
      >
        Board of Directors
      </Link>
    </div>
  );
}
