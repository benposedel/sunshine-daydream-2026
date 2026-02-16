import Link from "next/link";
import Image from "next/image";
import { VideoHero } from "@/components/home/VideoHero";
import { WeatherWidget } from "@/components/home/WeatherWidget";
import { CountdownTimer } from "@/components/home/CountdownTimer";

export default function Home() {
  const videoId = process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID || "";

  return (
    <div className="min-h-screen bg-rich-black noise-overlay">
      {/* Lava blobs */}
      <div className="lava-blob lava-blob-1" />
      <div className="lava-blob lava-blob-2" />
      <div className="lava-blob lava-blob-3" />
      <div className="lava-blob lava-blob-5" />
      <div className="lava-blob lava-blob-7" />

      {/* Video Hero */}
      <VideoHero videoId={videoId || undefined} />

      {/* Content below hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Weather + Countdown row */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mb-16">
          <WeatherWidget />
          <CountdownTimer />
        </div>

        {/* About Section */}
        <div className="glass-card p-8 md:p-12 mb-12">
          {/* WABO DOGS logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/wabodogs-logo.png"
              alt="WABO DOGS"
              width={300}
              height={50}
              className="w-[180px] md:w-[260px]"
            />
          </div>

          <div className="ribbon-banner mx-auto w-fit mb-8">
            <p className="text-rich-black text-xs tracking-[0.4em] uppercase font-bold font-[family-name:var(--font-heading)]">
              Presents
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
            <div className="text-center">
              <div className="text-rose-magenta text-xs tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-heading)]">
                When
              </div>
              <div className="text-foreground text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold">
                TBD
              </div>
              <div className="text-electric-teal/70 text-sm mt-2 font-[family-name:var(--font-body)]">
                Date Coming Soon
              </div>
            </div>

            <div className="text-center">
              <div className="text-rose-magenta text-xs tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-heading)]">
                Where
              </div>
              <div className="text-foreground text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold">
                Glendoveer West
              </div>
              <div className="text-electric-teal/70 text-sm mt-2 font-[family-name:var(--font-body)]">
                Portland, OR
              </div>
            </div>

            <div className="text-center">
              <div className="text-rose-magenta text-xs tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-heading)]">
                Format
              </div>
              <div className="text-foreground text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold">
                2 Person Scramble
              </div>
              <div className="text-electric-teal/70 text-sm mt-2 font-[family-name:var(--font-body)]">
                Team Event
              </div>
            </div>
          </div>

          {/* Dancing Bears */}
          <div className="flex justify-center mb-8">
            <Image
              src="/dancing-bears.png"
              alt="Dancing Bears"
              width={400}
              height={80}
              className="w-[250px] md:w-[350px] opacity-80"
            />
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-[family-name:var(--font-body)]">
              Join us for a day of golf, good vibes, and friendly competition at
              the beautiful Glendoveer West golf course. Grab your partner and
              get ready for a tournament you won&apos;t forget.
            </p>
            <p className="text-golden-yellow text-sm mt-4 italic font-[family-name:var(--font-body)]">
              &quot;What a long strange trip it&apos;s been&quot;
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-16">
          <Link
            href="/register"
            className="group relative transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-sunset-orange blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-sunset-orange text-rich-black py-5 px-16 text-lg md:text-xl tracking-[0.15em] uppercase font-bold font-[family-name:var(--font-heading)] border-2 border-golden-yellow/50 shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:shadow-[0_0_50px_rgba(255,107,53,0.5)] transition-all rounded-lg">
              Register Now
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-foreground/30 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
          <p>A WABO DOGS Production</p>
        </footer>
      </div>
    </div>
  );
}
