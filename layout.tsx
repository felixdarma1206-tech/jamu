import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

export const viewport: Viewport = {
  themeColor: "#180a03",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Jamu Pak Syawiran | Jamu Tradisional Segar FKIP Universitas Lampung",
  description:
    "Landing page scrollytelling Jamu Pak Syawiran. Racikan beras kencur, kunyit asem, dan jamu tradisional segar favorit mahasiswa FKIP Unila. Buka mulai 15.30 WIB. Pesan via WhatsApp 0896 3729 0260.",
  keywords: [
    "Jamu Pak Syawiran",
    "Jamu FKIP Unila",
    "Beras Kencur Lampung",
    "Kunyit Asam",
    "Jamu Tradisional Universitas Lampung",
    "Kuliner Unila",
    "Minuman Sehat Lampung",
  ],
  openGraph: {
    title: "Jamu Pak Syawiran | Jamu Tradisional Segar FKIP Unila",
    description:
      "Hari Rabu jangan lupa minum jamu, hidup hancur beras kencur meluncur! Diseduh segar dari rempah alami setiap sore mulai 15.30 WIB.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#180a03] text-[#fef8ee] font-outfit antialiased selection:bg-amber-400 selection:text-black">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
