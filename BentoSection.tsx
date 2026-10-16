"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles, QrCode, CheckCircle2, Zap, Heart, ArrowUpRight, Flame, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import MagneticButton from "./MagneticButton";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function CountUp({ end, duration = 2, prefix = "", suffix = "" }: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (end - startValue) * easeProgress);

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}
      {value.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

export default function BentoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleQrisClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: ["#f59e0b", "#10b981", "#fbbf24", "#d97706"],
    });
  };

  return (
    <section id="menu" ref={sectionRef} className="relative py-28 px-6 md:px-12 bg-[#180a03] text-[#fef3c7]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/30 text-amber-300 text-xs font-mono tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>RACIKAN ANDALAN & MENU FAVORIT</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Menu Jamu & Kearifan Lokal
            </h2>
          </div>
          <p className="text-amber-200/70 max-w-md text-sm md:text-base font-light leading-relaxed">
            Semua racikan diseduh dari bahan segar alami harian. Bisa dinikmati langsung di tempat (gelas) atau dibawa pulang (botol kemasan).
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Beras Kencur (Large 2 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-[#2a1206] to-[#1a0802] border border-amber-700/30 relative overflow-hidden group hover:border-amber-500/60 transition-all duration-300 shadow-2xl flex flex-col justify-between"
          >
            {/* Visual background glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono border border-amber-500/30">
                  FAVORIT MAHASISWA #1
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Paling Laris Setiap Sore</span>
                </div>
              </div>

              {/* Product Image Banner */}
              <div className="relative w-full h-52 md:h-64 rounded-2xl overflow-hidden mb-6 border border-amber-800/40 shadow-inner group/img">
                <Image
                  src="/images/beras-kencur.jpg"
                  alt="Beras Kencur Jamu Pak Syawiran"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0802] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    Kencur Wangi
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    Beras Sangrai
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    Gula Aren Murni
                  </span>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3 group-hover:text-amber-300 transition-colors">
                Beras Kencur Meluncur
              </h3>
              <p className="text-amber-200/80 text-sm md:text-base font-light leading-relaxed mb-6">
                Racikan kencur wangi berpadu tepung beras sangrai halus dan manisnya gula aren murni. Solusi instan untuk meredakan pegal linu, kelelahan sehabis kuliah, dan mengembalikan stamina tubuhmu.
              </p>
            </div>

            {/* Bottom info & price */}
            <div className="flex flex-wrap items-end justify-between gap-4 pt-6 border-t border-amber-800/40">
              <div>
                <span className="text-xs font-mono text-amber-400/80 block">HARGA MULAI DARI</span>
                <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
                  Rp<CountUp end={4000} duration={1.6} />
                </span>
                <span className="text-xs text-amber-300/70 block mt-0.5">Gelas: Rp4.000 • Botol 500ml: Rp15.000</span>
              </div>

              <MagneticButton
                href="https://wa.me/6289637290260?text=Halo%20Pak%20Syawiran,%20saya%20mau%20pesan%20Beras%20Kencur..."
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg shadow-amber-900/40">
                  <span>Pesan Sekarang</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Card 2: Kunyit Asem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 lg:col-span-1 p-7 rounded-3xl bg-gradient-to-br from-[#240e04] to-[#180a03] border border-amber-700/30 relative overflow-hidden group hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-mono border border-yellow-500/30">
                  SEGAR ALAMI
                </span>
                <Zap className="w-4 h-4 text-yellow-400" />
              </div>

              {/* Product Image */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-amber-800/40 shadow-inner group/img">
                <Image
                  src="/images/kunyit-asem.jpg"
                  alt="Kunyit Asem Segar Pak Syawiran"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180a03] via-transparent to-transparent opacity-75" />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-yellow-300 border border-yellow-500/30">
                  Kunyit Asli + Asam Jawa
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                Kunyit Asem Segar
              </h3>
              <p className="text-amber-200/70 text-xs md:text-sm font-light leading-relaxed mb-6">
                Kombinasi rimpang kunyit segar dengan asam jawa pilihan. Melancarkan sirkulasi darah, detoksifikasi racun, dan meredakan nyeri datang bulan.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-800/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-amber-400/80 block">MULAI DARI</span>
                <span className="text-xl font-extrabold text-white font-mono">
                  Rp<CountUp end={4000} duration={1.6} />
                </span>
              </div>
              <span className="text-xs text-amber-300/80 font-mono">Dingin / Hangat</span>
            </div>
          </motion.div>

          {/* Card 3: Jamu Buyung Upik */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-1 lg:col-span-1 p-7 rounded-3xl bg-gradient-to-br from-[#240e04] to-[#180a03] border border-amber-700/30 relative overflow-hidden group hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-mono border border-orange-500/30">
                  NOSTALGIA MANIS
                </span>
                <Heart className="w-4 h-4 text-orange-400" />
              </div>

              {/* Product Image */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-amber-800/40 shadow-inner group/img">
                <Image
                  src="/images/buyung-upik.jpg"
                  alt="Jamu Buyung Upik Pak Syawiran"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180a03] via-transparent to-transparent opacity-75" />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-orange-300 border border-orange-500/30">
                  Varian Buah Segar
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                Jamu Buyung Upik
              </h3>
              <p className="text-amber-200/70 text-xs md:text-sm font-light leading-relaxed mb-6">
                Rasa manis segar legendaris dengan aneka varian buah favorit. Pilihan tepat bagi yang baru mengenal jamu tradisional tanpa rasa pahit berlebih.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-800/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-amber-400/80 block">MULAI DARI</span>
                <span className="text-xl font-extrabold text-white font-mono">
                  Rp<CountUp end={5000} duration={1.6} />
                </span>
              </div>
              <span className="text-xs text-amber-300/80 font-mono">Favorit Pemula</span>
            </div>
          </motion.div>

          {/* Stat Card 1: 100% Rempah Murni */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-7 rounded-3xl bg-[#220d04]/80 border border-amber-800/40 flex flex-col justify-center items-center text-center group hover:border-amber-500/40 transition-colors shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-600/30 flex items-center justify-center text-amber-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 mb-2">
              <CountUp end={100} duration={2} suffix="%" />
            </div>
            <span className="text-sm font-bold text-white mb-1">Rempah Murni Alami</span>
            <p className="text-xs text-amber-300/70 font-light">Tanpa pemanis buatan, tanpa bahan pengawet kimia sintetis.</p>
          </motion.div>

          {/* Stat Card 2: 350+ Gelas Terjual Tiap Sore */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-7 rounded-3xl bg-[#220d04]/80 border border-amber-800/40 flex flex-col justify-center items-center text-center group hover:border-amber-500/40 transition-colors shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-600/30 flex items-center justify-center text-amber-400 mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <div className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-amber-600 mb-2">
              <CountUp end={350} duration={2} suffix="+" />
            </div>
            <span className="text-sm font-bold text-white mb-1">Gelas Disajikan Tiap Sore</span>
            <p className="text-xs text-amber-300/70 font-light">Laris dinikmati mahasiswa, dosen, dan staf FKIP Unila.</p>
          </motion.div>

          {/* Card: Modern Payment via QRIS (2 Columns on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={handleQrisClick}
            className="cursor-pointer md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-gradient-to-r from-[#281105] via-[#200c03] to-[#180a03] border border-amber-500/30 relative overflow-hidden group hover:border-emerald-400/60 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
          >
            {/* Shimmer line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />

            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30 mb-3">
                <QrCode className="w-3.5 h-3.5" />
                <span>PEMBAYARAN CASHLESS MODERN</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-emerald-300 transition-colors">
                Tersedia QRIS Gerobak
              </h3>
              <p className="text-amber-200/80 text-xs md:text-sm font-light leading-relaxed mb-4">
                Tidak bawa uang tunai sehabis kuliah? Tenang, Pak Syawiran melayani transaksi cepat via QRIS untuk seluruh bank & e-wallet nasional (BCA, Mandiri, BRI, BNI, GoPay, ShopeePay, OVO, Dana).
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 group-hover:underline">
                <span>Klik kartu untuk coba tap QRIS</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* QRIS Graphic Badge with realistic look */}
            <div className="relative flex-shrink-0 w-40 h-44 rounded-2xl bg-white p-3.5 shadow-2xl flex flex-col items-center justify-between border-2 border-emerald-400/50 group-hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between w-full px-1">
                <span className="text-xs font-black text-red-600 font-sans tracking-tight">QRIS</span>
                <span className="text-[9px] font-mono font-bold text-gray-500">GPN</span>
              </div>

              {/* QR Pattern visual */}
              <div className="w-24 h-24 bg-gray-900 rounded-lg p-2 flex flex-wrap gap-1 items-center justify-center relative shadow-inner">
                <div className="w-6 h-6 border-2 border-white bg-transparent flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white" />
                </div>
                <div className="w-6 h-6 border-2 border-white bg-transparent flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white" />
                </div>
                <div className="w-6 h-6 border-2 border-white bg-transparent flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white" />
                </div>
                <div className="w-6 h-6 bg-amber-400 rounded-sm flex items-center justify-center text-[7px] font-black text-black">
                  PAK S
                </div>
              </div>

              <div className="text-center">
                <span className="text-[10px] font-extrabold text-gray-900 tracking-tight block">
                  JAMU PAK SYAWIRAN
                </span>
                <span className="text-[8px] font-mono text-gray-500">NMID: ID10200392819</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
