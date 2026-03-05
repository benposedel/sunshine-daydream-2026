"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { WeatherWidget } from "@/components/home/WeatherWidget";
import { CountdownTimer } from "@/components/home/CountdownTimer";

export default function GolfHome() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("golf-access") !== "true") {
      router.replace("/");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Illustration Header */}
        <div className="flex justify-center mb-12">
          <Image
            src="/daydream.png"
            alt="Sunshine Daydream 2026"
            width={900}
            height={1350}
            priority
            className="w-[280px] md:w-[400px] h-auto"
          />
        </div>

        {/* Weather + Countdown row */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mb-16">
          <WeatherWidget />
          <CountdownTimer />
        </div>

        {/* Info Grid */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
            <div className="text-center">
              <div className="text-text-muted text-xs tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-heading)]">
                When
              </div>
              <div className="text-foreground text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold">
                June 17, 2026
              </div>
              <div className="text-text-secondary text-sm mt-2 font-[family-name:var(--font-body)]">
                10:00 AM Shotgun Start
              </div>
            </div>

            <div className="text-center">
              <div className="text-text-muted text-xs tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-heading)]">
                Where
              </div>
              <div className="text-foreground text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold">
                Glendoveer West
              </div>
              <div className="text-text-secondary text-sm mt-2 font-[family-name:var(--font-body)]">
                Portland, OR
              </div>
            </div>

            <div className="text-center">
              <div className="text-text-muted text-xs tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-heading)]">
                Format
              </div>
              <div className="text-foreground text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold">
                2 Person Scramble
              </div>
              <div className="text-text-secondary text-sm mt-2 font-[family-name:var(--font-body)]">
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
              className="w-[250px] md:w-[350px] opacity-70"
            />
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-text-secondary text-base md:text-lg leading-relaxed font-[family-name:var(--font-body)]">
              Join us for a day of golf, good vibes, and friendly competition at
              the beautiful Glendoveer West golf course. Grab your partner and
              get ready for a tournament you won&apos;t forget.
            </p>
            <p className="text-accent-warm text-sm mt-4 italic font-[family-name:var(--font-body)]">
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
            <div className="bg-gray-900 text-white py-5 px-16 text-lg md:text-xl tracking-[0.15em] uppercase font-bold font-[family-name:var(--font-heading)] border-2 border-gray-900 hover:bg-gray-800 transition-all rounded-lg">
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
