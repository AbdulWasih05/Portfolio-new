export interface ProjectStats {
    label: string;
    value: string;
}

export interface Project {
    title: string;
    description: string;
    tech: string[];
    imageWebP?: string;
    imageFallback?: string;
    image?: string;
    link: string;
    githubUrl?: string;
    websiteUrl?: string;
    year?: string;
    goal: string;
    features: string[];
    challenge: string;
    approach: string;
    impact: ProjectStats[];
}

// Shared slug helper — single source of truth for project URLs (/projects/:slug).
// Imported by Projects.tsx, ProjectsPage.tsx and ProjectDetailPage.tsx so card
// links and route lookups can never drift apart.
export const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

export const projects: Project[] = [
    {
        title: "VidyutMitra",
        description:
            "WhatsApp-first AI energy advisor for MESCOM consumers in coastal Karnataka. Send one photo of your electricity bill and get a personalized analysis, a Kannada voice note, and an infographic back in seconds, voice-first, zero literacy required.",
        tech: [
            "Flask",
            "Gemini 2.5 Flash",
            "Groq Llama 3.3 70B",
            "Sarvam AI (Kannada TTS)",
            "Supabase",
            "Twilio WhatsApp",
            "Next.js"
        ],
        image: "/vidyutmitra-thumbnail.png",
        imageWebP: "/vidyutmitra-thumbnail.webp",
        link: "https://vidyut-mitra.wasih.tech/",
        githubUrl: "https://github.com/AbdulWasih05/vidyut-mitra",
        websiteUrl: "https://vidyut-mitra.wasih.tech/",
        year: "2026",
        goal: "Help MESCOM households uncover the money they quietly lose to bill traps (Fixed Charge over-provisioning, Gruha Jyothi cliffs, and missed solar subsidies) through a zero-typing, zero-literacy WhatsApp advisor in their own language.",
        features: [
            "One photo of a bill returns a full analysis in 10–15s: a text report, a Kannada voice note, and a printable infographic, no typing, no app install",
            "Triple deterministic analysis per bill: Tariff Engine (Fixed Charge Trap), Subsidy Navigator (PM Surya Ghar & Gruha Jyothi), and a Solar ROI calculator",
            "Voice-first Kannada output via Sarvam's native TTS, making the analysis accessible regardless of literacy",
            "Hallucination-guarded AI: every number in an AI-framed reply is regex-validated verbatim against a deterministic fact-pack before it sends",
            "DPDPA-compliant by design: bill image bytes are never written to disk and the schema has no image column",
            "Two-turn follow-up drilldowns (SOLAR / FIXED / SUBSIDY / CLIFF) served from a 30-minute cached analysis"
        ],
        challenge: "22.6 lakh MESCOM households pay an electricity bill every month with no idea they are losing money to traps the bill never explains. The KERC tariff order runs 47 pages, bills mix Kannada and English, and many consumers cannot read either fluently.",
        approach: "A WhatsApp-first pipeline: Gemini 2.5 Flash extracts every bill field, three deterministic Python modules run the math in parallel, and Groq Llama 3.3 70B adds only two personalized lines, validated verbatim against the analysis. Sarvam synthesizes a Kannada voice note and Twilio dispatches text, voice, and infographic in ~12 seconds.",
        impact: [
            { label: "Saved / Household", value: "₹1,740/yr" },
            { label: "At MESCOM Scale", value: "₹39 Cr/yr" },
            { label: "Cost / Bill", value: "~₹1.7" }
        ]
    },
    {
        title: "To the Moon",
        description:
            "A local-first placement-prep app I built for myself and fellow students: one calm home to run mock interviews, DSA revision, study goals, resume checks, and applications instead of scattered notes, tabs, and half-filled spreadsheets. Self-hosted for now.",
        tech: [
            "Next.js",
            "React",
            "TypeScript",
            "Express",
            "Prisma",
            "SQLite",
            "Google Gemini",
            "Zustand",
            "Tailwind CSS",
            "Docker"
        ],
        image: "/to-the-moon-thumbnail.png",
        imageWebP: "/to-the-moon-thumbnail.webp",
        link: "",
        githubUrl: "https://github.com/AbdulWasih05",
        year: "2026",
        goal: "Give myself and other students a single organized system for placement prep, every module a student actually needs, so prep lives in one place instead of messy notes, browser tabs, and forgotten deadlines.",
        features: [
            "AI mock interviews on a Google Gemini pipeline, answered by text or voice (Web Speech API), with job-description and company-specific question generation plus batch answer evaluation, scoring, and feedback",
            "DSA tracker with built-in spaced repetition (1/3/7/14/30/60-day intervals) that resurfaces problems for review before you forget them",
            "Resume module that parses PDF/DOCX uploads and runs a Gemini skill-gap analysis against target roles",
            "Application, company, and opportunity trackers (internships, hackathons, OSS programs, fellowships) tied to a calendar and deadlines so nothing slips",
            "Weekly study goals and session tracking, custom question banks with model answers, and a priority task board",
            "Analytics dashboard with progress over time, performance by question type, weak-area detection, and CSV export, all on a local-first SQLite store"
        ],
        challenge: "Placement prep is scattered across mock-interview sites, DSA sheets, resume docs, application spreadsheets, and random notes that never talk to each other, so it is easy to lose track of what to revise and what is due.",
        approach: "Built a local-first Next.js 15 and Express/Prisma app over SQLite that unifies every prep workflow into one dashboard, with a rate-limited Gemini service (Bottleneck) powering interviews and resume analysis and a spaced-repetition engine deciding what to revisit next.",
        impact: [
            { label: "Prep Modules", value: "14" },
            { label: "AI", value: "Gemini" },
            { label: "Status", value: "Self-hosted" }
        ]
    },
    {
        title: "IJESTM Journal Platform",
        description:
            "Full-stack academic journal and peer-review platform for AITM, running the entire manuscript lifecycle behind role-based editorial workflows, real-time notifications, and SEO tuned for Google Scholar indexing.",
        tech: [
            "React",
            "Vite",
            "Node.js",
            "Express",
            "MySQL",
            "JWT",
            "Socket.io",
            "Nodemailer",
            "Tailwind CSS"
        ],
        image: "/ijestm-thumbnail.png",
        imageWebP: "/ijestm-thumbnail.webp",
        link: "https://ijestm.aitm.edu.in/",
        githubUrl: "",
        websiteUrl: "https://ijestm.aitm.edu.in/",
        year: "2025",
        goal: "Build a production-grade journal platform that drives the full manuscript lifecycle, submission, double-blind peer review, editorial decisions, and DOI publication, while staying discoverable to academic search engines.",
        features: [
            "Role-based access control across five roles (visitor, author, reviewer, editor, admin), enforced by granular middleware down to per-paper ownership and reviewer-assignment checks",
            "JWT authentication with refresh tokens, bcrypt password hashing, email verification, and password reset, hardened with Helmet, rate limiting, and server-side request validation",
            "Complete double-blind peer-review workflow: manuscript submission, reviewer invitations via tokenized email links, autosaved review drafts, editorial decisions, and versioned revision tracking",
            "Real-time notifications over Socket.io alongside transactional email (Nodemailer) for paper status changes, new submissions, and review invitations",
            "55+ RESTful endpoints over a 13-table relational MySQL schema, with Multer file uploads, PDF/DOCX parsing, DOI assignment on publish, and view/download metrics",
            "SEO-first React frontend with Google Scholar prerendering and structured metadata to rank research content in academic search"
        ],
        challenge: "Academic journals must run a rigorous multi-role editorial pipeline and emit strict scholarly metadata for indexing, all while keeping the public reading experience fast and distraction-free.",
        approach: "Built a Node.js/Express and MySQL backend with JWT-secured RBAC and a Socket.io notification layer driving the full submission-to-publication workflow, paired with a Vite/React frontend that prerenders Google Scholar metadata for discoverability.",
        impact: [
            { label: "API Endpoints", value: "55+" },
            { label: "User Roles", value: "5 (RBAC)" },
            { label: "Status", value: "Live" }
        ]
    },
    {
        title: "Fake Review Detector",
        description:
            "AI-powered Chrome extension that detects fake and AI-generated reviews in real time across 10+ leading platforms.",
        tech: [
            "React",
            "TypeScript",
            "TensorFlow.js",
            "ONNX Runtime",
            "Vite",
            "DistilBert",
            "FastAPI",
        ],
        image: "/fake-review-detector-thumbnail.jpg",
        imageWebP: "/fake-review-detector-thumbnail.webp",
        link: "",
        githubUrl: "https://github.com/AbdulWasih05/Fake-Review-Detection",
        year: "2025",
        // websiteUrl: "https://github.com/AbdulWasih05",
        goal: "Developed an AI-driven browser extension that detects and filters fake reviews in real time, integrating seamlessly with major e-commerce platforms to ensure trustworthy online shopping experiences.",
        features: [
            "Dual-Engine AI Detection: Hybrid local (TensorFlow.js/ONNX) and backend analysis for maximum accuracy and speed",
            "Lightning-Fast Performance: Optimized with Vite bundling, lazy loading, and efficient DOM manipulation for zero lag",
            "Customizable Experience: Dark/light themes, adjustable highlight colors, auto-analyze mode, and granular privacy settings",
            "Enterprise-Grade Security: Client-side processing option for privacy-conscious users with optional backend enhancement",
        ],
        challenge: "E-commerce is flooded with fake reviews. The challenge was creating a real-time detection system across multiple platforms without degrading browser performance.",
        approach: "Implemented a hybrid architecture. A local TensorFlow.js model runs in-browser for instant scoring, while complex cases are offloaded to a DistilBERT backend, ensuring 99% uptime.",
        impact: [
            { label: "Accuracy", value: "94%" },
            { label: "Platform Coverage", value: "10+" },
            { label: "Reviews Analyzed", value: "10k+" }
        ]
    },
    {
        title: "Real Estate Platform",
        description:
            "Full-stack real estate platform with cross-platform mobile apps, real-time auctions, and AI-powered price prediction.",
        tech: [
            "React",
            "React Native",
            "Node.js",
            "MySQL",
            "Express.js",
            "Socket.IO",
            "Docker",
            "Tailwind CSS",
            "JWT",
        ],
        image: "/real-estate-thumbnail.jpg",
        imageWebP: "/real-estate-thumbnail.webp",
        githubUrl: "https://github.com/AbdulWasih05",
        websiteUrl:"https://squareproperties.vercel.app/",
        link: "https://squareproperties.vercel.app/",
        goal: "Architected production-grade real estate platform with cross-platform mobile apps (iOS/Android), web admin dashboard, and 70+ RESTful APIs secured by JWT auth, RBAC, and Docker. Enables real-time property sync across platforms..",
        features: [
            "Real-Time Auction Bidding System using Socket.IO with live countdown timers and WebSocket connections for instant bid updates",
            "AI/ML-Powered Price Prediction generating 10-year market forecasts with confidence scoring and trend analysis",
            "Natural Language Search Processing for intelligent property queries and advanced multi-criteria filtering",
            "10+ Business-Critical Modules including property management, NOC verification, favorites system, geolocation services, and persistent chat messaging",
            "Cross-Platform Synchronization with real-time data updates across iOS, Android, and web applications",
            "Enterprise Security with JWT authentication, role-based access control, and comprehensive input validation",
            "Dockerized Architecture ensuring scalable deployment and seamless container orchestration",
        ],
        challenge: "Synchronizing real-time data between web and mobile clients while handling high-frequency auction bidding traffic without latency.",
        approach: "Designed a monolithic-ready architecture using Docker. Implemented Socket.IO for bidirectional, event-based communication to handle live bids with instant updates.",
        impact: [
            { label: "Latency", value: "<100ms" },
            { label: "API Endpoints", value: "70+" },
            { label: "Uptime", value: "99.9%" }
        ]
    },
    {
        title: "SiteSaathi",
        description:
            "Live WhatsApp voice agent on AWS Bedrock, helping construction workers track materials, log labour, and answer site queries in Hindi.",
        tech: [
            "AWS Bedrock",
            "FastAPI",
            "WhatsApp Cloud API",
            "Python"
        ],
        image: "/nirman-mitra-thumbnail.png",
        imageWebP: "/nirman-mitra-thumbnail.webp",
        link: "https://main.d26uqawil4ygv7.amplifyapp.com",
        githubUrl: "",
        websiteUrl: "https://main.d26uqawil4ygv7.amplifyapp.com",
        goal: "Build an accessible, voice-first AI agent for Indian construction foremen to manage sites without typing.",
        features: [
            "WhatsApp Voice Integration for natural language status updates",
            "Multi-language support (Hindi, English)",
            "Automated material tracking and labour logging",
            "Instant query resolution for site issues"
        ],
        challenge: "Construction site data is often unstructured and delayed due to manual entry in multiple languages.",
        approach: "Leveraged AWS Bedrock and WhatsApp API to create a voice-driven interface that seamlessly handles Hindi voice notes and logs structured data.",
        impact: [
            { label: "Platform", value: "WhatsApp" },
            { label: "Input", value: "Voice" },
            { label: "Target User", value: "Foremen" }
        ]
    },
    {
        title: "SlotSwapper",
        description:
            "Real-time peer-to-peer appointment swap marketplace for healthcare clinics, reducing no-show rates and empowering patients.",
        tech: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "Prisma ORM",
            "MySQL",
            "Socket.io",
            "Docker",
            "Tailwind CSS",
            "JWT",
            "Zustand",
            "Vite",
        ],
        image: "/slotswapper-thumbnail.jpg",
        imageWebP: "/slotswapper-thumbnail.webp",
        link: "#",
        githubUrl: "https://github.com/AbdulWasih05",
        // websiteUrl: "https://github.com/AbdulWasih05",
        goal: "Create a real-time peer-to-peer swap marketplace empowering patients while giving administrators complete oversight without compromising security or performance.",
        features: [
            "Real-Time WebSocket Synchronization for instant slot updates and swap requests",
            "Dual-Interface Architecture with dedicated portals for patients and administrators",
            "Secure Authentication using JWT and role-based access control",
            "High-Performance Database with MySQL and strategic indexing for complex queries",
        ],
        challenge: "Clinics lose massive revenue from no-shows. Patients lack flexibility, and admins waste time on manual rescheduling. The system needed to solve this securely.",
        approach: "Built a dual-interface real-time marketplace. React/TypeScript frontend for separate portals, with Node.js/Socket.io ensuring instant sync and <100ms latency.",
        impact: [
            { label: "Admin Time Saved", value: "70%" },
            { label: "Swap Processing", value: "<5s" },
            { label: "API Endpoints", value: "20+" }
        ]
    }
];
