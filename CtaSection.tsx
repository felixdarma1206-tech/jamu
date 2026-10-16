"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, ArrowUpRight, Copy, Check, Clock, MapPin } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function CtaSection() {
  const [copied, setCopied] = useState(false);

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText("089637290260");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="kontak" className="relative py-32 px-6 md:px-12 bg-[#140601] text-[#fef3c7] overflow-hidden">
      {/* Animated Floating Gradient Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-amber-600/20 to-yellow-500/10 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.25, 1, 1.25],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-600/15 to-amber-700/20 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-600/30 text-amber-300 text-xs font-mono tracking-wider mb-8 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>PESAN LANGSUNG KE PAK SYAWIRAN</span>
        </div>

        {/* Big Headline */}
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-6">
          Kesehatan Alami, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
            Diseduh Tiap Sore.
          </span>
        </h2>

        {/* Slogans Reminder */}
        <p className="text-amber-200/80 text-base md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Ingat: <span className="text-amber-300 font-semibold">“Hari Rabu, jangan lupa minum jamu”</span> dan saat{" "}
          <span className="text-amber-300 font-semibold">“hidup hancur, beras kencur meluncur”</span>. Amankan stok botol dan gelasmu sebelum kehabisan!
        </p>

        {/* Action Buttons Hub */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
          {/* Main WhatsApp CTA with animated glow */}
          <MagneticButton
            href="https://wa.me/6289637290260?text=Halo%20Pak%20Syawiran,%20saya%20mau%20pesan%20jamu%20segar%20hari%20ini.%20Bisa%20info%20ketersediaan?"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.3}
          >
            <div className="group relative flex items-center gap-3 px-8 py-5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-lg md:text-xl shadow-[0_0_50px_rgba(16,185,129,0.55)] transition-all duration-300 border border-emerald-300/30 hover:scale-[1.02]">
              <MessageCircle className="w-6 h-6 fill-white transition-transform group-hover:scale-110" />
              <span>Order via WhatsApp (0896 3729 0260)</span>
            </div>
          </MagneticButton>

          {/* TikTok Account Button */}
          <MagneticButton
            href="https://www.tiktok.com/@jamufkip_paksyawiran"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.3}
          >
            <div className="group flex items-center gap-3 px-7 py-5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-base md:text-lg border border-amber-600/30 hover:border-amber-400/60 backdrop-blur-md transition-all duration-300">
              <svg className="w-5 h-5 fill-current text-amber-300 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.83 4.49 6.27 6.27 0 0 0 1.88-4.5V8.5a8.28 8.28 0 0 0 4.88 1.63V6.69Z" />
              </svg>
              <span>TikTok @jamufkip_paksyawiran</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </MagneticButton>
        </div>

        {/* Operational Micro-card & Quick Copy */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 p-4 px-8 rounded-2xl bg-[#200c03]/80 border border-amber-700/30 backdrop-blur-md text-xs font-mono text-amber-200/90 shadow-xl">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>JAM OPERASIONAL: 15.30 WIB - HABIS</span>
          </div>
          <span className="hidden sm:inline text-amber-700">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>LOKASI: DEPAN FKIP UNIVERSITAS LAMPUNG</span>
          </div>
          <span className="hidden sm:inline text-amber-700">•</span>
          <button
            onClick={copyPhoneNumber}
            className="flex items-center gap-1.5 text-amber-300 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "NOMOR TERSALIN!" : "SALIN: 0896 3729 0260"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
