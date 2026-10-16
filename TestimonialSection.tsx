"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Quote, Star, GraduationCap } from "lucide-react";
import MagneticButton from "./MagneticButton";

const testimonials = [
  {
    id: 1,
    name: "Rizky Pratama",
    role: "Mahasiswa Pendidikan Bahasa Indonesia, FKIP Unila",
    avatar: "RP",
    quote:
      "Beneran 'hidup hancur, beras kencur meluncur'! Pas lagi pusing ngerjain skripsi dan revisi bab 4 yang gak kelar-kelar, mampir ke gerobak Pak Syawiran sore-sore minum beras kencur hangat langsung bikin badan enteng dan tidur nyenyak.",
    rating: 5,
    favorite: "Beras Kencur Hangat + Madu Murni",
  },
  {
    id: 2,
    name: "Dinda Maharani",
    role: "Mahasiswi PGSD FKIP Universitas Lampung",
    avatar: "DM",
    quote:
      "Sebagai anak kosan yang sering telat makan dan langganan nyeri pas awal bulan haid, kunyit asem Pak Syawiran penyelamat banget. Manisnya pas dari gula aren murni, asamnya seger alami, gak ada rasa pahit obat sama sekali!",
    rating: 5,
    favorite: "Kunyit Asem Dingin Segar",
  },
  {
    id: 3,
    name: "Dimas Anggoro",
    role: "Mahasiswa Penjaskesrek FKIP Unila",
    avatar: "DA",
    quote:
      "Habis matkul atletik dan latihan fisik di lapangan, biasanya anak-anak Penjas langsung serbu gerobak Pak Syawiran. Harganya cuma 4 ribuan tapi khasiatnya jauh lebih nendang dibanding suplemen botolan minimarket.",
    rating: 5,
    favorite: "Temulawak & Jahe Geprek",
  },
  {
    id: 4,
    name: "Siti Rahmawati",
    role: "Mahasiswi Pendidikan Biologi Unila",
    avatar: "SR",
    quote:
      "Pak Syawiran itu ramah banget, selalu nyapa mahasiswa pake senyum khasnya. Kadang kalau jam 5 sore udah ludes. Sekarang untung bisa ngecek dan pesan duluan lewat WhatsApp biar gak keabisan!",
    rating: 5,
    favorite: "Jamu Buyung Upik & Kunyit Asem",
  },
];

const SLIDE_DURATION = 5500; // 5.5s per slide

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay with live progress ticker
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (stepMs / SLIDE_DURATION) * 100;
        if (next >= 100) {
          setCurrentIndex((idx) => (idx + 1) % testimonials.length);
          return 0;
        }
        return next;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, currentIndex]);

  const nextSlide = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimoni"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#160802] text-[#fef3c7] flex flex-col justify-between overflow-hidden border-t border-amber-900/40"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/30 text-amber-300 text-xs font-mono tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>KATA MAHASISWA & LANGGANAN KAMPUS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Suara dari FKIP Universitas Lampung
          </h2>
        </div>

        {/* Slide Counter & Indicators */}
        <div className="flex items-center gap-3 font-mono text-sm text-amber-400/80">
          <span className="text-xl font-bold text-white">0{currentIndex + 1}</span>
          <span className="text-amber-600">/</span>
          <span>0{testimonials.length}</span>
          {isPaused && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-950 border border-amber-700/40 text-amber-300">
              Jeda
            </span>
          )}
        </div>
      </div>

      {/* Center Slide Container (Fullscreen Awwwards Carousel) */}
      <div className="my-auto py-12 max-w-5xl mx-auto w-full relative">
        <Quote className="absolute -top-6 -left-6 md:-left-12 w-20 h-20 md:w-28 md:h-28 text-amber-500/10 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Stars & Favorite Pill */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                Pilihan Favorit: {current.favorite}
              </span>
            </div>

            {/* Quote Typography */}
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-snug md:leading-tight mb-8 drop-shadow-md">
              “{current.quote}”
            </blockquote>

            {/* Author Profile */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 flex-shrink-0 shadow-lg">
                <div className="w-full h-full rounded-full bg-[#200c03] flex items-center justify-center text-amber-300 font-black text-lg font-mono">
                  {current.avatar}
                </div>
              </div>

              <div>
                <h4 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                  {current.name}
                </h4>
                <p className="text-xs md:text-sm text-amber-200/70 flex items-center gap-1.5 mt-0.5">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  {current.role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Progress Bars & Navigation Controls */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Pagination Line Bars with Live Fill */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {testimonials.map((item, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setProgress(0);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative h-2 rounded-full transition-all duration-300 overflow-hidden bg-amber-950/80 border border-amber-800/40"
                style={{ width: isActive ? "60px" : "24px" }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.05 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Magnetic Prev & Next Buttons */}
        <div className="flex items-center gap-3">
          <MagneticButton onClick={prevSlide}>
            <button
              aria-label="Ulasan sebelumnya"
              className="w-12 h-12 rounded-full border border-amber-700/50 hover:border-amber-400 bg-amber-950/50 flex items-center justify-center text-amber-200 hover:text-white transition-colors shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </MagneticButton>

          <MagneticButton onClick={nextSlide}>
            <button
              aria-label="Ulasan berikutnya"
              className="w-12 h-12 rounded-full border border-amber-700/50 hover:border-amber-400 bg-amber-950/50 flex items-center justify-center text-amber-200 hover:text-white transition-colors shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
