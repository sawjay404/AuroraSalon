import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';

const HeroSection = ({ setIsFormOpen }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen lg:h-screen bg-[#050505] flex flex-col lg:flex-row items-stretch overflow-hidden font-sans z-20">
      
      {/* Background Decorative Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-pink-600/10 blur-[100px] md:blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-pink-900/5 blur-[80px] md:blur-[120px] rounded-full"></div>
      </div>

      {/* LEFT: CONTENT STRATEGY */}
      <div className="relative w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 pt-40 pb-16 lg:py-0 z-10">
        
        {/* Subtle Label */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-6 md:mb-8"
        >
          <span className="h-[1px] w-8 md:w-12 bg-pink-600/50"></span>
          <p className="text-pink-500 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em]">
            The New Standard
          </p>
        </motion.div>

        {/* Headline Hierarchy */}
        <div className="relative group">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] sm:text-[12vw] lg:text-[7.5vw] font-serif text-white leading-[0.85] tracking-tight relative z-20"
          >
            THE <br /> 
            <span className="italic font-extralight text-pink-500 transition-colors duration-700 group-hover:text-white">
              AURORA
            </span> <br />
            <span className="inline-block transition-transform duration-1000 group-hover:translate-x-4">GLOW.</span>
          </motion.h1>
          
          <span className="absolute -top-10 md:-top-16 -left-6 md:-left-12 text-[20vw] md:text-[18vw] font-serif text-white/[0.03] pointer-events-none select-none italic z-0">
            Est. 2024
          </span>
        </div>

        {/* Description & CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-10 relative z-20"
        >
          <div className="border-l-2 border-pink-600/20 pl-6">
            <p className="text-white/50 text-[13px] md:text-[14px] max-w-[250px] md:max-w-[280px] leading-relaxed uppercase tracking-[0.15em]">
              Bespoke hair artistry designed for the discerning individual.
            </p>
          </div>
          
          <button 
            onClick={() => setIsFormOpen(true)}
            className="w-full sm:w-auto group relative px-8 md:px-10 py-5 overflow-hidden bg-white rounded-full transition-all duration-500 hover:bg-pink-600 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-black group-hover:text-white text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] transition-colors duration-500">
              Reserve Session 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* RIGHT: CINEMATIC VISUAL */}
      <div className="relative w-full lg:w-[45%] h-[50vh] sm:h-[60vh] lg:h-auto border-t lg:border-t-0 lg:border-l border-white/5 z-10 bg-zinc-900">
        <div className="absolute inset-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="salon.png" 
            alt="Aurora Studio Aesthetic"
            className="w-full h-full object-cover grayscale-[20%] transition-transform duration-[5000ms] hover:scale-110"
          />
          {/* Gradient for mobile (Top to Bottom) and Desktop (Left to Right) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] lg:bg-gradient-to-r lg:from-[#050505] lg:via-[#050505]/20 lg:to-transparent"></div>
          <div className="absolute inset-0 bg-pink-900/5 mix-blend-color"></div>
        </div>

        {/* Interaction Layer */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20">
          <div className="flex items-center justify-between w-full">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoOpen(true);
              }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-pink-600 group-hover:border-pink-600 transition-all duration-500 shadow-xl">
                <Play size={16} className="text-white fill-white ml-1 md:size-[20px]" />
              </div>
              <span className="text-white/60 text-[10px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold group-hover:text-white transition-colors">
                Watch Film
              </span>
            </button>

            <a href="#gallery" className="text-white/40 hover:text-pink-500 transition-colors uppercase text-[10px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.5em] flex items-center gap-2 md:gap-4 group">
              <span className="hidden sm:block h-[1px] w-8 bg-white/10 group-hover:bg-pink-500 transition-all"></span>
              Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* VIDEO MODAL OVERLAY */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-4 md:p-12"
          >
            <div className="absolute inset-0" onClick={() => setIsVideoOpen(false)}></div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-2xl overflow-hidden border border-white/10 z-[1001]"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-[1010] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-pink-600 transition-colors"
              >
                <X size={20} md:size={24} strokeWidth={2} />
              </button>

              <iframe
                src="salonvideo.mp4" 
                title="Aurora Glow Film"
                className="w-full h-full scale-[1.01]"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;