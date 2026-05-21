"use client";

import SkillsVisualizer from "@/components/features/skills-visualizer";
import { usePortfolio } from "@/components/layout/portfolio-provider";
import { GraduationCap, Briefcase, Award, Zap, Compass, CheckCircle2, TrendingUp } from "lucide-react";

export default function About() {
  const { portfolioData } = usePortfolio();
  const { personalInfo, education, experience, interests, certifications } = portfolioData;

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Profile Header & Bio */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Biological Details</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
              About Shravan Kumar
            </h1>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
            {personalInfo.bio}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              "Strong mathematical foundational learner",
              "Specializing in Operations Optimization",
              "Passionate about quantitative models",
              "Adept at building interactive Streamlit tools"
            ].map((pt) => (
              <div key={pt} className="flex items-center space-x-2 text-xs font-mono text-zinc-500">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Column */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.01)] space-y-6">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-zinc-800 pb-2">
            System Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "8.0", label: "Max CGPA", extra: "Sem 2 Peak" },
              { val: "5+", label: "Python Apps", extra: "GitHub Repos" },
              { val: "1.2+", label: "Yrs Student", extra: "IIT Jodhpur" },
              { val: "3+", label: "Credentials", extra: "ML & SQL" }
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                  {stat.val}
                </div>
                <div className="text-[10px] font-mono font-bold text-zinc-800 dark:text-zinc-200">{stat.label}</div>
                <div className="text-[8px] font-mono text-zinc-500">{stat.extra}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Timeline (Education & Career) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education Timeline */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold font-sans tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <span>Academic Pipeline</span>
          </h2>
          <div className="border-l border-zinc-200 dark:border-zinc-800 ml-3.5 space-y-8 relative">
            {education.map((edu, idx) => (
              <div key={idx} className="relative pl-6">
                <span className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-500 border border-zinc-950 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                <span className="text-[10px] font-mono text-cyan-500">{edu.period}</span>
                <h3 className="text-sm font-bold font-sans text-zinc-800 dark:text-zinc-100">{edu.degree}</h3>
                <p className="text-xs font-mono text-zinc-500">{edu.institution}</p>
                <div className="inline-block px-2 py-0.5 mt-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono text-indigo-400">
                  {edu.gpa}
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-zinc-500 list-disc pl-4 leading-relaxed font-sans">
                  {edu.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold font-sans tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>Professional Kernels</span>
          </h2>
          <div className="border-l border-zinc-200 dark:border-zinc-800 ml-3.5 space-y-8 relative">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-6">
                <span className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-500 border border-zinc-950 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                <span className="text-[10px] font-mono text-indigo-400">{exp.period}</span>
                <h3 className="text-sm font-bold font-sans text-zinc-800 dark:text-zinc-100">{exp.role}</h3>
                <p className="text-xs font-mono text-zinc-500">{exp.company}</p>
                <ul className="mt-3 space-y-1.5 text-xs text-zinc-500 list-disc pl-4 leading-relaxed font-sans">
                  {exp.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Skills Visualization Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Core Assets</span>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Skills Competency Visualizer
          </h2>
        </div>
        <SkillsVisualizer />
      </section>

      {/* 4. Interests & Goals */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Interests */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>Academic Focus Zones</span>
          </h3>
          <div className="flex flex-wrap gap-2 pt-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-1 rounded bg-zinc-100 hover:bg-cyan-500/5 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/20 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Aspirations Matrix</span>
          </h3>
          <ul className="space-y-3 font-mono text-[10px] text-zinc-500">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <span>Acquire high expertise in training sparse autoencoders and quantitative transformers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <span>Expand One Day Delivery system architecture to solve regional cargo challenges.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <span>Publish mathematical notes on multi-variate statistical optimization modeling.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Certifications & Badges */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-sans tracking-tight text-zinc-950 dark:text-zinc-50 flex items-center space-x-2">
          <Award className="w-5 h-5 text-cyan-400" />
          <span>Achievements & Credentials</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm space-y-3 hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono font-bold text-cyan-500 bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded">
                  {cert.badge}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{cert.date}</span>
              </div>
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 font-mono leading-relaxed">
                {cert.name}
              </h3>
              <p className="text-[10px] font-mono text-zinc-400">Issuer: {cert.issuer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
