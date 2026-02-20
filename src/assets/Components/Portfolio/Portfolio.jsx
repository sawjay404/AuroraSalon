import React from 'react';
import { motion } from 'framer-motion';

const Work = ({ isDarkMode, onBackHome }) => {
  // Mobile-safe marquee: uses percentages so it doesn't matter how wide the screen is
  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
        },
      },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen w-full flex flex-col items-center justify-between transition-colors duration-500 relative overflow-hidden
      ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-gray-50 text-black'}`}>
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#10b981' : '#000'} 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 z-10 py-12">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-3xl text-center"
        >
          
          {/* ANIMATED TECH ICON - Scaled for mobile */}
          <div className="mb-6 md:mb-8 flex justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="p-3 md:p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block px-3 py-1 mb-4 md:mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
            System Status: Compiling Assets
          </motion.div>

          {/* HEADLINE: Adjusted responsive sizes to prevent clipping */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.95] md:leading-[0.9] tracking-tighter uppercase italic mb-6">
            Case Studies <br />
            <span className="text-emerald-500">Under_Dev</span>
          </h1>

          <p className={`text-base md:text-xl font-bold uppercase italic leading-tight tracking-tight mb-8 md:mb-10 max-w-sm md:max-w-md mx-auto
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Currently documenting <span className={isDarkMode ? 'text-white' : 'text-black'}>Systeme.io builds</span>. 
          </p>

          {/* BUTTONS: Full width on mobile, side-by-side on desktop */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center items-center w-full max-w-xs mx-auto sm:max-w-none">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={onBackHome}
              className={`w-full sm:w-auto px-10 py-4 rounded-full font-black uppercase tracking-[0.1em] text-[10px] md:text-xs transition-all border
                ${isDarkMode 
                  ? 'border-white/20 text-white active:bg-white active:text-black' 
                  : 'border-black/20 text-black active:bg-black active:text-white'}`}
            >
              Coming Soon!
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://calendly.com/jvbenitez404/discovery-call-with-jay', '_blank')}
              className="w-full sm:w-auto px-10 py-4 rounded-full font-black uppercase tracking-[0.1em] text-[10px] md:text-xs bg-emerald-500 text-black transition-all shadow-lg active:bg-emerald-400"
            >
              Book a Call
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* --- MARQUEE BANNER: Optimized for Mobile speed and visibility --- */}
      <div className="relative w-full py-6 md:py-10 overflow-hidden border-y bg-[#0a0a0a] border-white/10 z-20">
        <motion.div 
          className="flex whitespace-nowrap items-center"
          variants={marqueeVariants}
          animate="animate"
        >
          {/* Using 2 sets with 50% translation is the most stable way to loop */}
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className="mx-6 md:mx-12 font-black uppercase text-[10vw] md:text-[3vw] tracking-tighter italic text-white/90">
                    Contact Me
                  </span>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white"></div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* VERSION LOG - Hidden on very small screens to avoid clutter */}
      <div className="hidden sm:block absolute bottom-2 left-6 font-mono text-[8px] uppercase tracking-[0.4em] opacity-20 z-30">
        Build_Log_v2.0.26
      </div>
    </motion.div>
  );
};

export default Work;