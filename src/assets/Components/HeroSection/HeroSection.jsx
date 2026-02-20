import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Menu, X } from 'lucide-react';

// --- Spline Component ---
// Loads the required script and renders the custom web component
const Spline = ({ scene }) => {
  const [loaded, setLoaded] = useState(false);

  // Use useEffect to load the necessary external script only once
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('spline-viewer-script')) {
      const script = document.createElement('script');
      script.id = 'spline-viewer-script';
      script.type = 'module';
      // URL specified by the user's request
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.90/build/spline-viewer.js';
      script.onerror = () => console.error('Spline script failed to load');
      document.head.appendChild(script);
    }
  }, []); // Run once on component mount

  // Render the custom web component
  return (
    <div 
      className="absolute inset-0 z-0"
      // Fallback style until the 3D scene loads
      style={{ backgroundColor: '#010118' }}
    >
      {!loaded && <div className="absolute inset-0 flex items-center justify-center">Loading 3D Scene...</div>}
      {/* This custom element relies on the script loaded above. */}
      <spline-viewer 
        url={scene} 
        style={{ width: '100%', height: '100%' }}
        on:load={() => setLoaded(true)}
      />
    </div>
  );
};


// --- Global CSS Styles (Including Banner Animations and Theme Classes) ---
const GlobalStyles = () => (
  <style>{`
    @keyframes ticker {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    .animate-ticker {
      animation: ticker 40s linear infinite;
      will-change: transform;
    }
    
    @keyframes ticker-slow {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    .animate-ticker-slow {
      animation: ticker-slow 80s linear infinite;
      will-change: transform;
    }

    footer:hover .animate-ticker-slow,
    footer:hover .animate-ticker {
      animation-play-state: paused;
    }

    .vertical-text-open {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
    }
    
    /* Custom toggle switch */
    .toggle-switch {
      width: 44px;
      height: 24px;
      background-color: #4B5563; /* gray-600 */
      border-radius: 9999px;
      position: relative;
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;
    }
    .toggle-switch-dark {
      background-color: #D1D5DB; /* gray-300 */
    }
    .toggle-knob {
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 9999px;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform 0.2s ease-in-out;
    }
    .toggle-knob-toggled {
      transform: translateX(20px);
    }

    /* Global Theme Classes (Applied to body via JS) */
    .dark-mode {
       background-color: #000;
    }
    .light-mode {
       background-color: #f3f4f6;
    }
  `}</style>
);

// --- Header Component ---
const Header = ({ isDarkMode, onToggle, isNavOpen, onNavToggle }) => {
  // Update body classes whenever theme mode changes
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <header className={`${isDarkMode ? 'bg-gray-900/95' : 'bg-[#111926]/95'} text-white p-4 w-full transition-colors duration-300 z-20 sticky top-0`}>
      {/* Top row: Logo + Icons */}
      <div className="flex justify-between items-center w-full mb-2">
        <div className="text-xl font-bold">Hi, I'm Jay 👋</div>
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <div 
            role="switch"
            aria-checked={!isDarkMode}
            tabIndex={0}
            className={`toggle-switch ${!isDarkMode ? 'toggle-switch-dark' : ''}`} 
            onClick={onToggle}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
          >
            <div className={`toggle-knob ${!isDarkMode ? 'toggle-knob-toggled' : ''}`}></div>
          </div>
          {/* Hamburger/X icon toggle */}
          <button 
            onClick={onNavToggle} 
            className="z-50"
            aria-label={isNavOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isNavOpen}
          >
            {isNavOpen ? (
              <X className="w-6 h-6 cursor-pointer" />
            ) : (
              <Menu className="w-6 h-6 cursor-pointer" />
            )}
          </button>
        </div>
      </div>
      {/* Bottom row: User Info */}
      <div>
        <h2 className="text-xl font-light">VA | Funnel Design | Web Design  | Philippines 👋</h2>
        </div>
    </header>
  );
};


