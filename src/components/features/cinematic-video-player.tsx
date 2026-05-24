"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Terminal, 
  Activity, 
  Cpu, 
  Info,
  Sparkles,
  Zap
} from "lucide-react";

export default function CinematicVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const visualizerRef = useRef<HTMLCanvasElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  // Sound-wave simulated frequency bars
  useEffect(() => {
    const canvas = visualizerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const barCount = 20;
    const bars: { height: number; target: number }[] = [];

    for (let i = 0; i < barCount; i++) {
      bars.push({ height: 2, target: 2 });
    }

    const drawVisualizer = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(6, 182, 212, 0.7)"; // Cyan glow

      for (let i = 0; i < barCount; i++) {
        // If playing, fluctuate heights intensely. If paused, fluctuate minimal idle noise
        if (isPlaying && !isMuted) {
          bars[i].target = Math.random() * (canvas.height - 4) + 2;
        } else if (isPlaying && isMuted) {
          // Subtle active vibrations without audio
          bars[i].target = Math.random() * (canvas.height * 0.4) + 2;
        } else {
          // Minimal baseline frequencies
          bars[i].target = Math.random() * 4 + 2;
        }

        // Smooth interpolation (lerp)
        bars[i].height += (bars[i].target - bars[i].height) * 0.2;

        const x = i * (canvas.width / barCount);
        const w = (canvas.width / barCount) - 1.5;
        const y = canvas.height - bars[i].height;

        // Custom gradients
        const gradient = ctx.createLinearGradient(x, y, x, canvas.height);
        gradient.addColorStop(0, "rgba(168, 85, 247, 0.85)"); // Purple top
        gradient.addColorStop(1, "rgba(6, 182, 212, 0.75)"); // Cyan base

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, bars[i].height);
      }

      animId = requestAnimationFrame(drawVisualizer);
    };

    drawVisualizer();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isMuted]);

  // Video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    
    // Auto play setup (always start muted for autoplay success)
    video.muted = true;
    setIsMuted(true);
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Convert time to mm:ss
  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <>
      {/* 1. In-page Floating Holographic Video Deck */}
      <div 
        className="relative w-full max-w-xl mx-auto rounded-2xl border border-cyan-500/25 bg-zinc-950/70 p-1.5 shadow-[0_0_40px_rgba(6,182,212,0.1)] group hover:scale-[1.01] hover:border-cyan-500/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] scanner"
        style={{ perspective: "1000px" }}
      >
        {/* Holographic glowing crosshairs */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-400 opacity-60" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-400 opacity-60" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-400 opacity-60" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-400 opacity-60" />

        {/* Video Wrapper */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-zinc-900 group-hover:border-cyan-500/25 transition-all">
          <video
            ref={videoRef}
            src="/Portfolio_intro_video_creation.mp4"
            className="w-full h-full object-cover cursor-pointer"
            loop
            playsInline
            onClick={togglePlay}
          />

          {/* Holographic Scanning Line */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-1/2 w-full animate-pulse" />

          {/* Quick HUD Overlay */}
          <div className="absolute top-3 left-3 flex items-center space-x-2 text-[9px] font-mono bg-black/75 px-2.5 py-1 border border-cyan-500/20 rounded-md pointer-events-none">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span className="text-zinc-400">INTRO_NODE: ON_STAGE // 1080P</span>
          </div>

          <div className="absolute top-3 right-3 flex items-center space-x-2 text-[9px] font-mono bg-black/75 px-2.5 py-1 border border-cyan-500/20 rounded-md pointer-events-none">
            <span className="text-purple-400 animate-pulse">60.0 FPS</span>
          </div>

          {/* Audio Soundwave visualizer overlay on lower right */}
          <div className="absolute bottom-3 right-3 bg-black/60 border border-zinc-800 p-1.5 rounded-md pointer-events-none">
            <canvas ref={visualizerRef} width={80} height={20} className="block" />
          </div>

          {/* Center Play Button Overlay (Show only when paused) */}
          {!isPlaying && (
            <button 
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 flex items-center justify-center cursor-pointer shadow-lg shadow-cyan-500/30 scale-100 hover:scale-105 transition-transform"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </button>
          )}

          {/* Cinematic controls bar */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 flex items-center justify-between gap-3 text-white transition-opacity duration-300 font-mono text-[10px] z-20">
            <div className="flex items-center gap-2">
              <button 
                onClick={togglePlay} 
                className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button 
                onClick={toggleMute} 
                className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
              </button>
              <span>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="px-2 py-0.5 rounded border border-cyan-500/25 bg-cyan-950/20 hover:bg-cyan-500/10 text-cyan-400 flex items-center gap-1 cursor-pointer transition-all"
                title="Cinematic Fullscreen"
              >
                <Maximize2 className="w-3 h-3" />
                <span>CINEMA MODE</span>
              </button>
            </div>
          </div>
        </div>

        {/* HUD Sub-Metrics Deck */}
        <div className="flex justify-between items-center px-3 py-2 text-[9px] font-mono text-zinc-500 border-t border-zinc-900 mt-1 bg-black/40 rounded-b-xl">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-purple-400 animate-pulse" />
            <span>AI DECODING ACTIVE</span>
          </span>
          <span className="text-cyan-400">SYS_AUDIO: CONNECTED</span>
        </div>
      </div>

      {/* 2. Fullscreen Theater Cinematic Dim Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[99999] bg-black/98 flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in transition-all">
          
          {/* Top Control Header in Theatre Overlay */}
          <div className="w-full max-w-4xl flex items-center justify-between text-zinc-400 font-mono text-xs mb-4 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span className="font-bold text-white tracking-widest">IITJ_AI_STAGE_DECRYPTOR_V2.0</span>
            </div>
            
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-950/10 hover:bg-red-500/20 text-red-400 font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>TERMINATE CLIENT DECK</span>
            </button>
          </div>

          {/* Central Full Screen Video Container */}
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl border-2 border-cyan-400/40 shadow-[0_0_80px_rgba(6,182,212,0.35)] overflow-hidden bg-black bg-grid-white/[0.01]">
            
            {/* Glowing Golden Energy Halo Ambient backlights */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-amber-500/10 blur-3xl opacity-60 pointer-events-none -z-10" />

            <video
              ref={videoRef}
              src="/Portfolio_intro_video_creation.mp4"
              className="w-full h-full object-contain cursor-pointer"
              loop
              playsInline
              autoPlay
              onClick={togglePlay}
            />

            {/* Scanning Line overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-1/2 w-full animate-pulse" />

            {/* Left diagnostic status bar */}
            <div className="absolute top-4 left-4 p-3 bg-black/85 border border-zinc-800 rounded-lg max-w-xs font-mono text-[9px] text-zinc-400 space-y-2 pointer-events-none select-none">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold border-b border-zinc-800 pb-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>NEURAL ANALYSIS</span>
              </div>
              <div className="space-y-1">
                <div>NAME: SHRAVAN KUMAR</div>
                <div>DEGREE: APPLIED AI & DS</div>
                <div>INSTITUTION: IIT JODHPUR</div>
                <div>STARTUP: ONE DAY DELIVERY</div>
                <div className="text-purple-400 animate-pulse">STREAM STATUS: EXCELLENT</div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-4 flex items-center justify-between gap-4 text-white font-mono text-xs z-30">
              <div className="flex items-center gap-3">
                <button 
                  onClick={togglePlay} 
                  className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button 
                  onClick={toggleMute} 
                  className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
                </button>
                <span className="text-[10px] text-zinc-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Progress Slider representation */}
              <div className="flex-1 max-w-md mx-6 h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden p-[1px] hidden sm:block">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-cyan-500/10 text-cyan-400 px-2 py-1 border border-cyan-500/20 rounded">
                  CINEMA STATE: 100% ONLINE
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-[10px] text-zinc-500 font-mono mt-4 text-center">
            Click anywhere on stream center to toggle play/pause status node.
          </p>
        </div>
      )}
    </>
  );
}
