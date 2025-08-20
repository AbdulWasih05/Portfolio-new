import React, { useState } from 'react';

// The styles below are for the 3D card flip effect, which are not directly
// available as Tailwind CSS utilities. All other styling is done with Tailwind.
const customCardStyles = `
    .skill-card {
        opacity: 0;
        transform: translateY(-100px) translateZ(0px);
        animation: fadeInUp 0.6s forwards;
        animation-delay: calc(var(--delay) * 0.2s);
        transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .card-content {
        backdrop-filter: blur(16px) saturate(180%);
        background-color: rgba(17, 25, 40, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.125);
        transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        position: relative;
        overflow: hidden;
    }

    .card-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(225deg, 
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 100%);
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    .skill-card.active {
        transform: translateY(-10px) translateZ(20px);
        z-index: 10;
    }

    .skill-card.active .card-content {
        backdrop-filter: blur(20px) saturate(200%);
    }

    .skill-card.active .card-content::before {
        opacity: 1;
    }

    .card-1.active .card-content { background-color: rgba(103, 58, 183, 0.85); }
    .card-2.active .card-content { background-color: rgba(233, 30, 99, 0.85); }
    .card-3.active .card-content { background-color: rgba(0, 150, 136, 0.85); }
    .card-4.active .card-content { background-color: rgba(255, 152, 0, 0.85); }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0) translateZ(0px);
        }
    }
`;

// Define the structure for a skill card
interface Skill {
    id: string;
    icon: string;
    title: string;
    backTitle: string;
    description: string;
}

// Data for the skill cards
const skills: Skill[] = [
    {
        id: 'web-dev',
        icon: 'fas fa-laptop-code',
        title: 'Web Development',
        backTitle: 'Technologies',
        description: 'React, Node.js, Express, HTML5, CSS3, JavaScript, MongoDB, REST APIs'
    },
    {
        id: 'ml',
        icon: 'fas fa-brain',
        title: 'Machine Learning',
        backTitle: 'Technologies & Skills',
        description: 'Python (Pandas, NumPy, Scikit-learn), TensorFlow, Data Analysis, Model Building'
    },
    {
        id: 'software-design',
        icon: 'fas fa-sitemap',
        title: 'Software Design',
        backTitle: 'Concepts & Principles',
        description: 'Object-Oriented Programming (OOP), Data Structures & Algorithms, Clean Code, Agile'
    },
    {
        id: 'cloud-devops',
        icon: 'fas fa-cloud',
        title: 'Cloud & DevOps',
        backTitle: 'Technologies',
        description: 'Docker, AWS (EC2, S3), Git, CI/CD, Linux, Shell Scripting'
    }
];

// The React component for the Services/Skills section
export const Services: React.FC = () => {
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const handleCardInteraction = (id: string) => {
        setActiveCard(activeCard === id ? null : id);
    };

    return (
        <>
            {/* The following style tag should be placed in your main index.html file to apply globally */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

            {/* Custom styles for the 3D flip effect */}
            <style>{customCardStyles}</style>

            <section className="bg-gradient-to-br from-gray-900 to-black py-16 px-5 text-center md:py-32 relative overflow-hidden">
                <h2 className="text-4xl font-bold mb-16 md:text-5xl text-white">
                    Development & Progress Update
                </h2>

                <div className="skills-grid mx-auto max-w-6xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Map over the skills data to render cards */}
                    {skills.map((skill, index) => (
                        <div
                            key={skill.id}
                            className={`skill-card w-full h-[280px] cursor-pointer perspective-[1000px] rounded-xl card-${index + 1} ${
                                activeCard === skill.id ? 'active' : ''
                            }`}
                            style={{ '--delay': index } as React.CSSProperties}
                            onClick={() => handleCardInteraction(skill.id)}
                            onMouseEnter={() => handleCardInteraction(skill.id)}
                            onMouseLeave={() => setActiveCard(null)}
                        >
                            <div className="card-content w-full h-full rounded-xl p-8 relative">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <i className={`${skill.icon} text-white text-5xl mb-6 transition-transform duration-300 ${
                                        activeCard === skill.id ? 'scale-110' : ''
                                    }`}></i>
                                    <h3 className="text-xl font-semibold text-white mb-4">{skill.title}</h3>
                                    <p className={`text-sm text-white/90 transition-all duration-300 ${
                                        activeCard === skill.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}>
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Services;
