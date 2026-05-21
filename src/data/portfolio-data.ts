export interface Project {
  id: string;
  title: string;
  description: string;
  details: string[];
  tech: string[];
  category: 'ml-ds' | 'web-dev' | 'kaggle' | 'startup';
  github?: string;
  demo?: string;
  kaggle?: string;
  featured: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  details: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  pdfUrl?: string;
  content: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
  badge?: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  icon: string;
}

export const DEFAULT_PORTFOLIO_DATA = {
  personalInfo: {
    name: "Shravan Kumar",
    title: "Applied AI & Data Science Student & Builder",
    tagline: "Enthusiastic developer and research-oriented learner crafting smart algorithms and high-fidelity user experiences.",
    bio: "Enthusiastic undergraduate student pursuing Applied AI & Data Science at IIT Jodhpur with a strong academic record. Skilled in Python and SQL with hands-on knowledge in data analytics and machine learning. Passionate about applying technical skills to real-world projects through innovative solutions and continuous learning. Active developer, note creator, startup builder, and open-source enthusiast.",
    email: "b24bs1350@iitj.ac.in",
    phone: "+91 7631578384",
    location: "IIT Jodhpur, Rajasthan, India",
    domain: "shravan.onedaydelivery.online",
    socials: {
      linkedin: "https://www.linkedin.com/in/iitanshravan/",
      github: "https://github.com/IITanShravan",
      kaggle: "https://www.kaggle.com/iitanshravan",
    },
    avatarPlaceholder: "/profile.png"
  },
  
  education: [
    {
      degree: "Bachelor of Science in Applied AI & Data Science",
      institution: "Indian Institute of Technology (IIT) Jodhpur",
      period: "2024 – 2028",
      gpa: "Sem 1: 7.5 CGPA | Sem 2: 8.0 CGPA",
      details: [
        "Specializing in Machine Learning, Statistical Inference, Deep Learning, and Advanced Data Analytics.",
        "Rigorous coursework in Data Structures & Algorithms, Matrix Computations, Probability & Statistics, and Databases."
      ]
    }
  ] as Education[],

  experience: [
    {
      role: "Data Science Student & Core Developer",
      company: "Indian Institute of Technology Jodhpur",
      period: "2024 – Present",
      details: [
        "Developing proficiency in Python programming with focus on data manipulation, numerical analysis, and ML pipelines.",
        "Applying machine learning concepts and statistical algorithms to solve complex, real-world data science challenges.",
        "Gaining hands-on experience with scientific visualization tools, exploratory data analysis (EDA), and data wrangling.",
        "Building modern web interfaces using HTML, CSS, React, and WordPress for interactive tool and project deployments."
      ]
    },
    {
      role: "Startup Founder & Platform Engineer",
      company: "One Day Delivery (onedaydelivery.online)",
      period: "2025 – Present",
      details: [
        "Pioneering localized high-speed logistics and hyper-local supply chain management software integrations.",
        "Architecting developer interfaces, tracking mechanisms, and optimizing delivery routing algorithms in Python.",
        "Managing system operations, cloud hosting, and product lifecycle iterations from initial idea to deployment."
      ]
    }
  ] as Experience[],

  skills: [
    {
      category: "Programming & Core",
      skills: [
        { name: "Python", level: 90 },
        { name: "SQL", level: 85 },
        { name: "C++", level: 70 },
        { name: "HTML / CSS", level: 80 },
        { name: "Bash / Linux", level: 75 }
      ]
    },
    {
      category: "Data Science & Analytics",
      skills: [
        { name: "Pandas", level: 92 },
        { name: "NumPy", level: 90 },
        { name: "Scikit-Learn", level: 85 },
        { name: "EDA (Matplotlib/Seaborn)", level: 88 },
        { name: "Statistics & Probability", level: 80 }
      ]
    },
    {
      category: "Databases & Web Tech",
      skills: [
        { name: "MySQL", level: 82 },
        { name: "Streamlit", level: 90 },
        { name: "Next.js & React", level: 75 },
        { name: "WordPress", level: 85 },
        { name: "Git & GitHub", level: 88 }
      ]
    }
  ] as SkillGroup[],

  projects: [
    {
      id: "movie-recommendation",
      title: "Movie Recommendation System",
      description: "An interactive content-based movie recommendation system that suggests films based on similarity in genres, cast, and plot descriptions.",
      details: [
        "Developed a content-based recommendation algorithm utilizing cosine similarity calculations on high-dimensional text embeddings.",
        "Utilized Python scientific stack including Pandas and NumPy for complex data preprocessing, cleanup, and feature vectorization.",
        "Leveraged Scikit-Learn libraries (TfidfVectorizer & Cosine Similarity) to construct the recommendation model.",
        "Designed and deployed a highly interactive, responsive, and user-friendly frontend using Streamlit for real-time suggestions."
      ],
      tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Streamlit", "Natural Language Processing"],
      category: "ml-ds",
      github: "https://github.com/IITanShravan/",
      demo: "https://github.com/IITanShravan/movie_recommender_system",
      featured: true
    },
    {
      id: "one-day-delivery-routing",
      title: "One Day Delivery Route Optimizer",
      description: "A machine learning and operations research-driven engine to optimize multi-stop hyper-local delivery logistics for One Day Delivery.",
      details: [
        "Built a delivery route scheduling tool solving the Capacitated Vehicle Routing Problem (CVRP).",
        "Used Python, NetworkX, and genetic algorithms to optimize route distance by 25% under tight time-window constraints.",
        "Integrated geospatial visualizations with Folium/Leaflet inside a Streamlit web portal."
      ],
      tech: ["Python", "Algorithms", "NetworkX", "Folium", "Streamlit", "GeoPandas"],
      category: "startup",
      github: "https://github.com/IITanShravan/",
      demo: "http://shravan.onedaydelivery.online",
      featured: true
    },
    {
      id: "kaggle-space-titanic",
      title: "Kaggle Space Titanic Predictor",
      description: "Advanced exploratory analysis and machine learning classification system to predict passenger transport status in the Space Titanic challenge.",
      details: [
        "Performed intensive Exploratory Data Analysis (EDA) investigating feature distributions, correlations, and missing value interpolations.",
        "Trained multiple classifiers (Random Forests, XGBoost, and LightGBM) optimizing hyperparameters using Optuna.",
        "Achieved top-tier ranking in prediction accuracy utilizing custom feature engineering pipelines."
      ],
      tech: ["Python", "Pandas", "XGBoost", "LightGBM", "Optuna", "Kaggle API"],
      category: "kaggle",
      kaggle: "https://www.kaggle.com/iitanshravan/code",
      github: "https://github.com/IITanShravan/",
      featured: false
    },
    {
      id: "portfolio-website",
      title: "Interactive Holographic Developer Portfolio",
      description: "A state-of-the-art developer portfolio demonstrating AI capabilities, interactive notes libraries, and clean dashboard utilities.",
      details: [
        "Designed with absolute glassmorphic visuals, deep obsidian layout, custom canvas backgrounds, and light/dark configurations.",
        "Integrated an interactive local AI assistant chatbot simulation answering queries regarding resume metrics.",
        "Features fully searchable notes systems, MDX rendering, interactive timelines, and administrative analytics panels."
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas HTML5"],
      category: "web-dev",
      github: "https://github.com/IITanShravan/",
      demo: "https://github.com/IITanShravan/",
      featured: true
    }
  ] as Project[],

  certifications: [
    {
      name: "Python for Data Science and Machine Learning",
      issuer: "IIT Jodhpur CoE",
      date: "2024",
      badge: "🎓 Applied Professional"
    },
    {
      name: "SQL Databases and Analytics Core",
      issuer: "Kaggle Certifications",
      date: "2025",
      badge: "📊 Data Analyst Expert"
    },
    {
      name: "Machine Learning Foundations",
      issuer: "Stanford Online",
      date: "2025",
      badge: "🤖 ML Practitioner"
    }
  ] as Certification[],

  achievements: [
    {
      title: "Top Kaggle Contributor",
      description: "Highly rated notebook creations and public dataset publications in machine learning fields.",
      date: "2025",
      icon: "🏆"
    },
    {
      title: "Startup Launchpad Award",
      description: "First prize in IIT Jodhpur technical entrepreneurship cell for onedaydelivery.online routing engine concept.",
      date: "2025",
      icon: "🚀"
    },
    {
      title: "Academic Excellence",
      description: "Maintained a high progression path increasing Sem 1 CGPA from 7.5 to Sem 2 CGPA of 8.0.",
      date: "2025",
      icon: "📈"
    }
  ] as Achievement[],

  interests: [
    "Machine Learning & Artificial General Intelligence",
    "Quantitative Finance & Algorithmic Trading",
    "Open Source Development & Developer Relations",
    "Technical Writing & Scientific Notes Blogging",
    "Hyper-Local Tech Startups & Logistics Optimization",
    "Astronomy & Space Research Science"
  ],

  blogs: [
    {
      id: "building-movie-recommendation",
      title: "Under the Hood: Building a Movie Recommendation System from Scratch",
      excerpt: "An in-depth mathematical and practical breakdown of building a content-based recommendation model using Scikit-Learn and Streamlit.",
      date: "May 15, 2026",
      readTime: "6 min read",
      tags: ["Python", "Scikit-Learn", "Streamlit", "Machine Learning"],
      category: "Machine Learning",
      content: `## The Core Mechanics of Recommendation Systems

In today's digital landscape, recommendation systems govern how we discover content. There are primarily two types: **Collaborative Filtering** (relying on peer reviews) and **Content-Based Filtering** (analyzing item characteristics). In this article, we delve deep into the latter, tracing the architecture of my **Movie Recommendation System**.

### 1. The Vector Representation of Movies

To compare movies, we must convert textual descriptions (plots, genres, directors, stars) into numerical vectors. This is achieved using **TF-IDF (Term Frequency-Inverse Document Frequency)** vectorization or simpler token counting.

$$\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\times \\text{IDF}(t, D)$$

For my implementation, I utilized Scikit-Learn's \`TfidfVectorizer\` to create a massive sparse matrix of movie tags.

\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer

# Combine genres, plot overview, and key cast members into a single soup of words
movies_df['soup'] = movies_df['genres'] + " " + movies_df['overview'] + " " + movies_df['cast']

vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(movies_df['soup'])
\`\`\`

### 2. Measuring Similarity

Once represented as vectors, the "distance" between movies corresponds to their conceptual divergence. We calculate similarity using **Cosine Similarity**, which computes the cosine of the angle between two multi-dimensional vectors:

$$\\text{Cosine Similarity}(\\mathbf{A}, \\mathbf{B}) = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}$$

\`\`\`python
from sklearn.metrics.pairwise import cosine_similarity

# Compute the similarity matrix
similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)
\`\`\`

### 3. Creating the Streamlit Web Application

An elegant ML model is useless without a great frontend. I chose **Streamlit** to build a highly responsive interactive interface that serves movie posters and recommendations dynamically with zero lag.

You can inspect the entire codebase and test the live application on my GitHub repository! Enjoy building your own and tweaking the similarity thresholds!`
    },
    {
      id: "why-applied-ai-important",
      title: "Why Applied AI & Data Science is the Future of Tech Curriculums",
      excerpt: "Reflections from my first year as an Applied AI student at IIT Jodhpur, highlighting the intersection of mathematical theory and hands-on production engineering.",
      date: "April 10, 2026",
      readTime: "4 min read",
      tags: ["Applied AI", "IIT Jodhpur", "Data Science", "Higher Education"],
      category: "Education",
      content: `## A Shifts in Technical Pedagogy

Computer Science is transitioning. Traditional software engineering is now complemented by probabilistic computing and machine learning. As a student in the first batch of **Applied AI & Data Science** at **IIT Jodhpur**, my journey has been a testament to this profound shift.

### The Curriculum Philosophy

The curriculum at IIT Jodhpur focuses heavily on structural math and experimental projects:
- **Linear Algebra & Vector Spaces**: Crucial for understanding how neural networks transform coordinate zones.
- **Statistical Modeling**: Transitioning from guesswork to rigorous hypothesis formulation.
- **Production Engineering**: Moving models from Jupyter Notebooks into live Docker nodes or Streamlit web apps.

### Theory vs. Application

Many ML developers fail because they don't understand the underlying mathematics, while many mathematicians fail because they cannot write clean, production-grade Python code.

Our focus is explicitly on the **overlap**:
1. *Write the loss functions by hand.*
2. *Compute the gradients on paper.*
3. *Implement them using optimized, vectorized Pandas and NumPy arrays.*
4. *Deploy to the cloud.*

This balanced philosophy is what fuels my technical experiments, such as building supply-chain algorithms for **One Day Delivery**.`
    }
  ] as Blog[],

  notes: [
    {
      id: "statistics-inference",
      title: "Probability and Statistical Inference - Exam Notes",
      description: "Complete handwritten and formatted LaTeX notes on Random Variables, MLE (Maximum Likelihood Estimation), Hypothesis Testing, and Regression.",
      date: "May 2, 2026",
      category: "Statistics",
      tags: ["Math", "Statistics", "Inference", "Exams"],
      content: `# Probability and Statistical Inference

Deep formulas and derivations for my Semester 2 examinations. Includes:

### 1. Probability Distributions
- **Normal Distribution**: $f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}$
- **Poisson Distribution**: $P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$

### 2. Parameter Estimation
#### Maximum Likelihood Estimation (MLE)
We search for parameters $\\theta$ that maximize the likelihood function $L(\\theta)$.
For a normal distribution sample, the MLE for the mean $\\mu$ is the sample mean:
$$\\hat{\\mu}_{MLE} = \\frac{1}{n} \\sum_{i=1}^n X_i$$

### 3. Hypothesis Testing
- Null Hypothesis ($H_0$) vs Alternative Hypothesis ($H_1$).
- Z-test, T-test, and Chi-Square ($x^2$) Contingency testing metrics.
- P-Value boundary rules and critical thresholds.`
    },
    {
      id: "machine-learning-foundations",
      title: "Supervised Learning Models: A Mathematical Cheat Sheet",
      description: "Comprehensive notes covering the structural mathematics of Support Vector Machines, Decision Trees, and Logistic Regression optimizations.",
      date: "March 20, 2026",
      category: "Machine Learning",
      tags: ["ML", "Math", "Supervised Learning", "LaTeX"],
      content: `# Mathematical Foundations of ML Models

Detailed mathematical analysis of classical machine learning structures.

### 1. Logistic Regression
Instead of outputting direct values, we model the probability of class occurrence using the Sigmoid (Logistic) function:
$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$
Where the decision boundaries are formulated as:
$$z = \\theta^T x$$

### 2. Support Vector Machines (SVM)
The goal is to maximize the margin between classes, which reduces to the following optimization problem:
$$\\min_{\\mathbf{w}, b} \\frac{1}{2} \\|\\mathbf{w}\\|^2 \\quad \\text{s.t.} \\quad y_i(\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1$$
We solve this using Lagrange Multipliers to find support vectors representing classification margins.`
    }
  ] as Note[]
};
