import { motion } from "framer-motion";
import { FaCloud, FaDesktop, FaCode, FaServer } from "react-icons/fa";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const services: Service[] = [
  {
    id: "complete-websites",
    icon: <FaDesktop />,
    title: "Complete Websites",
    description:
      "Strategic, beautiful websites that achieve your business goals. From concept to launch, I craft digital experiences that leave a lasting impression.",
    className: "md:col-span-2",
  },
  {
    id: "frontend",
    icon: <FaCode />,
    title: "Frontend Engineering",
    description:
      "Building interactive and responsive user interfaces using React, TypeScript, and modern CSS frameworks like Tailwind.",
    className: "md:col-span-1",
  },
  {
    id: "backend",
    icon: <FaServer />,
    title: "Backend Development",
    description:
      "Designing scalable APIs and server-side logic with Node.js, Express, and MySQL to power robust applications.",
    className: "md:col-span-1",
  },
  {
    id: "cloud-devops",
    icon: <FaCloud />,
    title: "Cloud & DevOps",
    description:
      "Streamlining deployment with Docker, CI/CD pipelines, and cloud platforms like Netlify and AWS for maximum uptime.",
    className: "md:col-span-2",
  },
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-3xl bg-gray-50 p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${service.className}`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white text-gray-900 text-2xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300 shadow-sm">
            {service.icon}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 playfair">
            {service.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      {/* Decorative gradient blob */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white rounded-full blur-3xl group-hover:bg-gray-200 transition-colors duration-500 opacity-50 pointer-events-none" />
    </motion.div>
  );
};

export default function Services() {
  return (
    <section id="Skills" className="bg-white py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <div className="w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gray-50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 playfair">
                What I Do
              </h2>
              <div className="h-1 w-20 bg-gray-900 ml-4 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl playfair">
              Combining technical expertise with creative design to build scalable digital solutions.
            </p>
          </div>
          
          {/* Optional: Add a decorative element or button here if needed */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
