"use client";

import { usePortfolio } from "@/components/layout/portfolio-provider";
import { Download, FileText, Calendar, MapPin, Mail, Phone, Globe, ShieldCheck, ChevronRight } from "lucide-react";

export default function ResumePage() {
  const { portfolioData } = usePortfolio();
  const { personalInfo, education, experience, skills } = portfolioData;

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6">
        <div className="space-y-2 text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Interactive CV Terminal</span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
            Curriculum Vitae
          </h1>
        </div>

        {/* Download Button */}
        <a
          href="/Shravan_Kumar_Resume.pdf"
          download="Shravan_Kumar_Resume.pdf"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono text-xs font-bold transition-all duration-300 flex items-center shadow-lg shadow-cyan-500/20 hover:scale-105 cursor-pointer"
        >
          <Download className="w-4 h-4 mr-2" />
          <span>Download CV File</span>
        </a>
      </div>

      {/* Structured CV Panel */}
      <div className="p-6 md:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm space-y-10 text-left font-sans">
        
        {/* Name and Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-50">{personalInfo.name}</h2>
            <p className="text-xs font-mono text-cyan-500 font-semibold">{personalInfo.title}</p>
            <p className="text-xs text-zinc-500 max-w-lg leading-relaxed">{personalInfo.tagline}</p>
          </div>

          <div className="space-y-1.5 font-mono text-[10px] text-zinc-500">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-500" />
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-500" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/20 dark:border-zinc-800/60 mt-1">
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <a href={`http://${personalInfo.domain}`} className="hover:underline text-cyan-500">
                {personalInfo.domain}
              </a>
            </div>
          </div>
        </div>

        {/* Education Block */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-zinc-800 pb-1">
            01. Education Matrix
          </h3>
          {education.map((edu, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-start text-xs font-mono">
                <div>
                  <h4 className="font-bold text-zinc-800 dark:text-zinc-100">{edu.degree}</h4>
                  <p className="text-zinc-400">{edu.institution}</p>
                </div>
                <div className="text-right">
                  <span className="text-cyan-400">{edu.period}</span>
                  <p className="text-[10px] font-bold text-indigo-400">{edu.gpa}</p>
                </div>
              </div>
              <ul className="list-disc pl-4 text-xs text-zinc-500 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                {edu.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Experience Block */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-zinc-800 pb-1">
            02. Experience Timeline
          </h3>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-start text-xs font-mono">
                  <div>
                    <h4 className="font-bold text-zinc-800 dark:text-zinc-100">{exp.role}</h4>
                    <p className="text-zinc-400">{exp.company}</p>
                  </div>
                  <span className="text-indigo-400">{exp.period}</span>
                </div>
                <ul className="list-disc pl-4 text-xs text-zinc-500 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  {exp.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-zinc-800 pb-1">
            03. Core Skill Vectors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((group) => (
              <div key={group.category} className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                  {group.category}
                </h4>
                <div className="space-y-2 font-mono text-[10px]">
                  {group.skills.map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-zinc-400">
                        <span>{s.name}</span>
                        <span>{s.level}%</span>
                      </div>
                      <div className="h-1 bg-zinc-200 dark:bg-zinc-850 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: `${s.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System verification declaration */}
        <div className="border-t border-dashed border-zinc-200/60 dark:border-zinc-800/60 pt-6 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>METRICS CONFIRMED BY IIT JODHPUR OFFICE</span>
          </div>
          <span>Ref ID: BS-AI-2024-SK</span>
        </div>

      </div>
    </div>
  );
}
