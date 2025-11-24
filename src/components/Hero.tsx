import { useState, useEffect, memo } from 'react';
import LanyardBadge from './LanyardBadge';


const Hero = memo(() => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrolltocontact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const roles = [
    "Hi",
    "नमस्ते",
    "Hallo",
    "Hola",
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const handleTyping = () => {
    const current = roles[index];
    if (isDeleting) {
      setText(current.substring(0, text.length - 1));
      setSpeed(50); // faster when deleting
    } else {
      setText(current.substring(0, text.length + 1));
      setSpeed(100);
    }

    if (!isDeleting && text === current) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, speed]);


  return (
    <section id="hero" className="min-h-screen bg-gray-50 pt-24 scroll-mt-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 min-h-[calc(100vh-6rem)]">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center py-20 lg:pt-8 lg:pb-0 animate-fade-in">
            {/* Main Title - Stack Layout like "Thoughts Code Coffee" */}
            <div className="mb-8 animate-fade-in-up">
              {/* Grid Background Effect - Right Side Only */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                {/* Main Grid Pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
                `,
                  backgroundSize: '40px 40px'
                }}></div>

                {/* Secondary smaller grid */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.030) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.030) 1px, transparent 1px)
                `,
                  backgroundSize: '10px 10px'
                }}></div>

                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-gray-100/30"></div>

                {/* right side div pattern */}
                {/* <div className="absolute inset-0 bg-gradient-to-tl from-gray-200/10 via-transparent to-white/15"></div> */}

                {/* Floating White Boxes */}
                <div className="absolute top-20 left-1/4 w-16 h-16 bg-white/60 rounded-lg shadow-sm transform rotate-12 animate-float backdrop-blur-sm"></div>
                <div className="absolute top-40 right-1/3 w-12 h-12 bg-white/40 rounded-lg shadow-sm transform -rotate-6 animate-float-slow backdrop-blur-sm"></div>
                <div className="absolute top-35 right-1/3 w-12 h-12 bg-white/35 rounded-lg shadow-sm transform -rotate-6 animate-float-slow backdrop-blur-sm"></div>
                <div className="absolute top-60 left-1/6 w-20 h-8 bg-white/50 rounded-lg shadow-sm transform rotate-3 animate-float-slow backdrop-blur-sm"></div>
                <div className="absolute top-80 right-1/4 w-14 h-14 bg-white/30 rounded-lg shadow-sm transform -rotate-12 animate-float backdrop-blur-sm"></div>
                <div className="absolute bottom-40 left-1/3 w-18 h-10 bg-white/45 rounded-lg shadow-sm transform rotate-8 animate-float-reverse backdrop-blur-sm"></div>
                <div className="absolute bottom-60 right-1/6 w-16 h-12 bg-white/35 rounded-lg shadow-sm transform -rotate-4 animate-float-slow backdrop-blur-sm"></div>

                {/* Additional decorative elements */}
                <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-gray-400/20 rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gray-500/25 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-gray-300/15 rounded-full animate-pulse delay-500"></div>
              </div>


              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black leading-none tracking-tight playfair">
                <div className="block">Thoughts</div>
                <div className="block">Code</div>
                <div className="block">Coffee</div>
              </h1>
            </div>

            {/* Greeting with Animation */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg text-gray-600 font-medium">
                {text} ,I'm <span className="text-black font-semibold">Wasih</span>
                <span className="blinking-cursor ml-1">|</span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-8 space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-lg text-gray-700 font-medium leading-relaxed max-w-lg">
                Not a wizard, but can craft fast, secure, and scalable web apps. Dedicated to crafting clean code, seamless UI, and efficient systems.
              </p>
            </div>

            {/* CTA Button */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center px-4 py-2 text-lg font-medium text-black border border-gray-200 rounded hover:bg-black hover:text-white transition-colors group cursor-pointer"
              >
                View My Work
                <svg
                  className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: ID Badge with Grid Background */}
          <div className="hidden lg:flex flex-col justify-center py-20 relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Grid Background Effect - Right Side Only */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              {/* Main Grid Pattern */}
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}></div>

              {/* Secondary smaller grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.030) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.030) 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px'
              }}></div>

              {/* Gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-gray-200/10 via-transparent to-white/15"></div>

              {/* Floating White Boxes */}
              <div className="absolute top-20 left-1/4 w-16 h-16 bg-white/60 rounded-lg shadow-sm transform rotate-12 animate-float backdrop-blur-sm"></div>
              <div className="absolute top-40 right-1/3 w-12 h-12 bg-white/40 rounded-lg shadow-sm transform -rotate-6 animate-float-reverse backdrop-blur-sm"></div>
              <div className="absolute top-60 left-1/6 w-20 h-8 bg-white/50 rounded-lg shadow-sm transform rotate-3 animate-float-slow backdrop-blur-sm"></div>
              <div className="absolute top-80 right-1/4 w-14 h-14 bg-white/30 rounded-lg shadow-sm transform -rotate-12 animate-float backdrop-blur-sm"></div>
              <div className="absolute bottom-40 left-1/3 w-18 h-10 bg-white/45 rounded-lg shadow-sm transform rotate-8 animate-float-reverse backdrop-blur-sm"></div>
              <div className="absolute bottom-60 right-1/6 w-16 h-12 bg-white/35 rounded-lg shadow-sm transform -rotate-4 animate-float-slow backdrop-blur-sm"></div>

              {/* Additional decorative elements */}
              <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-gray-400/20 rounded-full animate-pulse"></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gray-500/25 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-gray-300/15 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* ID Badge Component - Positioned at top right */}
            <LanyardBadge />
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;