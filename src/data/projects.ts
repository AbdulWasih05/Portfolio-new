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

export const projects: Project[] = [
    {
        title: "Nirman Mitra",
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
        goal: "Create a real-time peer-to-peer swap marketplace empowering patients while giving administrators complete oversight—without compromising security or performance.",
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
        title: "VidyutMitra",
        description:
            "WhatsApp AI energy advisor that gives households conversational guidance on electricity usage and ways to lower their bills.",
        tech: [
            "AWS Bedrock",
            "FastAPI",
            "WhatsApp Cloud API"
        ],
        image: "",
        link: "#",
        githubUrl: "https://github.com/AbdulWasih05/",
        websiteUrl: "",
        year: "2026",
        goal: "Provide smart, conversational energy advice to households via WhatsApp to help reduce consumption.",
        features: [
            "Conversational electricity usage tracking",
            "Actionable insights to lower bills",
            "WhatsApp-based natural language interface"
        ],
        challenge: "Users lack clear, actionable insights on their electricity bills.",
        approach: "Built a WhatsApp chatbot powered by AWS Bedrock to summarize usage data and recommend savings tips.",
        impact: [
            { label: "Platform", value: "WhatsApp" },
            { label: "Focus", value: "Energy Savings" },
            { label: "Interface", value: "Conversational" }
        ]
    },
    {
        title: "IJESTM Journal Platform",
        description:
            "College journal website built for AITM with advanced SEO features tailored for academic publications and research papers.",
        tech: [
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "SEO Optimization"
        ],
        image: "",
        link: "https://ijestm.aitm.edu.in/",
        githubUrl: "",
        websiteUrl: "https://ijestm.aitm.edu.in/",
        year: "2025",
        goal: "Develop a high-performance, SEO-optimized journal publication website to improve the discoverability of academic research.",
        features: [
            "Advanced SEO architecture specifically designed for indexed academic search and Google Scholar indexing",
            "Modern, reader-friendly UI tailored for digesting long-form research papers and journals",
            "Responsive layout ensuring seamless reading experiences across mobile and desktop devices",
            "Streamlined metadata management to ensure articles surface correctly in search engines"
        ],
        challenge: "Academic journals require strict indexing, rich metadata, and specific SEO standards to be discoverable while keeping the reading experience distraction-free.",
        approach: "Architected an SEO-first web platform utilizing optimized rendering, structured metadata headers, and semantic HTML to rank research content highly on search engines.",
        impact: [
            { label: "Focus", value: "Academic SEO" },
            { label: "Platform", value: "College Journal" },
            { label: "Status", value: "Live" }
        ]
    }
];

