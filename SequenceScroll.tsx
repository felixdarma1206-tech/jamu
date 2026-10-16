"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Sparkles, Flame, Clock, ArrowDown } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Preloader from "./Preloader";

const TOTAL_FRAMES = 240;
// All 240 frames complete by 40% of scroll.
// With a 700vh container and -mt-[100vh], the next section covers at ~600/700 = 0.857.
// This gives a massive 0.40 → 0.857 hold window (~320vh!) for frame 240 + CTA.
const ANIMATION_END = 0.40;

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDisplayFrame, setCurrentDisplayFrame] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);

  // Contain-fit: entire frame visible, no cropping, with safe-area padding
  const renderFrameToCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIdx - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const imgRatio = iw / ih;

    // Safe area: 94% width, 88% height — never clips top/bottom/sides
    const safeW = cw * 0.94;
    const safeH = ch * 0.88;
    const safeRatio = safeW / safeH;

    let rw: number, rh: number, ox: number, oy: number;

    if (safeRatio > imgRatio) {
      // Screen wider than image: fit to safe height
      rh = safeH;
      rw = safeH * imgRatio;
    } else {
      // Screen taller than image: fit to safe width
      rw = safeW;
      rh = safeW / imgRatio;
    }

    ox = (cw - rw) / 2;
    oy = (ch - rh) / 2 + ch * 0.025; // nudge slightly below navbar

    // 1. Dark amber fill
    ctx.fillStyle = "#1f0d04";
    ctx.fillRect(0, 0, cw, ch);

    // 2. Warm radial glow to hide letterbox edges seamlessly
    const g = ctx.createRadialGradient(cw / 2, ch / 2, 10, cw / 2, ch / 2, Math.max(cw, ch) * 0.7);
    g.addColorStop(0, "rgba(180, 83, 9, 0.12)");
    g.addColorStop(0.5, "rgba(50, 20, 5, 0.45)");
    g.addColorStop(1, "rgba(31, 13, 4, 1)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cw, ch);

    // 3. Draw frame
    ctx.drawImage(img, ox, oy, rw, rh);
  }, []);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadProgress((loaded / TOTAL_FRAMES) * 100);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
          renderFrameToCanvas(1);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress((loaded / TOTAL_FRAMES) * 100);
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    const safety = setTimeout(() => {
      setIsLoaded(true);
      renderFrameToCanvas(1);
    }, 5000);
    return () => clearTimeout(safety);
  }, [renderFrameToCanvas]);

  // Canvas resize + retina
  useEffect(() => {
    const onResize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
      renderFrameToCanvas(Math.round(currentFrameRef.current));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [renderFrameToCanvas]);

  // Scroll → frame mapping: all 240 frames finish at ANIMATION_END (0.40)
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const progress = Math.min(1, Math.max(0, v) / ANIMATION_END);
      const frame = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
      targetFrameRef.current = frame;
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Smooth RAF interpolation
  useEffect(() => {
    let id: number;
    const tick = () => {
      const delta = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(delta) > 0.01) {
        currentFrameRef.current += delta * 0.16;
        const f = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));
        setCurrentDisplayFrame(f);
        renderFrameToCanvas(f);
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [renderFrameToCanvas]);

  // ─── Text Overlay Timing ───
  // With 700vh container and -mt-[100vh], canvas is uncovered until progress ~0.857.
  // All frames end at 0.40. CTA shows 0.42–0.72. Huge margin before 0.857 cutoff.

  // 0% → Hero title (fades by 6%)
  const heroOp = useTransform(scrollYProgress, [0, 0.03, 0.06], [1, 0.8, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.06], [0, -30]);
  const heroS = useTransform(scrollYProgress, [0, 0.06], [1, 0.96]);

  // ~10-22% → "Hari Rabu, jangan lupa minum jamu" (Left)
  const sloganAOp = useTransform(scrollYProgress, [0.08, 0.12, 0.18, 0.22], [0, 1, 1, 0]);
  const sloganAX = useTransform(scrollYProgress, [0.08, 0.12, 0.18, 0.22], [-50, 0, 0, -50]);

  // ~24-36% → "hidup hancur, beras kencur meluncur" (Right)
  const sloganBOp = useTransform(scrollYProgress, [0.24, 0.28, 0.34, 0.38], [0, 1, 1, 0]);
  const sloganBX = useTransform(scrollYProgress, [0.24, 0.28, 0.34, 0.38], [50, 0, 0, 50]);

  // ~42-72% → CTA WhatsApp (Center) — Frame 240 is held, user has ~210vh to read and click
  const ctaOp = useTransform(scrollYProgress, [0.40, 0.45, 0.70, 0.76], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.40, 0.46], [40, 0]);
  const ctaS = useTransform(scrollYProgress, [0.40, 0.46], [0.94, 1]);

  return (
    <>
      <Preloader progress={loadProgress} isLoaded={isLoaded} />

      {/* 700vh — gives massive room: frames end at 280vh, CTA visible until ~504vh, section covers at ~600vh */}
      <section ref={containerRef} id="beranda" className="relative h-[700vh] bg-[#1f0d04]">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
          />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none opacity-25 shadow-[inset_0_0_120px_rgba(15,5,1,0.85)]" />

          {/* Frame counter */}
          <div className="absolute bottom-5 left-5 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-amber-700/30 backdrop-blur-md text-[11px] font-mono text-amber-300 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>FRAME</span>
            <span className="text-white font-bold">{String(currentDisplayFrame).padStart(3, "0")}</span>
            <span className="text-amber-600/60">/ 240</span>
          </div>

          {/* ── OVERLAY 1: Hero Title (0%) ── */}
          <motion.div
            style={{ opacity: heroOp, y: heroY, scale: heroS }}
            className="absolute z-20 max-w-4xl px-6 text-center flex flex-col items-center pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/30 backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs md:text-sm font-mono tracking-wider text-amber-200">
                GEROBAK JAMU ASLI FKIP UNIVERSITAS LAMPUNG
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 drop-shadow-2xl">
              Jamu Pak Syawiran
            </h1>
            <p className="text-lg md:text-2xl text-amber-100/90 max-w-2xl font-light leading-relaxed drop-shadow-md">
              Racikan jamu tradisional segar penyegar raga dan penjaga imunitas mahasiswa serta warga di sekitar kampus Unila.
            </p>
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-amber-300/70 animate-bounce">
              <span>GULIR KE BAWAH UNTUK MELIHAT KEAJAIBAN REMPAH</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </motion.div>

          {/* ── OVERLAY 2: Slogan A (Left, ~10-22%) ── */}
          <motion.div
            style={{ opacity: sloganAOp, x: sloganAX }}
            className="absolute z-20 left-6 md:left-16 lg:left-24 max-w-xl text-left pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4 backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>RITUAL PEKANAN MAHASISWA</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-4 drop-shadow-2xl">
              "Hari Rabu, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">
                jangan lupa minum jamu."
              </span>
            </h2>
            <p className="text-amber-100/90 text-base md:text-lg font-light leading-relaxed backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-amber-500/20">
              Di sela padatnya jadwal kuliah, praktikum, dan tugas akhir, segelas racikan kunyit asam segar mengembalikan fokus dan metabolisme tubuhmu.
            </p>
          </motion.div>

          {/* ── OVERLAY 3: Slogan B (Right, ~24-36%) ── */}
          <motion.div
            style={{ opacity: sloganBOp, x: sloganBX }}
            className="absolute z-20 right-6 md:right-16 lg:right-24 max-w-xl text-right ml-auto pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4 backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>RACIKAN REMPAH HANGAT</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-4 drop-shadow-2xl">
              "hidup hancur, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-amber-600">
                beras kencur meluncur."
              </span>
            </h2>
            <p className="text-amber-100/90 text-base md:text-lg font-light leading-relaxed backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-amber-500/20">
              Tumpukan revisi bikin lelah dan pegal linu? Kehangatan beras kencur kental buatan Pak Syawiran siap memulihkan energimu seketika.
            </p>
          </motion.div>

          {/* ── OVERLAY 4: CTA WhatsApp (Center, ~42-72%) — Frame 240 held in full glory ── */}
          <motion.div
            style={{ opacity: ctaOp, y: ctaY, scale: ctaS }}
            className="absolute z-20 max-w-2xl px-6 text-center flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>RACIKAN SEMPURNA • SIAP DISEDUH</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-2xl">
              Cek Ketersediaan & Pesan Jamu
            </h2>
            <p className="text-amber-100/90 text-base md:text-lg font-light max-w-lg mb-8 leading-relaxed">
              Jamu diseduh segar setiap hari dari pukul 15.30 WIB dan seringkali habis dalam hitungan jam. Hubungi Pak Syawiran via WhatsApp untuk memastikan pesananmu!
            </p>
            <MagneticButton
              href="https://wa.me/6289637290260?text=Halo%20Pak%20Syawiran,%20saya%20mau%20pesan%20jamu%20segar%20hari%20ini.%20Apakah%20masih%20tersedia?"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.4}
            >
              <div className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-lg shadow-[0_0_35px_rgba(16,185,129,0.45)] transition-all duration-300 border border-emerald-300/30">
                <MessageCircle className="w-6 h-6 fill-white transition-transform group-hover:scale-110" />
                <span>Pesan via WhatsApp (0896 3729 0260)</span>
              </div>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
