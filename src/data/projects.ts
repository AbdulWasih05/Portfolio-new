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

    // Optional fields for the home page "Selected Work" entries (Projects.tsx / WorkEntry.tsx).
    // Everything falls back gracefully when a field is missing.
    /** One line, problem → outcome. Falls back to `description`. */
    outcome?: string;
    /** One line on the hardest decision or trade-off ("The hard part"). Hidden when missing. */
    hardPart?: string;
    /** Heading over that line, when "The hard part" is the wrong framing (e.g. "Why it won"). */
    hardPartLabel?: string;
    /** At most two short, verifiable fact chips. */
    facts?: string[];
    /** Stack tags shown on the entry. Falls back to the first three of `tech`. */
    tags?: string[];
    /** Headline stats (2–3). Falls back to `impact` without "Status" entries. */
    stats?: ProjectStats[];
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
            "Python",
            "FastAPI",
            "Gemini 2.5 Flash",
            "Groq Llama 3.3 70B",
            "Sarvam AI (Kannada TTS)",
            "Supabase",
            "Twilio WhatsApp",
            "Next.js"
        ],
        image: "/vidyutmitra-thumbnail.png",
        imageWebP: "/vidyutmitra-thumbnail.webp",
        link: "https://vidyut-mitra.wasihh.tech/",
        githubUrl: "https://github.com/AbdulWasih05/vidyut-mitra",
        websiteUrl: "https://vidyut-mitra.wasihh.tech/",
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
            { label: "Saved / Example Household", value: "₹1,740/yr" },
            { label: "At MESCOM Scale, Projected", value: "₹39 Cr/yr" },
            { label: "Cost / Bill", value: "~₹1.7" }
        ],
        // DRAFT copy: owner to review (home page Selected Work fields)
        outcome: "Confusing power bills → one WhatsApp photo gets a Kannada voice note on what to fix.",
        hardPart: "Vision, three analyses, an LLM and a Kannada voice note, all back as one WhatsApp reply in under 15 seconds.",
        facts: ["WhatsApp-first", "Kannada voice"],
        tags: ["FastAPI", "Gemini 2.5 Flash", "Groq Llama 3.3 70B"]
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
            { label: "API Endpoints", value: "112" },
            { label: "Data Models", value: "22" },
            { label: "Status", value: "Self-hosted" }
        ],
        // DRAFT copy: owner to review (home page Selected Work fields)
        outcome: "Placement prep scattered across tabs and sheets → one local-first app for all of it.",
        hardPart: "Gemini calls run through a rate-limited queue, so mock interviews slow down instead of failing at the quota.",
        facts: ["Local-first", "Spaced repetition"],
        tags: ["Next.js", "React", "TypeScript"]
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
        ],
        // DRAFT copy: owner to review (home page Selected Work fields)
        outcome: "Running a peer-reviewed journal → one platform from submission to DOI, indexed by Google Scholar.",
        hardPart: "Access is enforced down to per-paper ownership and reviewer assignment, not just by role.",
        facts: ["Double-blind review", "Scholar-indexed"],
        tags: ["React", "Node.js", "MySQL"]
    },
    {
        // Facts from the repo README (github.com/AbdulWasih05/Viva). Screenshot: local dev build, home screen.
        title: "Viva",
        description:
            "A mock technical interview about your own project, for the AI-coding era. Viva reads your repo, finds the parts an AI agent wrote, and questions you about them the way a placement panel would, then ends with a scored report.",
        tech: [
            "Next.js",
            "React",
            "TypeScript",
            "Mastra",
            "Gemma",
            "Ollama",
            "LibSQL",
            "Vitest"
        ],
        image: "/viva-thumbnail.png",
        imageWebP: "/viva-thumbnail.webp",
        link: "",
        githubUrl: "https://github.com/AbdulWasih05/Viva",
        year: "2026",
        goal: "Help students explain code they shipped with an AI agent's help, before an interviewer asks about it.",
        features: [
            "Reads a public GitHub repo (or a local folder) and writes a short brief; invented file paths are dropped",
            "Uses Entire checkpoints to find which files an AI agent wrote, and the prompt that started it",
            "Runs a five-stage interview; the agent opens files itself with a readFile tool",
            "Every follow-up must quote the candidate's answer, and code checks the quote is real",
            "Scores each answer 0 to 4 in code; Gemma writes the coaching text",
            "Local mode remembers weak spots across sessions and can run fully offline on Ollama"
        ],
        challenge: "Students now ship projects an AI agent half-wrote, and interviewers know it. Generic mock interviews don't ask about the code you actually have.",
        approach: "A Mastra agent on Gemma, an open-weight model, with model output checked in code: file paths against the real file list, follow-up quotes against the answer, and scores computed outside the model.",
        impact: [
            { label: "Interview stages", value: "5" },
            { label: "Score scale", value: "0–4" },
            { label: "Modes", value: "Hosted + local" }
        ],
        // DRAFT copy: owner to review
        outcome: "Projects an AI half-wrote → a mock interview that asks you about exactly those parts, then scores you.",
        hardPartLabel: "Why it won",
        hardPart: "Best Use of Entire at DEV's Hacktoberfest 2026: it reads an agent's checkpoints to find the files the AI wrote, then interviews you on exactly those.",
        tags: ["Next.js", "Mastra", "Gemma", "TypeScript"]
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
        ],
        // DRAFT copy: owner to review (home page Selected Work fields)
        outcome: "Fake reviews mislead shoppers → a browser extension flags them live on 10+ sites.",
        hardPart: "Scores in the browser first (TensorFlow.js); only hard cases hit the DistilBERT backend. Speed and privacy over peak accuracy.",
        facts: ["Chrome extension", "In-browser ML"],
        tags: ["React", "TypeScript", "TensorFlow.js"]
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
        websiteUrl:"https://square.wasihh.tech/",
        link: "https://square.wasihh.tech/",
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
        ],
        // DRAFT copy: owner to review (home page Selected Work fields)
        outcome: "Property auctions on web and mobile → live bids that sync across every screen.",
        hardPart: "Bids travel as Socket.IO events instead of polling, keeping updates under 100ms on web and mobile.",
        facts: ["iOS · Android · Web", "Live auctions"],
        tags: ["React", "React Native", "Node.js"]
    },
    {
        title: "SiteSaathi",
        description:
            "Live WhatsApp voice agent on AWS Bedrock, helping construction workers track materials, log labour, and answer site queries in Hindi.",
        tech: [
            "Node.js",
            "AWS Bedrock",
            "Amazon Transcribe",
            "Amazon Polly",
            "Amazon Textract",
            "DynamoDB",
            "Step Functions",
            "WhatsApp Cloud API"
        ],
        image: "/nirman-mitra-thumbnail.png",
        imageWebP: "/nirman-mitra-thumbnail.webp",
        link: "https://main.d26uqawil4ygv7.amplifyapp.com",
        // Repo is named after the hackathon (README: "Nirman Mitra").
        githubUrl: "https://github.com/AbdulWasih05/AI-for-Bharat",
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
        ],
        // DRAFT copy: owner to review
        outcome: "Site logs kept by hand → foremen send a Hindi voice note on WhatsApp and it's logged.",
        tags: ["Node.js", "AWS Bedrock", "Amazon Transcribe", "WhatsApp Cloud API"]
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
        githubUrl: "https://github.com/AbdulWasih05/SlotSwapper",
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
        ],
        // DRAFT copy: owner to review
        outcome: "Clinic no-shows and manual rescheduling → patients swap appointments with each other in real time.",
        tags: ["React", "Node.js", "Socket.io", "MySQL"]
    }
];

