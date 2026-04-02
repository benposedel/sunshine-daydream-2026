"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// April 6, 2026 3:00 PM PDT (UTC-7)
const LAUNCH_TIME = new Date("2026-04-06T22:00:00Z").getTime();

export default function TeaserPage() {
  const router = useRouter();

  useEffect(() => {
    function checkLaunch() {
      if (Date.now() >= LAUNCH_TIME) {
        router.replace("/golf");
      }
    }

    // Check immediately on load
    checkLaunch();

    // Check every second so it redirects right at 3 PM
    const interval = setInterval(checkLaunch, 1000);
    return () => clearInterval(interval);
  }, [router]);

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

      {/* Blur + dark overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/40" />

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
