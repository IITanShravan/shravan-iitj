"use client";

import { useState } from "react";
import { Note } from "@/data/portfolio-data";
import { usePortfolio } from "@/components/layout/portfolio-provider";
import { BookOpen, Search, Download, FileText, ChevronRight, X, Calendar, Tag, Sparkles } from "lucide-react";

export default function Notes() {
  const { portfolioData } = usePortfolio();
  const { notes } = portfolioData;
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const categories = ["All", "Statistics", "Machine Learning"];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-2 text-left font-sans">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Digital Library</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Handwritten & LaTeX Notes
        </h1>
        <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-xl">
          Quick equations, cheat sheets, and statistical inference notes extracted from my Applied AI exams at IIT Jodhpur.
        </p>
      </div>

      {/* Control Panel: Search & Categories */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search notes by formula, tag or keywords..."
            className="w-full bg-white/40 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-zinc-800 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedCategory === cat
                  ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-400"
                  : "bg-transparent border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs font-mono text-zinc-500">
            No notes found matching your criteria.
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.02)] flex flex-col justify-between space-y-4 hover:border-cyan-500/20 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{note.date}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 uppercase">
                    {note.category}
                  </span>
                </div>

                <h3 className="text-base font-bold font-sans text-zinc-800 dark:text-zinc-100 group-hover:text-cyan-400 transition-colors">
                  {note.title}
                </h3>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                  {note.description}
                </p>
              </div>

              {/* Badges and Actions */}
              <div className="space-y-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 text-[8.5px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  {/* View Details / PDF trigger */}
                  <button
                    onClick={() => setActiveNote(note)}
                    className="text-cyan-500 hover:text-cyan-400 flex items-center gap-1.5 font-bold cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open Note Viewer</span>
                  </button>

                  {/* Simulated PDF direct download */}
                  <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(note.content)}`}
                    download={`${note.id}-notes.md`}
                    className="text-zinc-500 hover:text-cyan-400 flex items-center gap-1"
                    title="Download Note File"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Interactive Note/PDF Viewer Modal */}
      {activeNote && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setActiveNote(null)}
          />

          <div className="relative w-full max-w-3xl bg-zinc-950/95 border border-cyan-500/25 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)] text-zinc-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header / Controller */}
            <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-zinc-200">Interactive PDF Reader</span>
              </div>
              <div className="flex items-center gap-4">
                {/* Download */}
                <a
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(activeNote.content)}`}
                  download={`${activeNote.id}-notes.md`}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-all flex items-center gap-1"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[10px]">Download Markdown</span>
                </a>
                <button
                  onClick={() => setActiveNote(null)}
                  className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Note document text area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 max-h-[70vh] font-mono text-xs leading-relaxed text-zinc-300">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 text-left">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold font-sans text-white">
                    {activeNote.title}
                  </h2>
                  <div className="text-[10px] text-zinc-400">
                    Category: {activeNote.category} | Log date: {activeNote.date}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[9px] bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded text-cyan-400">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>LaTeX Active</span>
                </div>
              </div>

              {/* Rich contents */}
              <div className="space-y-6 whitespace-pre-wrap leading-loose">
                {activeNote.content}
              </div>
            </div>

            {/* Footer status bar */}
            <div className="bg-zinc-950 px-6 py-3 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono flex justify-between">
              <span>Viewer initialized: 100% vector scaling</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
