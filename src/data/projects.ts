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
    goal: string;
    features: string[];
    challenge: string;
    approach: string;
    impact: ProjectStats[];
}

export const projects: Project[] = [
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
        websiteUrl: "https://github.com/AbdulWasih05",
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
            "React.js",
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
        link: "https://auzproperties.vercel.app/",
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
            title: "Retro Wallet - Expense Tracker",
            description:
                "Full-stack expense tracker with vaporwave retro gaming UI, real-time analytics, and CRUD ops.",
            tech: [
                "React",
                "MySQL",
                "TypeScript",
                "Node.js",
                "Express.js",
                "Docker",
                "Sequelize ORM",
                "JWT",
                "Tailwind CSS",
            ],
            image: "/retro-wallet-thumbnail.jpg",
            imageWebP: "/retro-wallet-thumbnail.webp",
            link: "#",
            githubUrl: "https://github.com/AbdulWasih05/Retro-Wallet",
            websiteUrl: "https://github.com/AbdulWasih05",
            goal: "Develop production-ready expense tracker with retro-gaming UI, full-stack CRUD, JWT auth, RESTful APIs, Docker, and real-time analytics.",
            features: [
                "Immersive Retro Gaming UI with vaporwave neon aesthetics and pixel-perfect animations",
                "Complete Expense Management with real-time CRUD operations and instant total calculations",
                "Secure JWT Authentication with bcrypt password hashing and Guest Mode for demos",
                "Advanced Analytics with category-based filtering, date range selection, and visual expense breakdown",
                "Containerized Deployment with Docker Compose for MySQL, backend, and frontend services",
                "Lightning-Fast Performance using React 18, Vite bundling, and Sequelize ORM optimization",
                "Fully Responsive Design with mobile-first Tailwind CSS and seamless cross-device experience",
                "State Management with React Context API for global expense and authentication states",
            ],
            challenge: "Transforming tedious finance management into an engaging experience without compromising security or data integrity.",
            approach: "Adopted a 'Gamification' design with Vaporwave aesthetics. Used React Context for fluid state and Sequelize ORM to ensure strict data validation.",
            impact: [
                { label: "User Engagement", value: "+40%" },
                { label: "Load Time", value: "0.8s" },
                { label: "Crash Free", value: "100%" }
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
        websiteUrl: "https://github.com/AbdulWasih05",
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
        title: "Territory Wars - Multiplayer Grid Game",
        description:
            "Full-stack multiplayer game with real-time tile capture, live leaderboards, and sub-millisecond performance using in-memory caching.",
        tech: [
            "React 18",
            "PostgreSQL",
            "Node.js",
            "Express.js",
            "Socket.IO",
            "Docker",
            "Prisma ORM",
            "Tailwind CSS",
            "Framer Motion",
            "Vite"
        ],
        image: "/territory-wars-thumbnail.jpg",
        imageWebP: "/territory-wars-thumbnail.webp",
        link: "https://territorial-wars.vercel.app/",
        githubUrl: "https://github.com/AbdulWasih05/territory-wars",
        websiteUrl: "https://territorial-wars.vercel.app/",
        goal: "Build a real-time multiplayer grid game with instant tile capture, live state synchronization across multiple clients, and server-authoritative architecture without database bottlenecks.",
        features: [
            "Real-Time Multiplayer with Socket.IO handling 18 event types for instant state sync across all connected players",
            "Server-Authoritative Architecture with in-memory caching (~0.1ms reads vs ~5ms DB) for sub-millisecond gameplay",
            "Round-Based Competitive Mode with full state machine (Lobby → Countdown → Active → Results) and auto-cycling",
            "Configurable Lobby System allowing grid size selection (300/600/900 tiles) and round duration (15s/25s/40s) synced live",
            "Tile Stealing Mechanics enabling players to capture opponent territory with cooldown enforcement and conflict resolution",
            "Live Leaderboard computed on-the-fly from grid state with real-time score updates and steal tracking",
            "Optimistic UI Updates providing instant client feedback with server validation and automatic correction on conflicts",
            "Polished Animations using Framer Motion for tile captures, countdown overlays, toast notifications, and leaderboard reordering",
            "Containerized Deployment with Docker Compose orchestrating PostgreSQL, backend, and frontend services"
        ],
        challenge: "Building a responsive multiplayer experience where hundreds of tile updates per second reach all players instantly without database latency or race conditions.",
        approach: "Adopted server-authoritative model with in-memory Map cache bypassing DB during rounds. Used optimistic UI for instant feedback, Socket.IO for real-time sync, and last-write-wins strategy to eliminate lock contention while maintaining gameplay integrity.",
        impact: [
            { label: "Real-Time Sync", value: "18 events" },
            { label: "Max Grid Size", value: "900 tiles" },
            { label: "State Machine", value: "4 phases" }
        ]
    }
];

