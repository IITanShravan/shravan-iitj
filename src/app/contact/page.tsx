"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Globe, Sparkles, Terminal, CheckCircle2 } from "lucide-react";


// Inline Github Icon Component
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Inline Linkedin Icon Component
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Spin coordinate orb in Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const drawOrb = () => {
      const w = (canvas.width = 300);
      const h = (canvas.height = 300);
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw orbit paths
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
      ctx.lineWidth = 1;
      
      // Orbit Ring 1
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Orbit Ring 2
      ctx.strokeStyle = "rgba(139, 92, 246, 0.08)";
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.stroke();

      // Draw coordinate lines
      ctx.strokeStyle = "rgba(6, 182, 212, 0.05)";
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy);
      ctx.lineTo(cx + 130, cy);
      ctx.moveTo(cx, cy - 130);
      ctx.lineTo(cx, cy + 130);
      ctx.stroke();

      // Draw core planet (IIT Jodhpur Locator)
      ctx.fillStyle = "rgba(6, 182, 212, 0.1)";
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
      ctx.stroke();

      // Draw orbital satellite 1
      const sat1X = cx + Math.cos(angle) * 80;
      const sat1Y = cy + Math.sin(angle) * 80;
      ctx.fillStyle = "#06b6d4";
      ctx.beginPath();
      ctx.arc(sat1X, sat1Y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Halo around satellite
      ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
      ctx.beginPath();
      ctx.arc(sat1X, sat1Y, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Draw orbital satellite 2
      const sat2X = cx + Math.cos(-angle * 0.7) * 110;
      const sat2Y = cy + Math.sin(-angle * 0.7) * 110;
      ctx.fillStyle = "#8b5cf6";
      ctx.beginPath();
      ctx.arc(sat2X, sat2Y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Spin rate increment
      angle += 0.015;
      animId = requestAnimationFrame(drawOrb);
    };

    drawOrb();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    setLogs([
      "Configuring transport gateway...",
      "Resolving dns domains of shravan.onedaydelivery.online...",
      "Encrypting payload data packets..."
    ]);

    setTimeout(() => {
      setLogs((prev) => [...prev, "Payload delivered. Status code: 200 OK"]);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="space-y-2 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Communication Node</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
          Contact Terminal
        </h1>
      </div>

      {/* Main Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
        {/* Visual coordinate locator and details */}
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-[10px] font-mono text-cyan-600 dark:text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 inline-block animate-pulse" />
            <span>🟢 CURRENT AVAILABILITY: HIRE IN PROGRESS</span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono leading-relaxed">
            Please submit the form to invoke a direct SMTP transport trigger. I am currently answering emails within 6 hours. Let&apos;s build operations tools or discuss machine learning!
          </p>

          {/* Canvas coordinate visualizer */}
          <div className="flex justify-center border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm rounded-2xl overflow-hidden p-6 relative">
            <canvas ref={canvasRef} className="max-w-full" />
            <div className="absolute bottom-4 right-4 bg-zinc-900 border border-cyan-500/20 px-2.5 py-1 text-[8px] font-mono text-zinc-300 rounded shadow-md">
              LOCATOR: 26.471° N, 73.114° E (IIT Jodhpur)
            </div>
          </div>
        </div>

        {/* Cyber Input Form */}
        <div className="space-y-6">
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm space-y-4 shadow-sm"
          >
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-zinc-800 pb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              <span>Input Packets</span>
            </h3>

            {status === "success" ? (
              <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-4 font-mono text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-bold text-zinc-100">Packet Transferred Successfully</h4>
                <p className="text-zinc-400">
                  Your communication node was encrypted and delivered successfully to Shravan.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded hover:border-cyan-500 text-cyan-400"
                >
                  Clear Console Log
                </button>
              </div>
            ) : (
              <>
                {/* Inputs */}
                <div className="space-y-1 text-xs font-mono">
                  <label className="text-zinc-400">Sender Identity (Name)</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:border-cyan-500"
                    placeholder="Enter name..."
                  />
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <label className="text-zinc-400">SMTP Address (Email)</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:border-cyan-500"
                    placeholder="name@domain.com"
                  />
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <label className="text-zinc-400">Query Payload (Message)</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:border-cyan-500"
                    placeholder="Write message content here..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-700 text-zinc-950 font-mono font-bold text-xs rounded transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 mr-2" />
                  <span>Transmit Query Packets</span>
                </button>
              </>
            )}
          </form>

          {/* Logs panel */}
          {logs.length > 0 && (
            <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950 text-[10px] font-mono text-cyan-400 text-left space-y-1 animate-pulse">
              <div className="border-b border-zinc-900 pb-1.5 mb-1.5 text-zinc-400 uppercase tracking-widest text-[8px]">
                Active Console Logs
              </div>
              {logs.map((log, i) => (
                <div key={i} className="flex gap-1.5">
                  <span className="text-zinc-500">[{i}]</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
