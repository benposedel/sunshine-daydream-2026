"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [iosDevice, setIosDevice] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or already installed
    if (localStorage.getItem("pwa-install-dismissed")) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if ((navigator as unknown as { standalone?: boolean }).standalone) return; // iOS standalone check

    const visits = parseInt(localStorage.getItem("pwa-visit-count") || "0", 10) + 1;
    localStorage.setItem("pwa-visit-count", String(visits));

    if (isIOS()) {
      setIosDevice(true);
      if (visits >= 2) setShow(true);
      return;
    }

    // Android/Chrome install prompt
    function handlePrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (visits >= 2) setShow(true);
    }

    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShow(false);
    }
    setDeferredPrompt(null);
  }

  function handleDismiss() {
    setShow(false);
    localStorage.setItem("pwa-install-dismissed", "true");
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 z-50 glass-card p-4 border border-electric-teal/30 max-w-md mx-auto"
          style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-foreground text-sm font-[family-name:var(--font-heading)] font-bold mb-1">
                Install Sunshine Daydream
              </p>
              {iosDevice ? (
                <p className="text-foreground/50 text-xs font-[family-name:var(--font-body)]">
                  Tap the Share button{" "}
                  <span className="inline-block text-base align-middle">&#x2B06;&#xFE0E;</span>{" "}
                  then &ldquo;Add to Home Screen&rdquo; for the best experience on tournament day
                </p>
              ) : (
                <p className="text-foreground/50 text-xs font-[family-name:var(--font-body)]">
                  Add to your home screen for the best experience on tournament day
                </p>
              )}
            </div>
            <button
              onClick={handleDismiss}
              className="text-foreground/40 hover:text-foreground/60 transition-colors text-lg leading-none cursor-pointer"
              aria-label="Dismiss"
            >
              &times;
            </button>
          </div>
          {!iosDevice && deferredPrompt && (
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleInstall}
                className="flex-1 py-2.5 bg-electric-teal text-rich-black text-sm font-[family-name:var(--font-heading)] font-bold uppercase tracking-wider rounded-lg hover:bg-electric-teal/90 transition-colors cursor-pointer"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="py-2.5 px-4 text-foreground/50 text-sm font-[family-name:var(--font-body)] hover:text-foreground/70 transition-colors cursor-pointer"
              >
                Not now
              </button>
            </div>
          )}
          {iosDevice && (
            <div className="flex justify-end mt-3">
              <button
                onClick={handleDismiss}
                className="py-2 px-4 text-foreground/50 text-sm font-[family-name:var(--font-body)] hover:text-foreground/70 transition-colors cursor-pointer"
              >
                Got it
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
