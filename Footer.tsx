"use client";

import React from "react";
import { MessageCircle, ArrowUp, Heart, Sparkles, MapPin } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#100501] text-[#fef3c7] border-t border-amber-900/40 pt-20 pb-12 px-6 md:px-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-amber-900/30">
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-700 to-amber-400 p-0.5">
                <div className="w-full h-full rounded-full bg-[#1e0b03] flex items-center justify-center font-bold text-amber-300 font-mono text-sm">
                  PS
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Jamu Pak Syawiran
              </span>
            </div>
            <p className="text-amber-200/70 text-sm max-w-md font-light leading-relaxed mb-6">
              Pionir racikan jamu tradisional segar di lingkungan FKIP Universitas Lampung. Menyajikan kehangatan dan kebaikan rempah nusantara sejak sore hingga habis setiap hari.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Gedong Meneng, Rajabasa, Kota Bandar Lampung, Lampung</span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-amber-400/80 uppercase mb-4">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm text-amber-200/70 font-light">
              <li>
                <a href="#beranda" className="hover:text-amber-300 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-amber-300 transition-colors">
                  Kisah Tradisi
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-300 transition-colors">
                  Menu & Racikan
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-amber-300 transition-colors">
                  Kata Mahasiswa
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-amber-300 transition-colors">
                  Pemesanan WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hubungi & Ikuti */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-amber-400/80 uppercase mb-4">
              Kontak & Media
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/6289637290260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>0896 3729 0260</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@jamufkip_paksyawiran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-200 hover:text-amber-400 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.83 4.49 6.27 6.27 0 0 0 1.88-4.5V8.5a8.28 8.28 0 0 0 4.88 1.63V6.69Z" />
                  </svg>
                  <span>@jamufkip_paksyawiran</span>
                </a>
              </li>
              <li className="pt-2 text-xs font-mono text-amber-400/70">
                Jam Buka: 15.30 WIB - Habis
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Monospace / Watermark Branding */}
        <div className="py-12 border-b border-amber-900/30 overflow-hidden text-center">
          <span className="font-extrabold text-5xl sm:text-7xl md:text-9xl tracking-tighter text-amber-950/40 select-none block hover:text-amber-900/30 transition-colors">
            PAK SYAWIRAN
          </span>
        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-amber-400/60">
          <div>
            © {new Date().getFullYear()} Jamu Pak Syawiran. Seluruh hak cipta dilindungi.
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline">UMKM Jamu Tradisional FKIP Unila</span>
            <MagneticButton onClick={scrollToTop}>
              <button
                aria-label="Scroll to top"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-800/50 hover:border-amber-400 text-amber-300 hover:text-white transition-colors"
              >
                <span>KEMBALI KE ATAS</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
