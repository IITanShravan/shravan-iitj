"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, Terminal, BookOpen, FileText, Mail, Moon, Sun, Monitor, Code } from "lucide-react";

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


export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsOpen(false);
  };

  const navigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const executeCommand = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const commands = [
    { name: "Go to Home", path: "/", icon: Terminal, category: "Navigation" },
    { name: "Go to About Journey", path: "/about", icon: Globe, category: "Navigation" },
    { name: "Explore Tech Projects", path: "/projects", icon: Code, category: "Navigation" },
    { name: "Read Dynamic Blogs", path: "/blog", icon: BookOpen, category: "Navigation" },
    { name: "Handwritten Academic Notes", path: "/notes", icon: BookOpen, category: "Navigation" },
    { name: "Interactive Resume CV", path: "/resume", icon: FileText, category: "Navigation" },
    { name: "Contact & Availability", path: "/contact", icon: Mail, category: "Navigation" },
    { name: "Admin Dashboard Access", path: "/dashboard", icon: Monitor, category: "Navigation" },
    {
      name: "Open GitHub Profile",
      action: () => window.open("https://github.com/IITanShravan", "_blank"),
      icon: Github,
      category: "Social Links",
    },
    {
      name: "Open Kaggle Profile",
      action: () => window.open("https://www.kaggle.com/iitanshravan", "_blank"),
      icon: Globe,
      category: "Social Links",
    },
    {
      name: "Open LinkedIn Profile",
      action: () => window.open("https://www.linkedin.com/in/iitanshravan/", "_blank"),
      icon: Globe,
      category: "Social Links",
    },
    {
      name: "Toggle Dark/Light Mode",
      action: toggleTheme,
      icon: Moon,
      category: "Preferences",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop blur overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-lg bg-zinc-900/90 border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] text-zinc-100 overflow-hidden flex flex-col max-h-[50vh]">
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-950/40">
          <Search className="w-5 h-5 text-cyan-400 mr-3 animate-pulse" />
          <input
            type="text"
            className="flex-1 bg-transparent border-0 outline-none text-sm placeholder-zinc-500 text-zinc-100"
            placeholder="Type a command or page name..."
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results grid */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-xs text-zinc-500 font-mono">
              No matching commands or pages found.
            </div>
          ) : (
            ["Navigation", "Social Links", "Preferences"].map((cat) => {
              const items = filteredCommands.filter((c) => c.category === cat);
              if (items.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-mono tracking-widest text-cyan-400/60 uppercase">
                    {cat}
                  </div>
                  {items.map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.name}
                        onClick={() => {
                          if (cmd.path) navigate(cmd.path);
                          if (cmd.action) executeCommand(cmd.action);
                        }}
                        className="w-full flex items-center px-3 py-2 text-xs font-mono text-left rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/80 hover:border-l-2 hover:border-cyan-400 transition-all group"
                      >
                        <Icon className="w-4 h-4 mr-3 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                        <span className="flex-1">{cmd.name}</span>
                        {cmd.path && (
                          <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400">
                            Go to
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-zinc-950/60 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono flex justify-between">
          <span>Use ↑↓ to navigate, Enter to choose</span>
          <span>Press Cmd+K to close</span>
        </div>
      </div>
    </div>
  );
}
