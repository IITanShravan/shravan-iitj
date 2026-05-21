"use client";

import { useState } from "react";
import { usePortfolio } from "@/components/layout/portfolio-provider";
import {
  Lock,
  Terminal,
  User,
  BookOpen,
  FileText,
  Settings,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  PlusCircle,
  AlertCircle
} from "lucide-react";

export default function AdminConsole() {
  const {
    portfolioData,
    updatePersonalInfo,
    addBlog,
    deleteBlog,
    addNote,
    deleteNote,
    resetToDefaults
  } = usePortfolio();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "blogs" | "notes" | "system">("profile");

  // Notification feedback
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form State: Profile Info
  const [profileForm, setProfileForm] = useState({
    name: portfolioData.personalInfo.name,
    title: portfolioData.personalInfo.title,
    tagline: portfolioData.personalInfo.tagline,
    bio: portfolioData.personalInfo.bio,
    email: portfolioData.personalInfo.email,
    phone: portfolioData.personalInfo.phone,
    location: portfolioData.personalInfo.location,
    domain: portfolioData.personalInfo.domain || "",
    linkedin: portfolioData.personalInfo.socials.linkedin,
    github: portfolioData.personalInfo.socials.github,
    kaggle: portfolioData.personalInfo.socials.kaggle,
  });

  // Form State: New Blog
  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    category: "AI & Machine Learning",
    readTime: "5 min read",
    tags: "",
    content: "",
  });

  // Form State: New Note
  const [noteForm, setNoteForm] = useState({
    title: "",
    description: "",
    category: "Computer Science",
    tags: "",
    content: "",
  });

  const triggerFeedback = (message: string, type: "success" | "error" = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const envPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "b24bs1350";
    if (passcode.toLowerCase() === envPasscode.toLowerCase() || passcode.toLowerCase() === "admin") {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPasscode("");
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo({
      name: profileForm.name,
      title: profileForm.title,
      tagline: profileForm.tagline,
      bio: profileForm.bio,
      email: profileForm.email,
      phone: profileForm.phone,
      location: profileForm.location,
      domain: profileForm.domain,
      socials: {
        linkedin: profileForm.linkedin,
        github: profileForm.github,
        kaggle: profileForm.kaggle,
      }
    });
    triggerFeedback("Kernel Profile variables successfully updated and synced.");
  };

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.excerpt || !blogForm.content) {
      triggerFeedback("All core fields are required to parse blog node.", "error");
      return;
    }
    
    addBlog({
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      category: blogForm.category,
      readTime: blogForm.readTime,
      tags: blogForm.tags.split(",").map(t => t.trim()).filter(Boolean),
      content: blogForm.content,
    });

    setBlogForm({
      title: "",
      excerpt: "",
      category: "AI & Machine Learning",
      readTime: "5 min read",
      tags: "",
      content: "",
    });
    triggerFeedback("New scientific blog entry published successfully.");
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to terminate this blog node?")) {
      deleteBlog(id);
      triggerFeedback("Blog entry node deleted from matrix.");
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteForm.title || !noteForm.description || !noteForm.content) {
      triggerFeedback("All core fields are required to parse note node.", "error");
      return;
    }

    addNote({
      title: noteForm.title,
      description: noteForm.description,
      category: noteForm.category,
      tags: noteForm.tags.split(",").map(t => t.trim()).filter(Boolean),
      content: noteForm.content,
    });

    setNoteForm({
      title: "",
      description: "",
      category: "Computer Science",
      tags: "",
      content: "",
    });
    triggerFeedback("New educational note entry parsed successfully.");
  };

  const handleDeleteNote = (id: string) => {
    if (confirm("Are you sure you want to terminate this note node?")) {
      deleteNote(id);
      triggerFeedback("Note entry node deleted from matrix.");
    }
  };

  const handleResetSystem = () => {
    if (confirm("WARNING: This will completely purge all custom local storage overrides and restore defaults from source resume files. Proceed?")) {
      resetToDefaults();
      // Sync local form states
      const baseline = portfolioData;
      setProfileForm({
        name: baseline.personalInfo.name,
        title: baseline.personalInfo.title,
        tagline: baseline.personalInfo.tagline,
        bio: baseline.personalInfo.bio,
        email: baseline.personalInfo.email,
        phone: baseline.personalInfo.phone,
        location: baseline.personalInfo.location,
        domain: baseline.personalInfo.domain || "",
        linkedin: baseline.personalInfo.socials.linkedin,
        github: baseline.personalInfo.socials.github,
        kaggle: baseline.personalInfo.socials.kaggle,
      });
      triggerFeedback("All systems flushed and restored to pristine codebase defaults.");
    }
  };

  // Secure Gate Login Prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-6 rounded-2xl border border-cyan-500/25 bg-zinc-950/80 backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.1)] text-left font-mono space-y-5"
        >
          <div className="flex items-center space-x-2 text-xs text-zinc-400">
            <Lock className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>AUTHENTICATION PROTOCOL REQUIRED</span>
          </div>

          <h2 className="text-xl font-bold font-sans text-cyan-400 border-b border-zinc-900 pb-2">
            Secure Admin Gateway
          </h2>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Please decrypt the admin access gate using Shravan Kumar's student passphrase or administrative passcode.
          </p>

          <div className="space-y-1.5 text-xs">
            <label className="text-zinc-500 block font-bold">Access Passphrase</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-cyan-500/50">{">"}</span>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg pl-8 pr-3 py-2 text-zinc-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 text-xs font-mono"
                placeholder="Enter key..."
                required
                autoFocus
              />
            </div>
          </div>

          {authError && (
            <div className="text-[10px] text-red-400 border border-red-500/10 bg-red-500/5 px-3 py-2 rounded-lg flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>[ACCESS DENIED]: Key mismatch. Decryption failed.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Authenticate Credentials
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-mono text-xs max-w-6xl mx-auto px-4 py-6">
      {/* Toast Notification */}
      {feedback && (
        <div
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-xl border flex items-center gap-2 animate-bounce shadow-lg ${
            feedback.type === "success"
              ? "bg-zinc-950 border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : "bg-zinc-950 border-red-500/40 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          }`}
        >
          {feedback.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6 text-left">
        <div className="space-y-1">
          <div className="text-cyan-400 text-[10px] uppercase font-bold tracking-widest flex items-center">
            <Terminal className="w-3.5 h-3.5 mr-1" />
            <span>Operational Console v2.0</span>
          </div>
          <h1 className="text-2xl font-bold font-sans text-zinc-950 dark:text-zinc-50">Admin Content Manager</h1>
          <p className="text-[10px] text-zinc-400">Directly sync profiles, scientific blogs, and study notes in real-time.</p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-950/60 p-1 border border-zinc-800 rounded-lg">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "blogs", label: "Blogs", icon: BookOpen },
            { id: "notes", label: "Notes", icon: FileText },
            { id: "system", label: "System", icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer text-[11px] ${
                  activeTab === tab.id
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                    : "text-zinc-400 border border-transparent hover:text-zinc-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="text-left">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Personal Portfolio Information</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-bold block">Display Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 font-bold block">Professional Title</label>
                  <input
                    type="text"
                    required
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-zinc-400 font-bold block">Tagline (Under Name on Hero Page)</label>
                  <input
                    type="text"
                    required
                    value={profileForm.tagline}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-zinc-400 font-bold block">Biography</label>
                  <textarea
                    required
                    rows={4}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono resize-y"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Data */}
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Contact Info & Location</span>
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-zinc-400 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="email"
                        required
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded pl-9 pr-3 py-1.5 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 block">Phone Connection</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        required
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded pl-9 pr-3 py-1.5 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 block">Physical Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        required
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded pl-9 pr-3 py-1.5 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 block">Custom Domain</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        value={profileForm.domain}
                        onChange={(e) => setProfileForm({ ...profileForm, domain: e.target.value })}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded pl-9 pr-3 py-1.5 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                        placeholder="E.g. onedaydelivery.online"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Social Integrations</span>
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-zinc-400 block">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      required
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-1.5 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 block">GitHub Profile URL</label>
                    <input
                      type="url"
                      required
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-1.5 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 block">Kaggle Profile URL</label>
                    <input
                      type="url"
                      required
                      value={profileForm.kaggle}
                      onChange={(e) => setProfileForm({ ...profileForm, kaggle: e.target.value })}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-1.5 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save and Sync Global State</span>
              </button>
            </div>
          </form>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Create Blog Form */}
            <form onSubmit={handleAddBlog} className="lg:col-span-3 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <PlusCircle className="w-4 h-4 text-cyan-400" />
                <span>Publish New Blog Node</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-zinc-400 block">Blog Title</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    placeholder="E.g. Optimization of Cosine Similarities in Recommendation Pipelines"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 block">Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                  >
                    <option>AI & Machine Learning</option>
                    <option>Data Analytics</option>
                    <option>Startup Engineering</option>
                    <option>Operations Research</option>
                    <option>Theory & Mathematics</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 block">Read Time Estimation</label>
                  <input
                    type="text"
                    required
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    placeholder="E.g. 6 min read"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-zinc-400 block">Tags (comma-separated list)</label>
                  <input
                    type="text"
                    required
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    placeholder="e.g. python, cosine-similarity, stats"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-zinc-400 block">Brief Article Excerpt</label>
                  <input
                    type="text"
                    required
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    placeholder="E.g. Dive deep into high-dimensional vector representations..."
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-zinc-400 block">Markdown Content Body</label>
                    <span className="text-[9px] text-zinc-500">Supports standard GitHub Markdown formatting</span>
                  </div>
                  <textarea
                    required
                    rows={12}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono resize-y"
                    placeholder="# Vector Optimizations&#10;In this paper we explore..."
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Parse and Publish Blog Node</span>
                </button>
              </div>
            </form>

            {/* List Existing Blogs */}
            <div className="lg:col-span-2 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm flex flex-col justify-between h-[680px]">
              <div className="space-y-4 overflow-y-auto pr-1">
                <h3 className="text-sm font-bold text-cyan-400 border-b border-zinc-800 pb-3 flex justify-between items-center">
                  <span>Active Scientific Blogs</span>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 border border-cyan-500/20 rounded font-normal font-mono">
                    {portfolioData.blogs.length} Active Nodes
                  </span>
                </h3>

                <div className="space-y-2.5">
                  {portfolioData.blogs.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-lg border border-zinc-800/80 bg-zinc-950/40 hover:border-cyan-500/25 transition-all flex items-start justify-between gap-3 text-left"
                    >
                      <div className="space-y-1">
                        <h4 className="font-bold text-zinc-200 text-xs line-clamp-1">{b.title}</h4>
                        <p className="text-[9px] text-zinc-500 font-mono">
                          {b.category} • {b.date}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1.5">
                          {b.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-1 rounded text-red-400/80 hover:text-red-400 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 cursor-pointer transition-colors"
                        title="Delete blog entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  
                  {portfolioData.blogs.length === 0 && (
                    <div className="p-8 text-center text-zinc-500 font-mono">
                      No scientific blogs found on matrix pipeline.
                    </div>
                  )}
                </div>
              </div>
              <div className="text-[9px] text-zinc-500 font-mono border-t border-zinc-800 pt-3 select-none">
                Node updates will propagate instantly.
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Create Note Form */}
            <form onSubmit={handleAddNote} className="lg:col-span-3 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <PlusCircle className="w-4 h-4 text-cyan-400" />
                <span>Parse New Study Note</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-zinc-400 block">Note Title</label>
                  <input
                    type="text"
                    required
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    placeholder="E.g. Statistical Inference & Parameter Optimizations"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-zinc-400 block">Brief Note Description</label>
                  <input
                    type="text"
                    required
                    value={noteForm.description}
                    onChange={(e) => setNoteForm({ ...noteForm, description: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    placeholder="E.g. Concise core formulas and proofs for Probability distributions."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 block">Category</label>
                  <select
                    value={noteForm.category}
                    onChange={(e) => setNoteForm({ ...noteForm, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                  >
                    <option>Computer Science</option>
                    <option>Machine Learning</option>
                    <option>Mathematics</option>
                    <option>Economics & Finance</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 block">Tags (comma-separated list)</label>
                  <input
                    type="text"
                    required
                    value={noteForm.tags}
                    onChange={(e) => setNoteForm({ ...noteForm, tags: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono"
                    placeholder="e.g. statistics, inference, proof"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-zinc-400 block">Markdown Content Body</label>
                    <span className="text-[9px] text-zinc-500">Formulas rendering supports markdown list/structures</span>
                  </div>
                  <textarea
                    required
                    rows={12}
                    value={noteForm.content}
                    onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2 text-zinc-200 outline-none focus:border-cyan-500 text-xs font-mono resize-y"
                    placeholder="# Probability Foundations&#10;## Bayes Theorem&#10;P(A|B) = ..."
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Parse and Compile Note Node</span>
                </button>
              </div>
            </form>

            {/* List Existing Notes */}
            <div className="lg:col-span-2 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm flex flex-col justify-between h-[680px]">
              <div className="space-y-4 overflow-y-auto pr-1">
                <h3 className="text-sm font-bold text-cyan-400 border-b border-zinc-800 pb-3 flex justify-between items-center">
                  <span>Active Study Notes</span>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 border border-cyan-500/20 rounded font-normal font-mono">
                    {portfolioData.notes.length} Active Nodes
                  </span>
                </h3>

                <div className="space-y-2.5">
                  {portfolioData.notes.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 rounded-lg border border-zinc-800/80 bg-zinc-950/40 hover:border-cyan-500/25 transition-all flex items-start justify-between gap-3 text-left"
                    >
                      <div className="space-y-1">
                        <h4 className="font-bold text-zinc-200 text-xs line-clamp-1">{n.title}</h4>
                        <p className="text-[9px] text-zinc-500 font-mono">
                          {n.category} • {n.date}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1.5">
                          {n.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteNote(n.id)}
                        className="p-1 rounded text-red-400/80 hover:text-red-400 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 cursor-pointer transition-colors"
                        title="Delete note entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {portfolioData.notes.length === 0 && (
                    <div className="p-8 text-center text-zinc-500 font-mono">
                      No study notes found on matrix pipeline.
                    </div>
                  )}
                </div>
              </div>
              <div className="text-[9px] text-zinc-500 font-mono border-t border-zinc-800 pt-3 select-none">
                Node updates will propagate instantly.
              </div>
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === "system" && (
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Settings className="w-4 h-4 text-cyan-400" />
              <span>Core Kernel Administration settings</span>
            </h3>

            <div className="space-y-4 max-w-2xl">
              <p className="text-zinc-400 leading-relaxed text-xs">
                To revert all dynamically compiled database state overrides, flush the local storage cached memory cells. This resets the entire profile, blogs, and study notes back to default static state structures extracted from Shravan Kumar's pristine resume file content.
              </p>

              <div className="border border-red-500/20 bg-red-950/10 p-4 rounded-xl space-y-3">
                <h4 className="font-bold text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>DANGER ZONE</span>
                </h4>
                <p className="text-[10px] text-zinc-400">
                  This action is irreversible. All updates, newly published blogs, and customized personal details saved to this browser will be destroyed instantly.
                </p>
                <div className="pt-1.5">
                  <button
                    onClick={handleResetSystem}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-zinc-100 font-bold text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Portfolio State to Pristine Codebase Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
