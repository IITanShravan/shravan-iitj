"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  DEFAULT_PORTFOLIO_DATA,
  Project,
  Experience,
  Education,
  SkillGroup,
  Blog,
  Note,
  Certification,
  Achievement,
} from "@/data/portfolio-data";

// Structure of the full portfolio data
export interface PortfolioDataStructure {
  personalInfo: typeof DEFAULT_PORTFOLIO_DATA.personalInfo;
  education: Education[];
  experience: Experience[];
  skills: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  interests: string[];
  blogs: Blog[];
  notes: Note[];
}

interface PortfolioContextType {
  portfolioData: PortfolioDataStructure;
  loading: boolean;
  updatePersonalInfo: (info: Partial<typeof DEFAULT_PORTFOLIO_DATA.personalInfo>) => void;
  addBlog: (blog: Omit<Blog, "id" | "date">) => void;
  deleteBlog: (id: string) => void;
  addNote: (note: Omit<Note, "id" | "date">) => void;
  deleteNote: (id: string) => void;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "shravan_portfolio_data";

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioDataStructure>(DEFAULT_PORTFOLIO_DATA);
  const [loading, setLoading] = useState(true);

  // Load and merge data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          
          // Merge logic to ensure baseline fields exist in case structure changes
          const mergedData: PortfolioDataStructure = {
            personalInfo: { ...DEFAULT_PORTFOLIO_DATA.personalInfo, ...(parsed.personalInfo || {}) },
            education: parsed.education || DEFAULT_PORTFOLIO_DATA.education,
            experience: parsed.experience || DEFAULT_PORTFOLIO_DATA.experience,
            skills: parsed.skills || DEFAULT_PORTFOLIO_DATA.skills,
            projects: parsed.projects || DEFAULT_PORTFOLIO_DATA.projects,
            certifications: parsed.certifications || DEFAULT_PORTFOLIO_DATA.certifications,
            achievements: parsed.achievements || DEFAULT_PORTFOLIO_DATA.achievements,
            interests: parsed.interests || DEFAULT_PORTFOLIO_DATA.interests,
            blogs: parsed.blogs || DEFAULT_PORTFOLIO_DATA.blogs,
            notes: parsed.notes || DEFAULT_PORTFOLIO_DATA.notes,
          };
          
          setPortfolioData(mergedData);
        } else {
          // Pre-populate localStorage with defaults if empty
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PORTFOLIO_DATA));
        }
      } catch (error) {
        console.error("Error loading portfolio data from localStorage:", error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  // Helper to save state back to localStorage
  const saveToLocalStorage = (newData: PortfolioDataStructure) => {
    setPortfolioData(newData);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
      } catch (error) {
        console.error("Error saving portfolio data to localStorage:", error);
      }
    }
  };

  // Update profile fields
  const updatePersonalInfo = (info: Partial<typeof DEFAULT_PORTFOLIO_DATA.personalInfo>) => {
    const updated = {
      ...portfolioData,
      personalInfo: {
        ...portfolioData.personalInfo,
        ...info,
        socials: {
          ...portfolioData.personalInfo.socials,
          ...(info.socials || {}),
        },
      },
    };
    saveToLocalStorage(updated);
  };

  // Add blog entry
  const addBlog = (blog: Omit<Blog, "id" | "date">) => {
    const newBlogItem: Blog = {
      ...blog,
      id: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const updated = {
      ...portfolioData,
      blogs: [newBlogItem, ...portfolioData.blogs],
    };
    saveToLocalStorage(updated);
  };

  // Delete blog entry
  const deleteBlog = (id: string) => {
    const updated = {
      ...portfolioData,
      blogs: portfolioData.blogs.filter((b) => b.id !== id),
    };
    saveToLocalStorage(updated);
  };

  // Add notes entry
  const addNote = (note: Omit<Note, "id" | "date">) => {
    const newNoteItem: Note = {
      ...note,
      id: note.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const updated = {
      ...portfolioData,
      notes: [newNoteItem, ...portfolioData.notes],
    };
    saveToLocalStorage(updated);
  };

  // Delete notes entry
  const deleteNote = (id: string) => {
    const updated = {
      ...portfolioData,
      notes: portfolioData.notes.filter((n) => n.id !== id),
    };
    saveToLocalStorage(updated);
  };

  // Reset to static code defaults
  const resetToDefaults = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    }
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        loading,
        updatePersonalInfo,
        addBlog,
        deleteBlog,
        addNote,
        deleteNote,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
