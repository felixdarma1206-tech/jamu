import React from "react";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import BentoSection from "@/components/BentoSection";
import TestimonialSection from "@/components/TestimonialSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#1f0d04] min-h-screen text-[#fdf6ec]">
      {/* Scrollytelling Canvas Section (700vh) */}
      <SequenceScroll />

      {/* Subsequent Landing Page Sections — slides over the canvas after frame 240 + CTA are fully enjoyed */}
      <div className="relative z-10 -mt-[100vh] bg-[#1f0d04] shadow-[0_-40px_80px_rgba(10,3,1,0.99)]">
        {/* About Section with Scroll-Scrub Character Reveal */}
        <AboutSection />

        {/* Bento Grid with Live CountUp, Product Images & QRIS Cashless Card */}
        <BentoSection />

        {/* Fullscreen Autoplay Awwwards Testimonials */}
        <TestimonialSection />

        {/* Dynamic CTA with WhatsApp (0896 3729 0260) & TikTok (@jamufkip_paksyawiran) */}
        <CtaSection />

        {/* Editorial Footer */}
        <Footer />
      </div>
    </main>
  );
}
