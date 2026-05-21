"use client";

import { useState } from "react";
import { Project } from "@/data/portfolio-data";
import { usePortfolio } from "@/components/layout/portfolio-provider";
import { Code, Globe, Star, Search, ArrowUpRight, Award, Compass, Eye, X } from "lucide-react";

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


export default function Projects() {
  const { portfolioData } = usePortfolio();
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { value: "all", label: "All Repository Nodes" },
    { value: "ml-ds", label: "Machine Learning & DS" },
    { value: "startup", label: "Startup Engineering" },
    { value: "kaggle", label: "Kaggle Submissions" },
    { value: "web-dev", label: "Full Stack Web" },
  ];

  const filteredProjects =
    filter === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === filter);

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-2 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Core Repositories</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
          Technical Projects
        </h1>
        <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-xl">
          A list of my exploratory data analyses, optimized routing modules, and production-grade client apps.
        </p>
      </div>

      {/* Filter Menu */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 border ${
              filter === cat.value
                ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-400"
                : "bg-transparent border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.03)] flex flex-col justify-between space-y-4 hover:border-cyan-500/20 transition-all duration-300 group"
          >
            {/* Top Area */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono font-bold text-cyan-500 bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded uppercase">
                  {p.category}
                </span>
                {p.featured && (
                  <span className="text-[9px] font-mono text-yellow-500 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500" />
                    <span>FEATURED</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold font-sans text-zinc-800 dark:text-zinc-100 group-hover:text-cyan-400 transition-colors">
                {p.title}
              </h3>
              
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                {p.description}
              </p>
            </div>

            {/* Bottom Area */}
            <div className="space-y-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 text-[8.5px] font-mono text-zinc-500 dark:text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Paths */}
              <div className="flex items-center justify-between text-xs font-mono">
                {/* View Details Button */}
                <button
                  onClick={() => setSelectedProject(p)}
                  className="text-cyan-500 hover:text-cyan-400 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Deep Inspect</span>
                </button>

                <div className="flex space-x-3">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 flex items-center gap-1"
                      title="GitHub Source"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-500 hover:text-cyan-400 flex items-center gap-1"
                      title="Live Demo"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.kaggle && (
                    <a
                      href={p.kaggle}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-500 hover:text-indigo-400 flex items-center gap-1"
                      title="Kaggle Workspace"
                    >
                      <Compass className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Interactive Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-zinc-950/95 border border-cyan-500/25 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)] text-zinc-100 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-[9px] font-mono text-cyan-400 tracking-wider uppercase border border-cyan-500/20 px-2 py-0.5 rounded">
                Project Matrix Overview
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="p-6 overflow-y-auto space-y-6 font-mono text-xs leading-relaxed">
              <div className="space-y-2 text-left">
                <h2 className="text-xl font-bold font-sans text-white group-hover:text-cyan-400">
                  {selectedProject.title}
                </h2>
                <div className="text-[10px] text-zinc-400">
                  Category: {selectedProject.category} | Host status: ACTIVE
                </div>
              </div>

              {/* Explanatory detail bullet points */}
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase text-cyan-400 tracking-widest border-b border-zinc-800 pb-1">
                  Architecture & Implementation details
                </h4>
                <ul className="space-y-3 list-disc pl-4 text-zinc-300">
                  {selectedProject.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* Tech specifications */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase text-cyan-400 tracking-widest border-b border-zinc-800 pb-1">
                  Technological Stack
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-zinc-950 px-6 py-4 border-t border-zinc-800 flex justify-end gap-3 font-mono text-xs">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-300 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Code</span>
                </a>
              )}
              {(selectedProject.demo || selectedProject.kaggle) && (
                <a
                  href={selectedProject.demo || selectedProject.kaggle}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Deploy Link</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
