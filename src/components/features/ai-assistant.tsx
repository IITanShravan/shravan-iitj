"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, Bot, User, CornerDownLeft, Sparkles } from "lucide-react";
import { usePortfolio } from "@/components/layout/portfolio-provider";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export default function AiAssistant() {
  const { portfolioData } = usePortfolio();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: `Initializing ${portfolioData.personalInfo.name.split(" ")[0] || "Shravan"}-Bot Core v2.0... Ready! Ask me anything about my academic background, machine learning projects, tech stack, or availability status.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    `What is ${portfolioData.personalInfo.name.split(" ")[0]}'s CGPA?`,
    "Tell me about the Movie Recommendation system.",
    "What is the tech stack of One Day Delivery?",
    "Is he open to internships?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();
    const name = portfolioData.personalInfo.name;
    const firstName = name.split(" ")[0];

    if (q.includes("cgpa") || q.includes("education") || q.includes("iit") || q.includes("grade")) {
      const edu = portfolioData.education[0] || { degree: "BS in Applied AI & Data Science", institution: "IIT Jodhpur", gpa: "Sem 1: 7.5 CGPA | Sem 2: 8.0 CGPA" };
      return `${name} is pursuing a ${edu.degree} at ${edu.institution}. Current grade status: ${edu.gpa}. He is specializing in probability, statistical inference, and machine learning models.`;
    }
    
    if (q.includes("movie") || q.includes("recommendation") || q.includes("similarity")) {
      const movieProj = portfolioData.projects.find(p => p.id === "movie-rec") || portfolioData.projects[0];
      if (movieProj) {
        return `He built the ${movieProj.title} using ${movieProj.tech.join(", ")}. Description: ${movieProj.description}`;
      }
      return `He built the Movie Recommendation System using Python, Pandas, NumPy, Scikit-Learn, and Streamlit. It computes cosine similarities over high-dimensional TF-IDF vectors representing movie genres, cast, and plot summaries to provide suggestions in real-time.`;
    }

    if (q.includes("one day delivery") || q.includes("onedaydelivery") || q.includes("routing") || q.includes("startup")) {
      const startupProj = portfolioData.projects.find(p => p.id === "odd") || portfolioData.projects.find(p => p.category === "startup");
      if (startupProj) {
        return `${name} is the Startup Founder & Platform Engineer of One Day Delivery (${portfolioData.personalInfo.domain || "onedaydelivery.online"}). He engineered: ${startupProj.description}`;
      }
      return `Shravan is the Startup Founder & Platform Engineer of One Day Delivery (onedaydelivery.online). He engineered hyper-local supply-chain routing tools solving the Capacitated Vehicle Routing Problem (CVRP) in Python, which improved delivery distance efficiency by 25%.`;
    }

    if (q.includes("skills") || q.includes("languages") || q.includes("tech") || q.includes("python") || q.includes("sql")) {
      const allSkillNames = portfolioData.skills.map(g => `• ${g.category}: ${g.skills.map(s => s.name).join(", ")}`).join("\n");
      return `${name}'s core technical stack includes:\n${allSkillNames}`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("internship")) {
      return `${name} is currently open to Machine Learning & Data Science Internships and Research Collaborations! 🟢 You can email him at ${portfolioData.personalInfo.email}, call him at ${portfolioData.personalInfo.phone}, or submit the form on the Contact page.`;
    }

    if (q.includes("kaggle")) {
      const username = portfolioData.personalInfo.socials.kaggle.split("/").pop() || "iitanshravan";
      return `${name} is an active Kaggle Contributor (Kaggle: ${username}). He has created highly rated notebooks in data science, including Space Titanic predictive classifiers.`;
    }

    if (q.includes("github")) {
      return `You can explore all his projects on GitHub (${portfolioData.personalInfo.socials.github}). His repositories contain complete structured pipelines, Streamlit frontend code, and hyper-optimized python notebooks.`;
    }

    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return `Hello there! I am ${firstName}'s AI avatar. How can I assist you in exploring his portfolios and credentials today?`;
    }

    return `Interesting question! ${name}'s Applied AI degree at IIT Jodhpur focuses extensively on operations research, statistical modeling, and machine learning pipelines. He'd love to chat about this. You can send him a direct query at ${portfolioData.personalInfo.email}!`;
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        sender: "bot",
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl bg-zinc-950/90 border border-cyan-500/20 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.05)] text-zinc-100 flex flex-col h-[500px]">
      {/* Terminal Header */}
      <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] font-mono text-zinc-400 pl-2 flex items-center">
            <Terminal className="w-3.5 h-3.5 mr-1 text-cyan-400" />
            guest@shravan-ai-assistant:~$
          </span>
        </div>
        <div className="flex items-center space-x-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 border border-cyan-500/20 rounded">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
          <span>PROMPT MODE</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs leading-relaxed">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 border ${
                msg.sender === "user"
                  ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                  : "bg-cyan-950/20 border-cyan-500/10 text-zinc-200"
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <div className="text-[9px] text-zinc-500 text-right mt-1.5">
                {msg.timestamp}
              </div>
            </div>
            {msg.sender === "user" && (
              <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-zinc-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="bg-cyan-950/10 border border-cyan-500/10 rounded-xl px-3.5 py-2.5 text-zinc-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      <div className="px-4 py-2 border-t border-zinc-900 bg-zinc-950/40 flex flex-wrap gap-1.5">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            className="text-[10px] font-mono border border-zinc-800 hover:border-cyan-500/40 rounded-full px-2.5 py-1 bg-zinc-900/60 hover:bg-cyan-500/5 text-zinc-400 hover:text-cyan-300 transition-all text-left"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Inputs area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 border-t border-zinc-900 bg-zinc-950 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/10 outline-none rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-500"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
