"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, ShieldAlert, Sparkles, CheckCircle } from "lucide-react";

interface WarpSpeedLoaderProps {
  onComplete: () => void;
}

export default function WarpSpeedLoader({ onComplete }: WarpSpeedLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [logIdx, setLogIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const logs = [
    "[BOOT] Core decrypter initialization sequence... ACTIVE",
    "[BOOT] Loading high-dimensional linear algebra kernels...",
    "[DECRYPT] Initializing Applied AI database nodes...",
    "[SECURE] Mapping probability networks & statistical frameworks...",
    "[STATUS] Synchronizing IIT Jodhpur neural cluster array...",
    "[DECRYPT] Parsing project vectors & local CVRP schemas...",
    "[DECRYPT] Mapping professional bio details & Kaggle databases...",
    "[STATUS] Compiling cyber HUD layouts and glass assets...",
    "[COMPLETE] Decryption successful. Decrypted kernel core v2.0."
  ];

  // Progress counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 800); // Wait for fade-out CSS transitions
          }, 600);
          return 100;
        }
        
        // Dynamic increments
        const step = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(100, prev + step);
        
        // Map progress to log indexes
        const idx = Math.floor((next / 100) * logs.length);
        setLogIdx(Math.min(logs.length - 1, idx));
        
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Canvas Warp Speed Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    const starCount = 350;
    
    // Core parameters for 3D star projection
    const fov = 160;
    
    class Star {
      x: number;
      y: number;
      z: number;
      color: string;
      length: number;

      constructor(w: number, h: number) {
        this.x = (Math.random() - 0.5) * w * 1.5;
        this.y = (Math.random() - 0.5) * h * 1.5;
        this.z = Math.random() * 2000;
        this.length = 0;

        // Give them neon colors (cyan/purple/blue/gold)
        const rand = Math.random();
        if (rand < 0.4) this.color = "rgba(6, 182, 212, "; // Cyan
        else if (rand < 0.7) this.color = "rgba(168, 85, 247, "; // Purple
        else if (rand < 0.9) this.color = "rgba(59, 130, 246, "; // Blue
        else this.color = "rgba(245, 158, 11, "; // Gold
      }

      update(w: number, h: number, speed: number) {
        this.z -= speed;

        if (this.z <= 0) {
          this.z = 2000;
          this.x = (Math.random() - 0.5) * w * 1.5;
          this.y = (Math.random() - 0.5) * h * 1.5;
        }
      }

      draw(c: CanvasRenderingContext2D, w: number, h: number, speed: number) {
        // Project to 2D coordinates
        const px = (this.x / this.z) * fov + w / 2;
        const py = (this.y / this.z) * fov + h / 2;

        if (px < 0 || px > w || py < 0 || py > h) return;

        // Calculate tail coordinate (streak effect)
        const tailZ = this.z + speed * 1.5;
        const tx = (this.x / tailZ) * fov + w / 2;
        const ty = (this.y / tailZ) * fov + h / 2;

        // Opacity drops as star approaches camera boundary
        const opacity = Math.min(1, (2000 - this.z) / 500);

        c.strokeStyle = this.color + opacity + ")";
        c.lineWidth = Math.max(1, (2000 - this.z) / 400);
        c.beginPath();
        c.moveTo(px, py);
        c.lineTo(tx, ty);
        c.stroke();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }
    };

    window.addEventListener("resize", init);
    init();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Dark fade trails
      ctx.fillStyle = "rgba(2, 2, 5, 0.25)";
      ctx.fillRect(0, 0, w, h);

      // Determine hyperspace velocity based on current loading progress
      // Velocity ramps up, and then "brakes" near 100% for a cinematic zoom reveal
      let speed = 25;
      if (progress < 40) speed = 12 + (progress / 40) * 15;
      else if (progress < 90) speed = 27 + Math.sin(progress) * 3;
      else speed = 27 - ((progress - 90) / 10) * 22; // Smooth deceleration

      for (let i = 0; i < stars.length; i++) {
        stars[i].update(w, h, speed);
        stars[i].draw(ctx, w, h, speed);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
    };
  }, [progress]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 font-mono text-xs select-none transition-all duration-1000 ${
        isFading ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 3D Warp Speed Background */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* Futuristic Decryption HUD Box */}
      <div className="relative w-[90%] max-w-lg p-6 rounded-2xl border border-cyan-500/35 bg-black/85 backdrop-blur-md shadow-[0_0_60px_rgba(6,182,212,0.2)] text-left space-y-6 overflow-hidden">
        {/* Neon light scanline bar */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,1)]" />
        
        {/* Grid Floor Overlay in HUD */}
        <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />

        {/* HUD Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 relative z-10">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-bold uppercase tracking-widest text-[10px]">IIT-J System Diagnostic v2.0</span>
          </div>
          <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded animate-pulse">
            DECRYPTING...
          </span>
        </div>

        {/* Active boot logs simulation */}
        <div className="h-28 space-y-2 overflow-hidden text-[10px] text-zinc-400 relative z-10 leading-relaxed font-mono">
          {logs.slice(0, logIdx).map((log, i) => (
            <div key={i} className="flex items-start gap-1 text-emerald-400 opacity-60">
              <span>{">"}</span>
              <span>{log}</span>
            </div>
          ))}
          <div className="flex items-start gap-1 text-cyan-400 font-bold animate-pulse">
            <span>{">"}</span>
            <span>{logs[logIdx]}</span>
          </div>
        </div>

        {/* Progress Bar HUD */}
        <div className="space-y-2 relative z-10">
          <div className="flex justify-between items-baseline text-[10px] font-bold text-zinc-300 uppercase">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Bio-Decryption Synchronization</span>
            </span>
            <span className="text-cyan-400">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(6,182,212,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer info metrics */}
        <div className="flex justify-between items-center text-[8px] text-zinc-500 pt-2 border-t border-zinc-900 relative z-10">
          <span>PORT: 3000 // LOC: 26.27 N, 73.11 E (IITJ)</span>
          <span>COMPILING DYNAMIC HUD SCHEMA</span>
        </div>
      </div>
    </div>
  );
}
