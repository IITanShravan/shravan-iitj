"use client";

import { useState } from "react";
import { Sparkles, GitBranch, Heart } from "lucide-react";

export default function ContributionGrid() {
  const [hoveredCell, setHoveredCell] = useState<{ day: number; count: number } | null>(null);

  // Define total mock weeks and days (53 weeks * 7 days)
  const totalWeeks = 28;
  const days = Array.from({ length: totalWeeks * 7 }).map((_, index) => {
    // Generate a pseudo-random activity density for Shravan Kumar's commits
    const random = Math.sin(index * 0.15) * Math.cos(index * 0.05);
    let count = 0;
    if (random > 0.6) count = Math.floor(Math.random() * 5) + 6;
    else if (random > 0.2) count = Math.floor(Math.random() * 3) + 3;
    else if (random > -0.2) count = Math.floor(Math.random() * 2) + 1;

    return {
      day: index,
      count,
    };
  });

  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800/40";
    if (count <= 2) return "bg-cyan-500/20 border-cyan-500/10 text-cyan-300";
    if (count <= 5) return "bg-cyan-500/45 border-cyan-500/20 text-cyan-200";
    return "bg-cyan-400 dark:bg-cyan-500 border-cyan-300 dark:border-cyan-400 text-zinc-950 shadow-[0_0_8px_rgba(6,182,212,0.4)]";
  };

  return (
    <div className="w-full p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.02)] space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
        <div className="flex items-center space-x-2">
          <GitBranch className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
            Open-Source Kernel Activity
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-zinc-400">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-800/40" />
          <div className="w-2.5 h-2.5 rounded bg-cyan-500/20 border border-cyan-500/10" />
          <div className="w-2.5 h-2.5 rounded bg-cyan-500/45 border border-cyan-500/20" />
          <div className="w-2.5 h-2.5 rounded bg-cyan-500 border border-cyan-400" />
          <span>More</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="relative overflow-x-auto select-none py-2">
        <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[380px]">
          {days.map((d) => (
            <div
              key={d.day}
              onMouseEnter={() => setHoveredCell({ day: d.day, count: d.count })}
              onMouseLeave={() => setHoveredCell(null)}
              className={`w-[11px] h-[11px] rounded-[2.5px] border transition-all duration-150 cursor-crosshair hover:scale-125 hover:z-10 ${getIntensityColor(
                d.count
              )}`}
            />
          ))}
        </div>

        {/* Floating Tooltip */}
        {hoveredCell && (
          <div className="absolute top-[-30px] right-2 bg-zinc-900 border border-cyan-500/30 rounded px-2.5 py-1 text-[9px] font-mono text-zinc-100 shadow-xl z-20 pointer-events-none">
            {hoveredCell.count === 0
              ? "No contributions"
              : `${hoveredCell.count} commits & push events`}{" "}
            on day #{hoveredCell.day + 1}
          </div>
        )}
      </div>

      {/* Highlights Bar */}
      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Average density: 3.4 push/day</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3 text-red-500" />
          <span>Active contributor since 2024</span>
        </div>
      </div>
    </div>
  );
}
