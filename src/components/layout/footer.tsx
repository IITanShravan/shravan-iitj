"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { usePortfolio } from "@/components/layout/portfolio-provider";

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


export default function Footer() {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-950/40 py-12 transition-colors duration-300 font-mono text-xs text-zinc-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand/Signature */}
          <div className="space-y-3">
            <h3 className="text-zinc-900 dark:text-zinc-100 font-bold text-sm font-sans tracking-tight">
              Shravan Kumar
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Applied AI & Data Science undergraduate at IIT Jodhpur. Startup founder, builder, and research student.
            </p>
          </div>

          {/* Quick Contact info */}
          <div className="space-y-2">
            <h4 className="text-zinc-800 dark:text-zinc-300 font-bold text-xs uppercase tracking-wider">
              Contact Matrix
            </h4>
            <div className="space-y-1.5">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center hover:text-cyan-500 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 mr-2 text-zinc-400" />
                <span>{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center hover:text-cyan-500 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 mr-2 text-zinc-400" />
                <span>{personalInfo.phone}</span>
              </a>
              <div className="flex items-center text-zinc-400">
                <MapPin className="w-3.5 h-3.5 mr-2 text-zinc-400" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Social and Profile links */}
          <div className="space-y-3">
            <h4 className="text-zinc-800 dark:text-zinc-300 font-bold text-xs uppercase tracking-wider">
              External Kernels
            </h4>
            <div className="flex space-x-3">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-zinc-600 dark:text-zinc-400 transition-all border border-zinc-200 dark:border-zinc-800"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-zinc-600 dark:text-zinc-400 transition-all border border-zinc-200 dark:border-zinc-800"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.kaggle}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-zinc-600 dark:text-zinc-400 transition-all border border-zinc-200 dark:border-zinc-800"
                aria-label="Kaggle Profile"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
            <div className="text-[10px] text-zinc-400">
              Host Domain:{" "}
              <a
                href={`http://${personalInfo.domain}`}
                className="text-cyan-500 hover:underline"
              >
                {personalInfo.domain}
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic copyright and systems state */}
        <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Shravan Kumar. All rights reserved.</p>
          <div className="flex items-center space-x-3 text-[10px] text-zinc-400">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>SYSTEM STATE: PROD-READY v1.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
