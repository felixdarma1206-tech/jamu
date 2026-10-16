"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Clock, MapPin, Sparkles, ShieldCheck, Leaf, Award } from "lucide-react";

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["rgba(254, 243, 199, 0.2)", "#ffffff"]);

  return (
    <motion.span style={{ opacity, color }} className="inline">
      {char}
    </motion.span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const storyText =
    "Berakar dari tradisi racikan jamu asli Jawa, Jamu Pak Syawiran hadir setiap sore di kawasan FKIP Universitas Lampung. Mulai beroperasi tepat pukul 15.30 WIB hingga habis, gerobak sederhana ini menjadi tempat singgah pelepas dahaga sekaligus pemulih stamina favorit mahasiswa dan dosen. Setiap tetes diseduh murni dari kunyit segar, kencur wangi, jahe merah, dan gula aren asli tanpa pemanis buatan maupun pengawet kimia.";

  const words = storyText.split(" ");
  let totalChars = 0;
  words.forEach((w) => (totalChars += w.length));

  let runningCharCount = 0;

  return (
    <section
      ref={sectionRef}
      id="tentang"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-[#180a03] text-[#fef3c7] overflow-hidden border-t border-amber-900/40"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Pill & Operating Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/40 text-amber-300 text-xs font-mono tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>KISAH GEROBAK LEGENDA FKIP UNILA</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-amber-300/80">
            <span className="flex items-center gap-1.5 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              15.30 WIB - HABIS
            </span>
            <span className="flex items-center gap-1.5 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              DEPAN FKIP UNILA
            </span>
          </div>
        </div>

        {/* Section Headline */}
        <h2 className="text-xl md:text-2xl font-mono text-amber-400/90 uppercase tracking-widest mb-8">
          Tentang Pak Syawiran & Tradisi Rempah
        </h2>

        {/* Text Reveal Component (Scroll Scrub Character-by-Character with Word Wrap Safety) */}
        <div className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-[1.45] tracking-tight mb-20 select-none">
          {words.map((word, wordIndex) => {
            const wordChars = word.split("");
            return (
              <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.3em]">
                {wordChars.map((char, charIndex) => {
                  const currentIdx = runningCharCount++;
                  const start = currentIdx / totalChars;
                  const end = Math.min(1, start + 1 / totalChars);
                  return (
                    <Char
                      key={charIndex}
                      char={char}
                      progress={scrollYProgress}
                      range={[start, end]}
                    />
                  );
                })}
              </span>
            );
          })}
        </div>

        {/* Three Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-amber-900/40">
          <div className="p-7 rounded-3xl bg-[#220d04]/60 border border-amber-700/25 backdrop-blur-sm hover:border-amber-500/40 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 flex items-center justify-center text-amber-400 mb-4 border border-amber-600/30">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Rempah Asli</h3>
            <p className="text-sm text-amber-200/70 font-light leading-relaxed">
              Diproses segar dari rimpang kunyit, kencur, jahe merah, dan kayu manis pilihan nusantara tanpa pengawet sintesis.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#220d04]/60 border border-amber-700/25 backdrop-blur-sm hover:border-amber-500/40 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 flex items-center justify-center text-amber-400 mb-4 border border-amber-600/30">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Buka Sore 15.30 - Habis</h3>
            <p className="text-sm text-amber-200/70 font-light leading-relaxed">
              Waktu pas setelah jam kuliah dan praktikum selesai. Datang lebih awal atau pesan WhatsApp agar tidak kehabisan!
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#220d04]/60 border border-amber-700/25 backdrop-blur-sm hover:border-amber-500/40 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-600/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Kearifan & Manis Alami</h3>
            <p className="text-sm text-amber-200/70 font-light leading-relaxed">
              Ramah di kantong mahasiswa mulai Rp4.000, menyehatkan tubuh dengan manis gula kelapa dan aren murni.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
