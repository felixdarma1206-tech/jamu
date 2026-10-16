"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X, ArrowUpRight, Sparkles, Clock, MapPin } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { title: "Kisah Pak Syawiran", href: "#tentang", number: "01", tag: "Warisan & Tradisi" },
    { title: "Racikan & Menu", href: "#menu", number: "02", tag: "Beras Kencur & Kunyit Asem" },
    { title: "Kata Mahasiswa", href: "#testimoni", number: "03", tag: "Ulasan Mahasiswa Unila" },
    { title: "Pesan via WhatsApp", href: "#kontak", number: "04", tag: "0896 3729 0260" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#180a03]/90 backdrop-blur-md border-b border-amber-900/40 shadow-xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Brand Logo with Pak Syawiran SVG illustration */}
          <a href="#" className="flex items-center gap-3.5 group select-none">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-amber-700 via-amber-500 to-yellow-400 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md">
              <div className="w-full h-full rounded-full bg-[#200c03] flex items-center justify-center overflow-hidden">
                {/* Pak Syawiran traditional warm avatar icon */}
                <svg
                  viewBox="0 0 48 48"
                  className="w-8 h-8 text-amber-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Traditional Blangkon / Cap */}
                  <path d="M12 18 C14 12, 34 12, 36 18 C38 21, 36 23, 12 23 Z" fill="#b45309" stroke="#f59e0b" />
                  {/* Face */}
                  <circle cx="24" cy="27" r="9" fill="#fde68a" stroke="#d97706" />
                  {/* Eyes & Warm Smile */}
                  <circle cx="21" cy="26" r="1.2" fill="#78350f" />
                  <circle cx="27" cy="26" r="1.2" fill="#78350f" />
                  <path d="M20 29.5 Q24 33 28 29.5" stroke="#78350f" strokeWidth="1.8" fill="none" />
                  {/* Mustaches */}
                  <path d="M19 28.5 Q22 28 24 29 Q26 28 29 28.5" stroke="#78350f" strokeWidth="1.2" />
                  {/* Herbal bottle icon beside */}
                  <path d="M36 29 L38 29 L38 38 L34 38 L34 29 Z" fill="#f59e0b" stroke="#f59e0b" />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Jamu Pak Syawiran
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-300/80 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                FKIP UNILA • 15.30 WIB - HABIS
              </div>
            </div>
          </a>

          {/* Center Operational Badge (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/25 text-xs text-amber-200/90 font-mono backdrop-blur-md shadow-md">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Setiap Sore 15.30 WIB</span>
            <span className="text-amber-500/50">•</span>
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Gerobak Depan FKIP Unila</span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Quick WhatsApp CTA Button */}
            <MagneticButton
              href="https://wa.me/6289637290260?text=Halo%20Pak%20Syawiran,%20saya%20mau%20tanya%20ketersediaan%20jamu%20hari%20ini..."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs md:text-sm font-semibold tracking-wide shadow-lg shadow-emerald-950/50 transition-all border border-emerald-400/30">
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Pesan WhatsApp</span>
              </div>
            </MagneticButton>

            {/* Menu Trigger Button on ALL screens */}
            <MagneticButton onClick={() => setIsOpen(!isOpen)}>
              <button
                aria-label="Toggle navigation menu"
                className="w-11 h-11 rounded-full bg-amber-950/80 border border-amber-700/50 hover:border-amber-400 flex items-center justify-center text-amber-200 hover:text-white transition-colors shadow-lg"
              >
                {isOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu (Awwwards Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#160802] text-[#fef3c7] flex flex-col justify-between p-6 md:p-14 overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-6">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300/80">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>MENU NAVIGASI UTAMA</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-sm text-amber-300/90 hover:text-white px-4 py-2 rounded-full border border-amber-700/40 hover:border-amber-400 transition-colors"
              >
                <span>TUTUP</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Big Typography Links */}
            <div className="my-auto py-10 max-w-5xl">
              <ul className="space-y-4 md:space-y-6">
                {navLinks.map((item, index) => (
                  <motion.li
                    key={item.number}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.6 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 text-3xl md:text-6xl lg:text-7xl font-black tracking-tight text-amber-100/70 hover:text-amber-400 transition-all duration-300"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-sm md:text-xl text-amber-500/60 group-hover:text-amber-400 transition-colors">
                          {item.number}
                        </span>
                        <span className="relative">
                          {item.title}
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
                        </span>
                        <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-400" />
                      </div>
                      <span className="text-xs md:text-sm font-mono text-amber-400/50 group-hover:text-amber-300 transition-colors">
                        — {item.tag}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom Contact & Social Footer */}
            <div className="pt-8 border-t border-amber-900/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="text-xs font-mono text-amber-400/70 uppercase tracking-widest block mb-2">
                  Lokasi Operasional
                </span>
                <p className="text-amber-100/90 font-light">
                  Kawasan FKIP Universitas Lampung, Gedong Meneng, Rajabasa, Bandar Lampung.
                </p>
                <p className="text-amber-400 text-xs font-mono mt-1">Buka Setiap Sore 15.30 WIB - Habis</p>
              </div>

              <div>
                <span className="text-xs font-mono text-amber-400/70 uppercase tracking-widest block mb-2">
                  Pemesanan WhatsApp
                </span>
                <a
                  href="https://wa.me/6289637290260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-200 hover:text-emerald-400 font-mono flex items-center gap-2 transition-colors font-bold"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  0896 3729 0260
                </a>
                <span className="text-xs text-amber-300/60 block mt-1">Melayani pesanan botol dan gelas</span>
              </div>

              <div>
                <span className="text-xs font-mono text-amber-400/70 uppercase tracking-widest block mb-2">
                  Media Sosial
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.tiktok.com/@jamufkip_paksyawiran"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-200 hover:text-amber-400 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.83 4.49 6.27 6.27 0 0 0 1.88-4.5V8.5a8.28 8.28 0 0 0 4.88 1.63V6.69Z" />
                    </svg>
                    <span>@jamufkip_paksyawiran</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
