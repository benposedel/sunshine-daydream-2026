"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/register", label: "Register" },
  { href: "/scoring", label: "Live Scoring" },
  { href: "/leaderboard", label: "Leaderboard" },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

interface NavOverlayProps {
  onClose: () => void;
}

export function NavOverlay({ onClose }: NavOverlayProps) {
  const pathname = usePathname();

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-40 bg-rich-black/95 backdrop-blur-md flex flex-col items-center justify-center"
    >
      {/* Lightning bolt accent */}
      <div className="absolute top-8 left-8 text-sunset-orange/20 text-6xl select-none">
        &#x26A1;
      </div>

      <motion.nav
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-8"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.div key={item.href} variants={itemVariants}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`text-3xl md:text-5xl font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors duration-200 ${
                  isActive
                    ? "text-sunset-orange"
                    : "text-foreground hover:text-golden-yellow"
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      {/* WABO DOGS logo */}
      <div className="absolute bottom-8" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <Image
          src="/wabodogs-logo.png"
          alt="WABO DOGS"
          width={150}
          height={30}
          className="opacity-40"
        />
      </div>
    </motion.div>
  );
}
