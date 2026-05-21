# Shravan Kumar's Holographic Portfolio Website

A production-grade, highly interactive, and visually stunning personal portfolio website built with **Next.js (latest App Router)**, **TypeScript**, and **Tailwind CSS**. Custom-engineered with advanced canvas particle grids, terminal integrations, and local cognitive chatbot units.

---

## ⚡ Tech Stack & Libraries

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (with neon custom variables)
- **Animations**: HTML5 Canvas mathematical renderers, Tailwind transitions, Framer Motion
- **Icons**: Lucide React
- **Chatbot System**: Built-in state-of-the-art mock conversational agent trained on Shravan Kumar's metrics.

---

## 🚀 Key Features

1. **Interactive Particle Canvas Network**: Custom-built, highly-optimized responsive particle network rendering at 60fps on desktop and mobile, responding dynamically to hover.
2. **Interactive AI Avatar Assistant**: Ask chatbot queries like *"What is Shravan's CGPA?"* or *"Tell me about the Movie Recommendation pipeline"* to retrieve real-time responses.
3. **Cmd+K Command Palette**: Global quick command search panel. Press `Cmd+K` or `Ctrl+K` to search pages, social channels, or toggle dark/light mode instantly.
4. **Holographic Coordinate Locator**: Interactive coordinate system map visualizing IIT Jodhpur coordinates.
5. **Cheatsheet & Notes Library**: Supports categorized LaTeX formulas and markdown note files with direct download triggers.
6. **Protected Admin Analytics Dashboard**: Biometric-styled keyhole asking for IIT Jodhpur credentials (`b24bs1350` or `admin`) to display traffic metrics and mock content creation forms.

---

## 📁 Directory Architecture

```text
src/
├── app/                    # Next.js App Router Pages
│   ├── layout.tsx          # Root container wrapping Header, Footer, and Backgrounds
│   ├── page.tsx            # Home Page (Typing Terminal Hero, AI bot, Testimonials)
│   ├── about/              # About Journey (Stats, Timelines, Interests, Academics)
│   ├── projects/           # Projects Node (GitHub/Kaggle items & detail overlays)
│   ├── notes/              # Notes Library (Searchable cheatsheets & document readers)
│   ├── blog/               # Dynamic Blogs (Progress scrollbar, code syntaxes)
│   ├── resume/             # Curriculum Vitae timeline & download direct links
│   ├── contact/            # Animated Contact logs & coordinate spinner canvas
│   └── dashboard/          # Secure Admin Analytics & managers
├── components/             # Reusable UI Systems
│   ├── canvas/             # Particle connections canvas background
│   └── features/           # AI bot, Contribution Heatmap, Skills Visualizer
├── data/                   # Dynamic CV and profile content objects
└── utils/                  # System helpers
```

---

## 🛠️ Local Development & Setup

### 1. Install Dependencies

Inside the root directory `/Users/shravan/.gemini/antigravity/scratch/shravan-portfolio`, run:

```bash
npm install
```

### 2. Launch Local Dev Server

Launch the Next.js development server:

```bash
npm run dev
```

The app will be available on [http://localhost:3000](http://localhost:3000).

### 3. Build & Compile for Production

Validate build compilation errors:

```bash
npm run build
```

---

## 🌩️ Vercel Deployment Instructions

Deploying this portfolio to **Vercel** is extremely simple:

1. **GitHub Setup**: Initialize git, add remote origin, and push your code:
   ```bash
   git init
   git add .
   git commit -m "initial commit: holographic portfolio"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Vercel Deployment**:
   - Go to [Vercel](https://vercel.com) and sign in.
   - Click **Add New...** -> **Project**.
   - Import your GitHub repository.
   - Vercel automatically detects **Next.js** settings. Leave default configurations.
   - Click **Deploy**. Your live production website is up in less than 2 minutes!
