import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ParticleBackground from "@/components/canvas/particle-background";
import CustomCursor from "@/components/layout/custom-cursor";
import CommandPalette from "@/components/layout/command-palette";

import { PortfolioProvider } from "@/components/layout/portfolio-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shravan Kumar | AI & Data Science Engineer Portfolio",
  description: "Explore the professional portfolio of Shravan Kumar, an Applied AI & Data Science student at IIT Jodhpur, startup founder of One Day Delivery, developer, blogger, and ML enthusiast.",
  keywords: ["Shravan Kumar", "IIT Jodhpur", "Applied AI", "Data Science", "Machine Learning", "Streamlit", "Python", "One Day Delivery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-500 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        <PortfolioProvider>
          {/* Futuristic background and cursor nodes */}
          <ParticleBackground />
          <CustomCursor />
          <CommandPalette />

          {/* Layout containers */}
          <Header />
          
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10 flex flex-col justify-start">
            {children}
          </main>

          <Footer />
        </PortfolioProvider>
      </body>
    </html>
  );
}
