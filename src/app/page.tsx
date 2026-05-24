"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Zap, Volume2, VolumeX } from "lucide-react";
import { usePortfolio } from "@/components/layout/portfolio-provider";
import AiAssistant from "@/components/features/ai-assistant";

export default function Home() {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true); // Default to muted for secure browser autoplay bypass

  const [typedText, setTypedText] = useState("");
  const titles = [
    "AI & Data Science Student",
    "Full-Stack Python Developer",
    "Hyper-Local Startup Builder",
    "Open-Source Contributor",
    "Technical Note Creator"
  ];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Attempt unmuted autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force audio configuration based on browser support
    video.muted = false;
    setIsMuted(false);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Initial unmuted autoplay blocked:", error.message);
        // Unmuted autoplay blocked by browser policy, fallback to muted autoplay
        video.muted = true;
        setIsMuted(true);
        
        const secondPlayPromise = video.play();
        if (secondPlayPromise !== undefined) {
          secondPlayPromise.catch((err) => {
            // Silently catch power-saving or visibility-based play interruptions
            console.log("Autoplay play() request was prevented:", err.message);
          });
        }
      });
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Typing effect hook
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTitle = titles[titleIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentTitle.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentTitle.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 70);
    }

    if (!isDeleting && charIdx === currentTitle.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, titleIdx]);

  return (
    <div className="space-y-24 md:space-y-36">
      {/* 1. Hero Section */}
      <section className="relative min-h-[75vh] flex flex-col md:flex-row items-center justify-between gap-12 pt-6 md:pt-12">
        {/* Text Area */}
        <div className="flex-1 space-y-6 text-left">
          {/* Availability Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-[10px] font-mono text-cyan-600 dark:text-cyan-400 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 inline-block" />
            <span>🟢 CURRENTLY OPEN FOR INTERNSHIPS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight leading-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">{personalInfo.name}</span>
          </h1>

          {/* Typing terminal simulation */}
          <div className="h-12 flex items-center font-mono text-base md:text-lg text-zinc-600 dark:text-zinc-300">
            <span className="text-cyan-500 mr-2">&gt;</span>
            <span className="cursor-blink">{typedText}</span>
          </div>

          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed font-sans">
            {personalInfo.tagline} Currently reading Applied AI & Data Science at{" "}
            <span className="text-zinc-800 dark:text-zinc-200 font-semibold">IIT Jodhpur</span>.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href="/projects"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono text-xs font-bold transition-all duration-300 flex items-center shadow-lg shadow-cyan-500/20 hover:scale-105"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
            <a
              href="/Shravan_Kumar_Resume.pdf"
              download="Shravan_Kumar_Resume.pdf"
              className="px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:border-cyan-500/40 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm font-mono text-xs text-zinc-700 dark:text-zinc-300 transition-all duration-300 flex items-center hover:scale-105 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 mr-2 text-cyan-400" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Dynamic Holographic 16:9 Video Container */}
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-video group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-black overflow-hidden shadow-lg hover:border-cyan-500/40 transition-all duration-500">
            {/* Subtle glow behind the player */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Loop video with voice capabilities */}
            <video
              ref={videoRef}
              src="/Portfolio_intro_video_creation.mp4"
              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
              autoPlay
              loop
              playsInline
            />
            
            {/* Cyber corner marks matching the sci-fi portfolio aesthetic */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500/30 group-hover:border-cyan-500/70 transition-colors" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/30 group-hover:border-cyan-500/70 transition-colors" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500/30 group-hover:border-cyan-500/70 transition-colors" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500/30 group-hover:border-cyan-500/70 transition-colors" />

            {/* Interactive Holographic Sound Controller Button Overlay */}
            <button
              onClick={toggleMute}
              className="absolute bottom-3 right-3 z-20 flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-cyan-500/30 bg-black/80 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 font-mono text-[9px] font-bold cursor-pointer transition-all duration-300 shadow-md animate-pulse"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span>🔊 PLAY AUDIO</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                  <span>MUTE AUDIO</span>
                </>
              )}
            </button>

            {/* Simulated HUD specs label */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 text-[8px] font-mono bg-black/70 px-2 py-0.5 border border-zinc-800/80 rounded text-zinc-400 select-none">
              <span className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse" />
              <span>NODE: INTRO_STREAM // {isMuted ? "muted" : "unmuted"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mini Tech Stack Floating Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400">Integrated Ecosystem</h2>
          <p className="text-xl font-bold font-sans tracking-tight text-zinc-900 dark:text-zinc-100">
            Tech Stack Matrix
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "Python", desc: "Primary Language", level: "90%", icon: "🐍" },
            { name: "SQL", desc: "Databases & RDBMS", level: "85%", icon: "📊" },
            { name: "Scikit-Learn", desc: "Machine Learning Models", level: "85%", icon: "🤖" },
            { name: "Streamlit", desc: "Interactive Frontend Apps", level: "90%", icon: "🎈" },
            { name: "Pandas & NumPy", desc: "Numerical Analysis", level: "92%", icon: "🐼" },
            { name: "Next.js & React", desc: "Full Stack Development", level: "75%", icon: "⚡" },
          ].map((t) => (
            <div
              key={t.name}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm text-center space-y-1.5 hover:border-cyan-500/30 transition-all duration-300 hover:translate-y-[-2px] group shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.05)]"
            >
              <div className="text-xl mb-1">{t.icon}</div>
              <h4 className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-cyan-400 transition-colors">
                {t.name}
              </h4>
              <p className="text-[9px] font-mono text-zinc-400">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AI Chat Assistant Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-cyan-400 animate-bounce" />
              Interactive Chat Kernel
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Query My AI Representation
            </h2>
          </div>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-mono leading-relaxed">
            I built a specialized cognitive bot mapped directly to my credentials. You can query my CGPA, specific mechanics of the Movie Recommendation pipeline, startup insights behind One Day Delivery, or how my data science research is progressing.
          </p>
          <div className="space-y-2 font-mono text-[10px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Direct execution of vector-search queries.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Calculates similarities on the fly.</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center">
          <AiAssistant />
        </div>
      </section>

      {/* 4. Testimonials / Key Milestones */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Academic & Project Endorsements</span>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Project Impact & Feedback
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              author: "IIT Jodhpur Entrepreneurship Cell",
              role: "Startup Launchpad Committee",
              quote: "The localized routing concept for One Day Delivery solved CVRP challenges elegantly. Shravan demonstrated strong logical framing and robust optimization parameters.",
              icon: "🏆"
            },
            {
              author: "Movie Recommendation User Community",
              role: "Beta Evaluators",
              quote: "Extremely intuitive. The Streamlit interface paired with vectorized TF-IDF similarity indexing works fast and yields recommendations of superior relevance.",
              icon: "🎈"
            }
          ].map((test, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm space-y-4 hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{test.icon}</span>
                <span className="text-[10px] font-mono text-cyan-500">ENDORSED</span>
              </div>
              <p className="text-xs font-mono text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div className="font-mono text-left pt-2">
                <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{test.author}</h4>
                <p className="text-[10px] text-zinc-500">{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
