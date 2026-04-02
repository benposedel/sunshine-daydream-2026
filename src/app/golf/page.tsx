"use client";

import Link from "next/link";
import Image from "next/image";
import { WeatherWidget } from "@/components/home/WeatherWidget";
import { CountdownTimer } from "@/components/home/CountdownTimer";

export default function GolfHome() {
  return (
    <div className="min-h-screen bg-white">
      {/* Full-width banner */}
      <div className="w-full mb-20">
        {/* Wide banner for desktop */}
        <Image
          src="/daydream-wide.png"
          alt="Sunshine Daydream 2026"
          width={1600}
          height={900}
          priority
          className="hidden md:block w-full h-auto"
        />
        {/* Vertical image for mobile */}
        <Image
          src="/daydream.png"
          alt="Sunshine Daydream 2026"
          width={900}
          height={1350}
          priority
          className="md:hidden w-full h-auto"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20">

        {/* Weather + Countdown row */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mb-20">
          <WeatherWidget />
          <CountdownTimer />
        </div>

        {/* Info — vertical spec sheet */}
        <div className="max-w-lg mx-auto mb-20">
          <div className="divide-y divide-border">
            <div className="py-6">
              <p className="text-text-muted text-[10px] tracking-[0.3em] uppercase mb-2 font-[family-name:var(--font-heading)]">
                When
              </p>
              <p className="text-foreground text-xl md:text-2xl font-[family-name:var(--font-heading)] font-bold">
                June 14, 2026
              </p>
              <p className="text-text-secondary text-sm mt-1 font-[family-name:var(--font-body)]">
                First tee time @ 10:00 AM
              </p>
            </div>

            <div className="py-6">
              <p className="text-text-muted text-[10px] tracking-[0.3em] uppercase mb-2 font-[family-name:var(--font-heading)]">
                Where
              </p>
              <p className="text-foreground text-xl md:text-2xl font-[family-name:var(--font-heading)] font-bold">
                Glendoveer West
              </p>
              <p className="text-text-secondary text-sm mt-1 font-[family-name:var(--font-body)]">
                Portland, OR
              </p>
            </div>

            <div className="py-6">
              <p className="text-text-muted text-[10px] tracking-[0.3em] uppercase mb-2 font-[family-name:var(--font-heading)]">
                Format
              </p>
              <p className="text-foreground text-xl md:text-2xl font-[family-name:var(--font-heading)] font-bold">
                2 Person Scramble
              </p>
              <p className="text-text-secondary text-sm mt-1 font-[family-name:var(--font-body)]">
                Team Event
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <p className="text-text-secondary text-base leading-relaxed font-[family-name:var(--font-body)]">
              Join us for a day of golf, good vibes, and friendly competition at
              the beautiful Glendoveer West golf course. Grab your partner and
              get ready for a tournament you won&apos;t forget.
            </p>
            <p className="text-text-muted text-xs mt-6 italic font-[family-name:var(--font-heading)] tracking-wide">
              &quot;What a long strange trip it&apos;s been&quot;
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-20">
          <Link
            href="/register"
            className="group"
          >
            <div className="border-2 border-foreground text-foreground py-4 px-14 text-sm tracking-[0.2em] uppercase font-bold font-[family-name:var(--font-heading)] hover:bg-foreground hover:text-white transition-colors">
              Register Now
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-text-muted text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
          <p>A WABO DOGS Production</p>
        </footer>
      </div>
    </div>
  );
}
