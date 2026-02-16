"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import YouTube, { type YouTubeEvent } from "react-youtube";

interface VideoHeroProps {
  videoId?: string;
  localVideoSrc?: string;
}

export function VideoHero({ videoId, localVideoSrc }: VideoHeroProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const onReady = useCallback((event: YouTubeEvent) => {
    event.target.mute();
    event.target.playVideo();
    setIsVideoReady(true);
  }, []);

  // Local video source takes priority
  if (localVideoSrc) {
    return (
      <div className="relative w-full h-[80vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={localVideoSrc} type="video/mp4" />
        </video>
        <HeroOverlay />
      </div>
    );
  }

  // YouTube embed
  if (videoId) {
    return (
      <div className="relative w-full h-[80vh] overflow-hidden bg-rich-black">
        {/* Poster image / click-to-play on mobile */}
        {!showVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 z-10 cursor-pointer group md:hidden"
            aria-label="Play video"
          >
            <Image
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Sunshine Daydream"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-rich-black/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-sunset-orange/90 flex items-center justify-center group-hover:bg-sunset-orange transition-colors">
                <svg className="w-8 h-8 text-rich-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}

        {/* Desktop: auto-play. Mobile: show after tap */}
        <div className={`absolute inset-0 ${!showVideo ? "hidden md:block" : ""}`}>
          <YouTube
            videoId={videoId}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                mute: 1,
                loop: 1,
                playlist: videoId,
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
                playsinline: 1,
              },
            }}
            onReady={onReady}
            className={`absolute inset-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:object-cover transition-opacity duration-1000 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
            style={{ position: "absolute", top: "-60px", left: 0, right: 0, bottom: "-60px" }}
          />
        </div>

        <HeroOverlay />
      </div>
    );
  }

  // Fallback: gradient hero
  return (
    <div className="relative w-full h-[80vh] overflow-hidden psychedelic-bg">
      <div className="lava-blob lava-blob-1" />
      <div className="lava-blob lava-blob-3" />
      <div className="lava-blob lava-blob-5" />
      <HeroOverlay />
    </div>
  );
}

function HeroOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
      {/* Dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/50 to-transparent" />

      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-[family-name:var(--font-heading)] font-bold tracking-tight mb-2">
          <span className="text-foreground block psychedelic-glow">SUNSHINE</span>
          <span className="wavy-text block">DAYDREAM</span>
        </h1>
        <p className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold text-golden-yellow mt-2">
          2026
        </p>
        <p className="text-foreground/70 text-sm md:text-base tracking-[0.2em] uppercase mt-4 font-[family-name:var(--font-body)]">
          Glendoveer West &bull; Portland, Oregon
        </p>
      </div>
    </div>
  );
}