// The projects shown on the home page and the 404 page, in this order.
const FEATURED = ['VidyutMitra', 'Viva', 'IJESTM Journal Platform'];
export const featuredProjects = FEATURED.map((title) => {
    const found = projects.find((p) => p.title === title);
    if (!found) throw new Error(`featuredProjects: no project titled "${title}"`);
    return found;
});

// Helpers for the home page entries: optional fields with fallbacks.
// A lone number in a full-width box reads as a mistake, so the strip needs at least two.
export const projectStats = (project: Project) => {
    const stats = (project.stats?.length ? project.stats : project.impact.filter((s) => s.label.toLowerCase() !== 'status')).slice(0, 3);
    return stats.length >= 2 ? stats : [];
};
export const projectTags = (project: Project) => (project.tags?.length ? project.tags : project.tech.slice(0, 3));

// Year is shown only when it's set; no guessed fallback.
export const projectYear = (project: Project) => project.year || undefined;

// Copy still in [brackets] is a placeholder for the owner to fill in; it never renders.
export const isFilled = (text?: string): text is string => !!text && !/^\[.*\]$/.test(text.trim());

const hasUrl = (u?: string) => !!u && u !== '#';

export const liveUrl = (project: Project) =>
    hasUrl(project.websiteUrl) ? project.websiteUrl! : hasUrl(project.link) ? project.link : '';

// githubUrl only counts when it points at a repository, not the profile root.
export const repoUrl = (project: Project) => {
    const url = project.githubUrl;
    if (!hasUrl(url)) return '';
    try {
        return new URL(url!).pathname.split('/').filter(Boolean).length >= 2 ? url! : '';
    } catch {
        return '';
    }
};
