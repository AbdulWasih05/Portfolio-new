// Services.tsx
import React, { useState, useEffect } from 'react';
import './Services.css'; 

// Define the structure for a skill card, now with an active color
interface Skill {
    id: string;
    icon: string;
    title: string;
    description: string;
    activeColor: string;
}

// Data for the skill cards, now including the active color
const skills: Skill[] = [
    {
        id: 'web-dev',
        icon: 'fas fa-laptop-code',
        title: 'Web Development',
        description: 'React, Node.js, Express, HTML5, CSS3, JavaScript, MongoDB, REST APIs',
        activeColor: 'rgba(103, 58, 183, 0.85)'
    },
    {
        id: 'ml',
        icon: 'fas fa-brain',
        title: 'Machine Learning',
        description: 'Python (Pandas, NumPy, Scikit-learn), TensorFlow, Data Analysis, Model Building',
        activeColor: 'rgba(233, 30, 99, 0.85)'
    },
    {
        id: 'software-design',
        icon: 'fas fa-sitemap',
        title: 'Software Design',
        description: 'Object-Oriented Programming (OOP), Data Structures & Algorithms, Clean Code, Agile',
        activeColor: 'rgba(0, 150, 136, 0.85)'
    },
    {
        id: 'cloud-devops',
        icon: 'fas fa-cloud',
        title: 'Cloud & DevOps',
        description: 'Docker, AWS (EC2, S3), Git, CI/CD, Linux, Shell Scripting',
        activeColor: 'rgba(255, 152, 0, 0.85)'
    }
];

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// Define the structure for "What I do" services
interface WhatIDoService {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

// Data for "What I do" services
const whatIDoServices: WhatIDoService[] = [
    {
        id: 'frontend',
        icon: <i className="fas fa-code" />,
        title: 'Frontend Engineering',
        description: 'Building interactive and responsive user interfaces using React, TypeScript, and modern CSS.'
    },
    {
        id: 'backend',
        icon: <i className="fas fa-server" />,
        title: 'Backend Development',
        description: 'Designing scalable APIs and server-side logic with Node.js, Express, and MongoDB.'
    },
    {
        id: 'ml-ai',
        icon: <i className="fas fa-robot" />,
        title: 'ML & AI Solutions',
        description: 'Creating intelligent systems and data-driven applications using Python and TensorFlow.'
    },
    {
        id: 'cloud',
        icon: <i className="fas fa-cloud-upload-alt" />,
        title: 'Cloud & DevOps',
        description: 'Deploying and managing applications on AWS, Docker, and CI/CD pipelines.'
    }
];

export const Services: React.FC = () => {
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [isTouch, setIsTouch] = useState(false);

    // Check for touch device on component mount
    useEffect(() => {
        setIsTouch(isTouchDevice());
    }, []);

    const handleMouseEnter = (id: string) => {
        if (!isTouch) {
            setActiveCard(id);
        }
    };

    const handleMouseLeave = () => {
        if (!isTouch) {
            setActiveCard(null);
        }
    };

    const handleToggle = (id: string) => {
        if (isTouch) {
            setActiveCard(activeCard === id ? null : id);
        }
    };

    return (
        <section className="bg-black py-24 px-6 md:px-12">
            {/* Skills Section */}
            <h2 className="text-4xl font-bold mb-16 md:text-5xl text-white">
                Development & Progress Update
            </h2>

            <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {skills.map((skill, index) => {
                    const isActive = activeCard === skill.id;
                    return (
                        <div
                            key={skill.id}
                            className={`skill-card w-full h-[280px] cursor-pointer perspective-[1000px] rounded-xl 
                                ${isActive ? 'active' : ''}`}
                            style={{ '--delay': index } as React.CSSProperties}
                            onMouseEnter={() => handleMouseEnter(skill.id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleToggle(skill.id)}
                        >
                            <div
                                className={`card-content w-full h-full rounded-xl p-8 relative transition-all duration-300
                                    ${isActive ? 'backdrop-blur-xl bg-opacity-90' : 'backdrop-blur-none bg-opacity-75'}`}
                                style={{
                                    backgroundColor: isActive ? skill.activeColor : 'rgba(17, 25, 40, 0.75)',
                                }}
                            >
                                <div className="flex flex-col items-center justify-center h-full">
                                    <i className={`${skill.icon} text-white text-5xl mb-6 transition-transform duration-300
                                        ${isActive ? 'scale-110' : ''}`} />
                                    <h3 className="text-xl font-semibold text-white mb-4">{skill.title}</h3>
                                    <p className={`text-sm text-white/90 transition-all duration-300
                                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* What I Do Section - Updated styling */}
            <div className="max-w-[1000px] mx-auto mt-32">
                <div className='flex items-center gap-2 mb-24'>
                <h2 className="text-[34px] text-white  playfair flex-shrink-0 ">What I do</h2>
                <div className='h-0.5 w-full bg-white/10'></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    {whatIDoServices.map((service) => (
                        <div
                            key={service.id}
                            className="group relative min-h-[320px] p-10 rounded-2xl 
                                bg-[#111111] hover:bg-[#1A1A1A]
                                transition-all duration-300 cursor-pointer"
                        >
                            <div className="mb-8">
                                <span className="inline-flex items-center justify-center w-14 h-14 
                                    rounded-full bg-black text-2xl">
                                    {service.icon}
                                </span>
                            </div>
                            
                            <h3 className="text-[32px] text-white mb-4 font-normal">
                                {service.title}
                            </h3>
                            
                            <p className="text-[#666666] text-xl leading-relaxed max-w-[90%]">
                                {service.description}
                            </p>
                            
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 
                                group-hover:ring-white/10 transition-all duration-300" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;