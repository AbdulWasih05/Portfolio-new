import './Services.css'; 
import {  FaCloud, FaDesktop, FaCode, FaServer,  } from 'react-icons/fa';


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
        id: 'complete-websites',
        icon: <FaDesktop />,
        title: 'Complete websites',
        description: 'Strategic, beautiful websites that achieve your business goals.'
    },
    {
        id: 'frontend',
        icon: <FaCode />,
        title: 'Frontend Engineering',
        description: 'Building interactive and responsive user interfaces using React, TypeScript, and modern CSS.'
    },
    {
        id: 'backend',
        icon: <FaServer />,
        title: 'Backend Development',
        description: 'Designing scalable APIs and server-side logic with Node.js, Express, and MongoDB.'
    },
    {
        id: 'cloud-devops',
        icon: <FaCloud />,
        title: 'Cloud & DevOps',
        description: 'Docker, Git, Github, Netlify, Linux, Shell Scripting',
    }
];

export const Services: React.FC = () => {

    return (
        <section className="bg-black py-24 px-6 md:px-12" id='Skills'>

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
                            className="group relative min-h-[280px] p-8 rounded-xl 
                                bg-black hover:bg-[#222222]
                                transition-all duration-300 cursor-pointer
                                flex flex-col items-center justify-center text-center"
                        >
                            <div className="mb-8">
                                <span className="inline-flex items-center justify-center  h-16 w-16 rounded-full
                                     bg-[#1A1A1A] text-white text-2xl">
                                    {service.icon}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl text-white mb-4 font-serif font-normal">
                                {service.title}
                            </h3>
                            
                            <p className="text-[#A0A0A0] text-base leading-relaxed max-w-[90%] font-sans">
                                {service.description}
                            </p>
                            
                            <div className="absolute inset-0 rounded-xl ring-1 ring-white/5 
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