const MobileNav = ({ onNavToggle, isDarkMode }) => (
  <nav 
    className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center space-y-8 backdrop-blur-md transition-all duration-300
      ${isDarkMode ? 'bg-black/95 text-white' : 'bg-white/95 text-black'}`}
    onClick={onNavToggle} // Closes if they click the background
  >
    {/* Navigation Links - Note the # targets */}
    <a href="#home" className="text-4xl font-black italic uppercase" onClick={onNavToggle}>Home</a>
    <a href="#services" className="text-4xl font-black italic uppercase" onClick={onNavToggle}>Services</a>
    <a href="#contact" className="text-4xl font-black italic uppercase" onClick={onNavToggle}>Contact Me</a>
  </nav>
);

// --- Main Content Area ---
const MainContent = ({ isDarkMode }) => (
  <main className={`flex-1 flex flex-col lg:flex-row w-full overflow-hidden transition-colors duration-300 
    ${isDarkMode ? 'bg-black/60 text-white' : 'bg-white text-black'} backdrop-blur-sm`}>
    
    {/* Left Text Content - Added items-center for mobile centering */}
    <div className="relative flex-1 flex flex-col justify-center items-center sm:items-start p-6 md:p-12 z-10 text-center sm:text-left">
      
      {/* OPEN TO WORK Banner - Hidden on very small screens to avoid overlap */}
      <div className={`hidden sm:block absolute top-0 left-0 -ml-2 mt-4 px-4 py-1 transform -rotate-90 origin-top-left font-bold tracking-[0.2em] text-[10px] 
      ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-600 text-white'}`}>
        <span>OPEN TO WORK</span>
      </div>
      
      {/* Headlines Container */}
      <div className="flex flex-col mt-10 lg:mt-0 w-full">
        {/* Line 1: Primary Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tighter uppercase italic">
          Funnel Builder <br />
          <span className="text-emerald-500">& Web Designer</span>
        </h1>

        {/* Line 2: Supporting Title */}
        <h2 className={`mt-2 text-2xl sm:text-4xl md:text-5xl font-black leading-[1.0] tracking-tighter uppercase italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Simple Systems That <br /> Actually Convert
        </h2>
        
        {/* Paragraph */}
        <p className={`text-base sm:text-lg md:text-xl font-bold max-w-xl mx-auto sm:mx-0 mt-6 leading-[1.2] tracking-tight
          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
          I build <span className={isDarkMode ? 'text-white' : 'text-black'}>Systeme.io funnels</span>. <br />
          I handle the tech, you focus on the sales.
        </p>

        {/* Fixed Button Group - Sleeker Thickness */}
<div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center sm:items-start justify-center sm:justify-start">
  <button 
    className="group relative w-full sm:w-auto px-10 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 bg-emerald-500 text-black shadow-[0_10px_20px_rgba(16,185,129,0.1)] hover:bg-emerald-400 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
    onClick={() => window.open('https://calendly.com/jvbenitez404/discovery-call-with-jay', '_blank')}
  >
    Hire Me <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>
  
  <button 
    onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
    className={`w-full sm:w-auto px-10 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider border-2 transition-all duration-300 flex items-center justify-center
    ${isDarkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-black hover:bg-black/5'}`}
  >
    View Work
  </button>
</div>
      </div>
    </div>


    {/* Right Image Content */}
<div className="relative flex-1 flex items-end justify-center pt-8 md:pt-0 min-h-[400px] md:min-h-0">
  <img
    src="/assets/Dp.png" 
    alt="Jay"
    className="w-auto h-[50vh] md:h-[70vh] max-w-full object-contain object-bottom relative z-10 transition-transform duration-700 hover:scale-105"
    loading="lazy"
    onError={(e) => { e.target.src = "/src/assets/Dp.png"; }} 
  />
  
  {/* Honors Banner */}
  <div className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-l-md font-semibold vertical-text-open tracking-widest text-[10px]
    ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} transition-colors duration-300 z-20`}>
    <span>Honors</span>
  </div>
</div>
  </main>
);

const AboutSection = ({ isDarkMode }) => {
  return (
    <section 
      className={`relative w-full overflow-hidden transition-colors duration-500 pt-0 pb-6 
        ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      
      {/* 1. WELCOME BANNER - Deep Gradient to Neutral Grey */}
      <div className={`relative overflow-hidden py-24 border-t border-b transition-colors duration-500
        ${isDarkMode 
          ? 'bg-gradient-to-b from-black via-[#050505] to-[#0a0a0a] border-white/5' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-100 border-black/5'}`}>
        
        {/* Subtle Scanline Effect - Opacity adjusts for theme */}
        <div className={`absolute inset-0 bg-[size:100%_4px] pointer-events-none
          ${isDarkMode 
            ? 'bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]' 
            : 'bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.02)_50%,transparent_100%)]'}`}>
        </div>

        <div className="flex animate-ticker-slow whitespace-nowrap">
          <div className="font-black uppercase text-[12vw] leading-none tracking-tighter italic">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={`mx-12 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Welcome!
              </span>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="font-black uppercase text-[12vw] leading-none tracking-tighter italic">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={`mx-12 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                Welcome!
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SERVICES MARQUEE - Minimalist B&W with BIG BULLETS */}
      <div className={`relative w-full py-8 overflow-hidden border-y transition-colors duration-500
        ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-gray-100 border-black/10'}`}>
        
        <div className="flex animate-ticker whitespace-nowrap items-center">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center">
              {/* The Text */}
              <span className={`mx-12 font-black uppercase text-[3vw] tracking-tighter italic
                ${isDarkMode ? 'text-white' : 'text-black'}`}>
                SERVICES
              </span>
              
              {/* BIG BULLET - Glowing in dark mode, solid in light mode */}
              <div className={`mx-4 w-3 h-3 rounded-full 
                ${isDarkMode 
                  ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                  : 'bg-black shadow-none'}`}>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};


