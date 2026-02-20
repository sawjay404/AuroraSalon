import React from 'react';

const Work = ({ isDarkMode, onBackHome }) => {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-between transition-colors duration-300 relative overflow-hidden
      ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      {/* 1. Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] 
          ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-500/5'}`} />
      </div>

      {/* 2. Main Content (Centered) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6 pt-32 md:pt-40">
        {/* Status Badge with Inline SVG Timer */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-bold tracking-[0.2em] uppercase">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>Status: Building in Progress</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase italic mb-6">
          Case Studies <br />
          <span className="text-emerald-500">Coming Soon</span>
        </h1>

        <p className={`text-lg sm:text-xl font-bold uppercase italic leading-tight tracking-tight mb-10
          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          I'm currently documenting my latest <span className={isDarkMode ? 'text-white' : 'text-black'}>Systeme.io</span> builds. 
          Quality takes time.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={onBackHome}
            className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase italic tracking-wider transition-all
              ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            {/* Inline Arrow SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back Home
          </button>
          
          <button 
            onClick={() => window.open('https://calendly.com/jvbenitez404/discovery-call-with-jay', '_blank')}
            className="px-8 py-4 rounded-xl font-bold uppercase italic tracking-wider bg-emerald-500 text-black hover:bg-emerald-400 transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
          >
            Hire Me Now
          </button>
        </div>
      </div>

      {/* 3. Featured Projects Marquee (Bottom) */}
      <div className="relative w-full py-10 overflow-hidden border-y bg-[#0a0a0a] border-white/10 mt-20">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className="mx-12 font-black uppercase text-[6vw] md:text-[3vw] tracking-tighter italic text-white/40">
                    Featured Projects
                  </span>
                  <div className="mx-4 w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Version Tag */}
      <p className="absolute bottom-2 left-6 text-[8px] font-bold tracking-[0.3em] uppercase opacity-20">
        Log_v2.0.26
      </p>
    </div>
  );
};

export default Work;