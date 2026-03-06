"use client";

import { motion, AnimatePresence } from "framer-motion";

interface OfflineIndicatorProps {
  isOnline: boolean;
  pendingCount: number;
  syncedMessage: boolean;
}

export function OfflineIndicator({ isOnline, pendingCount, syncedMessage }: OfflineIndicatorProps) {
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center py-2 px-4 bg-amber-50 border border-amber-200 mb-4"
        >
          <p className="text-amber-700 text-xs font-[family-name:var(--font-body)]">
            Offline — scores will sync when connected
            {pendingCount > 0 && (
              <span className="ml-1 text-amber-500">
                ({pendingCount} pending)
              </span>
            )}
          </p>
        </motion.div>
      )}
      {syncedMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center py-2 px-4 bg-green-50 border border-green-200 mb-4"
        >
          <p className="text-accent text-xs font-[family-name:var(--font-body)]">
            Scores synced!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
