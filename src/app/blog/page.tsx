"use client";

import { useState, useEffect } from "react";
import { Blog } from "@/data/portfolio-data";
import { usePortfolio } from "@/components/layout/portfolio-provider";
import { BookOpen, Calendar, Clock, ArrowLeft, Search, Eye, ArrowUpRight, Copy, Check, Sparkles } from "lucide-react";

export default function BlogPage() {
  const { portfolioData } = usePortfolio();
  const { blogs } = portfolioData;
  const [search, setSearch] = useState("");
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Monitor scroll for reading progress bar inside the blog viewer
  useEffect(() => {
    if (!activeBlog) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const container = document.getElementById("blog-content-container");
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    const container = document.getElementById("blog-content-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeBlog]);

  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 relative">
      {/* Blog Index view */}
      {!activeBlog ? (
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-2 text-left font-sans">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Technical Logbook</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Scientific Blogs
            </h1>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-xl">
              Exploring calculations, machine learning frameworks, operations research algorithms, and campus reflections.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search articles by tag, code keyword, or title..."
              className="w-full bg-white/40 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-zinc-800 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Blogs list */}
          <div className="space-y-6">
            {filteredBlogs.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-zinc-500">
                No blog articles found.
              </div>
            ) : (
              filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.02)] flex flex-col md:flex-row gap-6 justify-between items-start hover:border-cyan-500/20 transition-all duration-300 group cursor-pointer"
                  onClick={() => setActiveBlog(blog)}
                >
                  {/* Text area */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTime}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] uppercase">
                        {blog.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-sans text-zinc-800 dark:text-zinc-100 group-hover:text-cyan-400 transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans max-w-2xl">
                      {blog.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {blog.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 text-[8.5px] font-mono text-zinc-500 dark:text-zinc-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Icon indicator */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveBlog(blog);
                    }}
                    className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 group-hover:border-cyan-500/30 text-zinc-400 group-hover:text-cyan-400 bg-white/50 dark:bg-zinc-900/50 hover:scale-105 transition-all shrink-0 self-start md:self-center"
                    title="Read Article"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Detailed Blog reading view */
        <div className="space-y-6">
          {/* Scroll progress bar */}
          <div className="fixed top-16 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 z-[99]">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Navigation controller */}
          <button
            onClick={() => setActiveBlog(null)}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/30 rounded-lg text-xs font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Logbook</span>
          </button>

          {/* Article Panel container */}
          <div
            id="blog-content-container"
            className="p-6 md:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm max-h-[75vh] overflow-y-auto space-y-8"
          >
            {/* Header info */}
            <div className="space-y-4 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6 text-left">
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activeBlog.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeBlog.readTime}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] uppercase">
                  {activeBlog.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold font-sans text-zinc-900 dark:text-zinc-50 leading-tight">
                {activeBlog.title}
              </h1>

              <div className="flex flex-wrap gap-1.5">
                {activeBlog.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 text-[8.5px] font-mono text-zinc-500 dark:text-zinc-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Markdown styled Content layout */}
            <div className="prose prose-zinc dark:prose-invert max-w-none text-left font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-6">
              <div className="whitespace-pre-wrap font-mono text-xs leading-loose">
                {activeBlog.content}
              </div>

              {/* Related Article Box */}
              <div className="mt-12 p-6 rounded-xl border border-dashed border-cyan-500/25 bg-cyan-500/5 space-y-2 font-mono text-xs">
                <h4 className="font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <Sparkles className="w-4.5 h-4.5 text-cyan-400" />
                  <span>Related Research Node</span>
                </h4>
                <p className="text-zinc-400">
                  Enjoyed this write-up? Inspect the complete project vector scripts inside my GitHub repositories or test the live deployment on my domains!
                </p>
                <div className="pt-2">
                  <a
                    href="https://github.com/IITanShravan"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>View GitHub kernels</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
