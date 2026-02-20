import React from 'react';
import { Layout, Settings, Target, Zap, Mail, Video, CreditCard, Code, Cpu, Film, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: "FUNNEL STRATEGY",
      subtitle: "& SYSTEM DESIGN",
      description: "Mapping out high-performance architectures that turn cold traffic into loyal customers.",
      icon: <Layout className="w-6 h-6" />,
    },
    {
      title: "SYSTEME.IO",
      subtitle: "TECHNICAL BUILD",
      description: "End-to-end implementation of complex automations and email sequencing logic.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "CONVERSION",
      subtitle: "PSYCHOLOGY",
      description: "Data-driven UI/UX using conversion triggers to maximize revenue per click.",
      icon: <Target className="w-6 h-6" />,
    },
  ];

  const integrations = [
    { name: "Systeme.io", icon: <Zap size={16} /> },
    { name: "Gmail", icon: <Mail size={16} /> },
    { name: "Zoom", icon: <Video size={16} /> },
    { name: "Stripe", icon: <CreditCard size={16} /> },
  ];

  const otherSkills = [
    { name: "Javascript", icon: <Code size={16} /> },
    { name: "React JS", icon: <Cpu size={16} /> },
    { name: "Capcut", icon: <Film size={16} /> },
    { name: "Photoshop", icon: <Palette size={16} /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section 
      id="services" 
      className="relative pt-20 overflow-hidden min-h-screen flex flex-col justify-between scroll-mt-20 bg-[#050505] text-white"
    >
      
      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-ticker {
            animation: ticker 30s linear infinite;
          }
        `}
      </style>

      {/* Background Logic Grid */}
      <div 
        className="absolute inset-0 opacity-[0.1]" 
        style={{ 
          backgroundImage: `radial-gradient(#22c55e 0.5px, transparent 0.5px)`, 
          backgroundSize: '30px 30px' 
        }}
      />
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 blur-[120px] rounded-full bg-emerald-500/5 opacity-100"></div>

      <div className="container mx-auto px-6 relative z-10 flex-grow">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }} 
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <span className="font-mono text-xs tracking-[0.4em] uppercase mb-4 block text-emerald-500">
            [ System Capabilities ]
          </span>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            ENGINEERED <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-700">
              FOR SCALE
            </span>
          </h2>
        </motion.div>

        {/* Services Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-12"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group relative p-10 transition-all duration-500 overflow-hidden border bg-black/40 border-white/5 hover:bg-white/[0.02]"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative z-10">
                <div className="mb-8 text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xs font-mono mb-3 tracking-widest uppercase text-emerald-500/60">
                  0{index + 1} //
                </h3>
                <h4 className="text-2xl md:text-3xl font-bold leading-tight mb-1 uppercase tracking-tight italic">
                  {service.title}
                </h4>
                <p className="font-bold text-sm mb-6 tracking-normal uppercase italic text-emerald-400">
                  {service.subtitle}
                </p>
                <p className="leading-relaxed text-sm md:text-base transition-colors duration-500 text-gray-400 group-hover:text-gray-200">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section: Integrations & Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t pt-12 pb-20 border-white/10"
        >
          {/* Left Column: Integrations */}
          <div className="w-full">
            <p className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-400">
              Verified Integrations
            </p>
            <div className="flex flex-wrap gap-3">
              {integrations.map((tool, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="flex items-center gap-3 px-5 py-3 border transition-all bg-white/[0.03] border-white/10"
                >
                  <span className="text-emerald-500">{tool.icon}</span>
                  <span className="text-xs font-black uppercase tracking-widest">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Other Skills */}
          <div className="w-full">
            <p className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-400">
              Advanced Development Skills
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {otherSkills.map((tool, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="flex items-center gap-3 px-5 py-3 border transition-all bg-white/[0.03] border-white/10"
                >
                  <span className="text-emerald-500">{tool.icon}</span>
                  <span className="text-xs font-black uppercase tracking-widest">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-l-2 border-emerald-500/30 bg-white/[0.01]">
              <p className="text-[16px] leading-relaxed font-mono italic text-gray-400">
                <span className="text-emerald-500 font-bold not-italic mr-1">//</span>
                "Beyond Systeme.io, I architect complex web solutions using 
                <span className="text-white"> React.js and Custom JS logic</span> 
                — ensuring your infrastructure is never limited."
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- CONTACT ME MARQUEE BANNER --- */}
      <div className="relative w-full py-10 overflow-hidden border-y bg-[#0a0a0a] border-white/10">
        <div className="flex animate-ticker whitespace-nowrap items-center">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className="mx-12 font-black uppercase text-[6vw] md:text-[3vw] tracking-tighter italic text-white">
                    Featured Projects
                  </span>
                  <div className="mx-4 w-3 h-3 rounded-full bg-white">
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Services;