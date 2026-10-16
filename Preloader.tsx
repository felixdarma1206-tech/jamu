"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
}

export default function Preloader({ progress, isLoaded }: PreloaderProps) {
  // Smoothly interpolated displayed count (0 to 100)
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let animId: number;
    const target = isLoaded ? 100 : Math.min(100, Math.round(progress));

    const step = () => {
      setDisplayCount((prev) => {
        if (prev >= target) return target;
        // Smooth lerp speed
        const diff = target - prev;
        const increment = Math.max(1, Math.ceil(diff * 0.15));
        return Math.min(target, prev + increment);
      });
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [progress, isLoaded]);

  return (
    <AnimatePresence>
      {(!isLoaded || displayCount < 100) && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-12 bg-[#170903] text-[#fef3c7] overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient warm glow behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-600/20 via-yellow-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

          {/* Top header */}
          <div className="flex items-center justify-between text-xs tracking-widest uppercase text-amber-200/60 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              FKIP UNIVERSITAS LAMPUNG
            </span>
            <span className="hidden sm:inline text-amber-400/80 font-semibold tracking-wider">
              WARISAN HERBAL NUSANTARA
            </span>
            <span className="font-mono text-amber-300">0896 3729 0260</span>
          </div>

          {/* Center Brand & Loading Counter */}
          <div className="my-auto flex flex-col items-center text-center px-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-amber-500/25 bg-amber-950/40 backdrop-blur-md text-amber-300 text-xs tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>JAMU PAK SYAWIRAN</span>
            </motion.div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3">
              Menyeduh Tradisi.
            </h1>
            <p className="text-amber-200/70 text-sm md:text-base max-w-md font-light mb-8 leading-relaxed">
              Mempersiapkan visual interaktif rempah kunyit & beras kencur segar untuk harimu.
            </p>

            {/* Giant Monospace Numeric Counter */}
            <div className="font-mono text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 tracking-tighter">
              {displayCount}%
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-xl mx-auto space-y-3">
            <div className="flex justify-between text-xs font-mono text-amber-400/80">
              <span className="tracking-wider">MEMUAT BOTOL HERBAL</span>
              <span>{Math.round((displayCount / 100) * 240)} / 240 FRAMES</span>
            </div>
            <div className="h-1.5 w-full bg-amber-950/80 rounded-full overflow-hidden border border-amber-800/40 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 rounded-full"
                style={{ width: `${displayCount}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
