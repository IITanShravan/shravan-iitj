"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X, Moon, Sun, Search } from "lucide-react";


export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Set default theme as dark on mount
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const doc = document.documentElement;
    if (theme === "light") {
      setIsDark(false);
      doc.classList.remove("dark");
    } else {
      setIsDark(true);
      doc.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const doc = document.documentElement;
    if (isDark) {
      doc.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      doc.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Notes", href: "/notes" },
    { label: "Blog", href: "/blog" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Title */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Terminal className="h-6 w-6 text-cyan-500 transition-transform group-hover:rotate-12" />
            <span className="font-mono text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
              shravan<span className="text-cyan-500">.sh</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all relative ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400 bg-cyan-500/5 font-semibold"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center space-x-2">
            {/* Search CMD+K Trigger */}
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  bubbles: true,
                });
                window.dispatchEvent(event);
              }}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 font-mono text-xs hidden sm:flex items-center space-x-1.5 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5"
              title="Open Command Palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span>⌘K</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-cyan-400" />
              ) : (
                <Moon className="h-4 w-4 text-cyan-600" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-mono transition-all ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400 bg-cyan-500/5 font-semibold"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