// --- Footer Helper Components ---
const TickerItem = () => (
  <div className="flex items-center flex-shrink-0 mx-8">
    <span className="text-xs font-semibold">GET IN TOUCH</span>
    <Mail className="w-3 h-3 ml-2" />
  </div>
);

const TickerContent = () => (
  <>
    <TickerItem />
    <TickerItem />
    <TickerItem />
    <TickerItem />
    <TickerItem />
    <TickerItem />
    <TickerItem />
    <TickerItem />
    <TickerItem />
    <TickerItem />
  </>
);

// --- Combined CaseStudies & Tags Component with Large stars ---
const CaseStudies = ({ isDarkMode }) => {
  const items = [
    {
      id: 1,
      type: 'case-study',
      title: 'Complexity at Work',
      description: 'Explore these three distinct case studies to see how I can help you.',
      image: '/src/assets/lupa.jpg',
    },
    {
      id: 2,
      type: 'testimonial',
      stars: 5,
      description: '"He brings creative ideas to life with precision and care..."',
      image: '/src/assets/Dave.png',
    },
    {
      id: 'tags-1',
      type: 'tags',
      groups: [
        ['Design', 'UI/UX'],
        ['Dev', '3D'],
        ['Motion', 'More +']
      ]
    },
    {
      id: 3,
      type: 'case-study',
      title: 'Next Gen UI',
      description: 'Pushing the boundaries of modern web interfaces.',
      image: '/src/assets/shaibel.jpg',
    },
    {
      id: 4,
      type: 'testimonial',
      stars: 5,
      description: '"The attention to detail in the 3D work was incredible."',
      image: '/src/assets/beach.jpg',
    },
    {
      id: 'tags-2',
      type: 'tags',
      groups: [
        ['React', 'Tailwind'],
        ['Spline', 'Funnels'],
        ['SEO', 'Growth']
      ]
    }
  ];

  // Helper to render stars
  const renderStars = (count) => {
    return (
      <div className="flex space-x-0.5 ml-3">
        {[...Array(count)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-row items-center space-x-8 p-6"> {/* Increased container spacing */}
      {items.map((item) => {
        // 1. RENDER TAGS (The updated section)
        if (item.type === 'tags') {
          return (
            <div key={item.id} className="flex-shrink-0 flex space-x-4 px-6">
              {item.groups.map((group, idx) => (
                <div key={idx} className="flex flex-col space-y-3"> {/* Vertical gap between tags */}
                  {group.map((tag) => (
                    <span 
                      key={tag}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border
                        ${isDarkMode 
                          ? 'bg-gray-800 text-white border-gray-700 shadow-lg' 
                          : 'bg-white text-gray-800 border-gray-200 shadow-sm'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          );
        }

        // 2. RENDER CARDS (Case Study or Testimonial)
        return (
          <div 
            key={item.id}
            className={`flex-shrink-0 p-4 rounded-2xl w-56 text-xs border transition-colors duration-300 
              ${isDarkMode ? 'bg-gray-900/80 border-gray-800 text-white' : 'bg-white/90 border-gray-200'}`}
          >
            {/* Header Area for Card */}
            <div className={`flex items-center mb-3 ${item.type === 'case-study' ? 'flex-col items-start' : 'flex-row'}`}>
              <img
                src={item.image}
                alt=""
                className={`object-cover ${
                  item.type === 'testimonial' ? 'rounded-full w-12 h-12 border-2 border-emerald-500/20' : 'rounded-lg w-full h-24 mb-2'
                }`}
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/200x100?text=Project"; 
                }}
              />
              {item.type === 'testimonial' && renderStars(item.stars)}
            </div>

            {item.title && <h4 className="font-bold mb-1 text-sm tracking-tight">{item.title}</h4>}
            
            <p className={`mb-3 text-[11px] leading-snug italic ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {item.description}
            </p>

            {item.type === 'case-study' ? (
              <button className="flex items-center justify-center w-8 h-8 bg-emerald-500 text-white rounded-full hover:bg-emerald-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center space-x-1 pt-1 border-t border-gray-100/10">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span className="text-emerald-500 font-bold text-[9px] uppercase tracking-widest">Verified Client</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// --- Updated Footer Content ---
const MainFooterContent = ({ isDarkMode }) => (
  // We only need one call here now because the tags are inside CaseStudies
  <CaseStudies isDarkMode={isDarkMode} />
);


// --- Main Hero Component (Renamed from App to HeroSection) ---
export default function HeroSection({ isDarkMode, toggleDarkMode }) {
  // We removed the [isDarkMode, setIsDarkMode] from here 
  // because it now comes from App.jsx as a prop!
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const splineSceneUrl = "https://prod.spline.design/0eBTLc0gtuuH5PxE/scene.splinecode";

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden font-sans relative ${isDarkMode ? 'dark text-white' : 'text-black'}`}>
      <GlobalStyles />
      
      <Spline 
        scene={splineSceneUrl} 
        className="absolute inset-0 z-0" 
      />
      
      <div className="relative z-10 flex flex-col h-full w-full">
        <Header 
          isDarkMode={isDarkMode} 
          onToggle={toggleDarkMode} // This uses the function from App.jsx
          isNavOpen={isNavOpen}
          onNavToggle={() => setIsNavOpen(!isNavOpen)}
        />
        
        <MainContent isDarkMode={isDarkMode} />
        
        {isNavOpen && <MobileNav onNavToggle={() => setIsNavOpen(!isNavOpen)} isDarkMode={isDarkMode} />}

        <footer className={`border-t w-full transition-colors duration-300 
          ${isDarkMode ? 'bg-black/80 text-white border-gray-700' : 'bg-gray-50/90 text-black border-gray-200'} backdrop-blur-sm`}>
          
          <div className={`w-full overflow-hidden border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-900' : 'border-gray-200'}`}>
            <div className="flex w-max animate-ticker-slow">
              <div className="flex flex-shrink-0">
                <MainFooterContent isDarkMode={isDarkMode} />
              </div>
              <div className="flex flex-shrink-0">
                <MainFooterContent isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden py-1">
            <div className="flex w-max animate-ticker">
              <div className="flex flex-shrink-0">
                <TickerContent />
              </div>
              <div className="flex flex-shrink-0">
                <TickerContent />
              </div>
            </div>
          </div>
        </footer>
        
        <AboutSection isDarkMode={isDarkMode} /> 
      </div>
    </div>
  );
}
  