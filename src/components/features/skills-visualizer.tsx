"use client";

import { useState } from "react";
import { usePortfolio } from "@/components/layout/portfolio-provider";
import { Terminal, Shield, Code, Database, BrainCircuit } from "lucide-react";

export default function SkillsVisualizer() {
  const { portfolioData } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Programming & Core", "Data Science & Analytics", "Databases & Web Tech"];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Programming & Core":
        return <Code className="w-4 h-4 text-cyan-400" />;
      case "Data Science & Analytics":
        return <BrainCircuit className="w-4 h-4 text-indigo-400" />;
      case "Databases & Web Tech":
        return <Database className="w-4 h-4 text-emerald-400" />;
      default:
        return <Terminal className="w-4 h-4 text-zinc-400" />;
    }
  };

  const allSkills = portfolioData.skills.flatMap((group) =>
    group.skills.map((s) => ({ ...s, category: group.category }))
  );

  const displayedSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  return (
    <div className="w-full space-y-6">
      {/* Category selector */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 border flex items-center gap-2 ${
              activeCategory === cat
                ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-400"
                : "bg-transparent border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {getCategoryIcon(cat)}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Grid of skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedSkills.map((skill, index) => {
          // Color styles based on competency level or category
          const isDS = skill.category.includes("Data Science");
          const isWeb = skill.category.includes("Web");
          
          const glowColor = isDS 
            ? "shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
            : isWeb 
            ? "shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
            : "shadow-[0_0_15px_rgba(6,182,212,0.15)]";

          const barGradient = isDS
            ? "from-indigo-500 to-purple-600"
            : isWeb
            ? "from-emerald-400 to-teal-500"
            : "from-cyan-400 to-blue-500";

          const bgHover = isDS
            ? "group-hover:border-indigo-500/30"
            : isWeb
            ? "group-hover:border-emerald-500/30"
            : "group-hover:border-cyan-500/30";

          return (
            <div
              key={skill.name}
              className={`p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm transition-all duration-300 group hover:translate-y-[-2px] hover:shadow-lg ${glowColor} ${bgHover}`}
            >
              <div className="flex items-center justify-between mb-3 font-mono">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  {skill.level}%
                </span>
              </div>

              {/* Glowing bar track */}
              <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${barGradient} transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Extra details on category */}
              <div className="flex justify-between items-center mt-3 text-[9px] font-mono text-zinc-400">
                <span className="opacity-60">{skill.category.split(" ")[0]}</span>
                <span className="opacity-80">
                  {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : "Intermediate"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
