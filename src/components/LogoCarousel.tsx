import { memo } from "react";

// Define tech stack (names only for text marquee)
const techStack = [
    "HTML", "CSS", "JavaScript", "React", "Node.js",
    "Docker", "Git", "Python","Typescript", "Next.js", "Tailwind CSS", "Vite","POSTGRESQL", "Express.js", "Redux"
];

const LogoCarousel = memo(() => {
    // Triple the array to ensure seamless looping for wider screens
    const loopStack = [...techStack, ...techStack, ...techStack];

    return (
        <section className="relative w-full py-16 overflow-hidden bg-gray-50">
            {/* Background elements for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-100 via-transparent to-transparent opacity-40 pointer-events-none" />

            <div className="relative w-full max-w-6xl mx-auto flex flex-col gap-8">
                {/* Gradient Masks (Fade edges) */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

                {/* Row 1: Left Movement */}
                <div className="flex overflow-hidden relative z-0">
                <div
                    className="flex whitespace-nowrap carousel-scroll-left"
                    style={{ width: "fit-content" }}
                >
                    {loopStack.map((tech, i) => (
                        <div
                            key={`row1-${tech}-${i}`}
                            className="flex items-center mx-8 group cursor-default"
                        >
                            <span className="text-xl md:text-2xl font-mono font-bold text-gray-300 uppercase group-hover:text-gray-900 transition-colors duration-300">
                                {tech}
                            </span>
                            <span className="ml-8 text-gray-200 text-sm font-mono">///</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 2: Right Movement */}
            <div className="flex overflow-hidden relative z-0">
                <div
                    className="flex whitespace-nowrap carousel-scroll-right"
                    style={{ width: "fit-content" }}
                >
                    {loopStack.map((tech, i) => (
                        <div
                            key={`row2-${tech}-${i}`}
                            className="flex items-center mx-8 group cursor-default"
                        >
                            <span className="text-xl md:text-2xl font-mono font-bold text-gray-300 uppercase group-hover:text-gray-900 transition-colors duration-300">
                                {tech}
                            </span>

                             <span className="ml-8 text-gray-200 text-sm font-mono">///</span>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </section>
    );
});

LogoCarousel.displayName = 'LogoCarousel';

export default LogoCarousel;
