import React, { useState, useEffect } from 'react';

// Define the sentences for the sequence
const SENTENCES = [
  "Hi, I'm Jay.",
  "I love creating through Web Design, Video Editing, and Photo Editing.",
  "I’ve spent 3 years in Lead Generation and Sales, and I’m now diving deeper into Funnel and Web Designing",
  "Let's build something great together." // Added a final CTA for a cleaner transition
];

const App = () => {
  // scrollProgress tracks how far down the user has scrolled (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Function to calculate the normalized scroll progress (0 to 1)
    const handleScroll = () => {
      // document.documentElement.scrollHeight is the total height of the scrollable content
      // window.innerHeight is the height of the viewport
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress relative to the scrollable content area
      const currentScrollY = window.scrollY;
      const progress = Math.min(1, currentScrollY / scrollableHeight);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to calculate opacity for a given sentence index based on scroll position
  const getOpacity = (index) => {
    // We divide the total scroll progress space (0 to 1) into segments equal to the number of sentences.
    const segmentSize = 1 / SENTENCES.length; 
    
    // The target scroll point for this sentence to be fully visible (center of its segment)
    const targetCenter = (index + 0.5) * segmentSize; 
    
    // UPDATED: fadeRadius is 0.45 of the segment.
    const fadeRadius = 0.45 * segmentSize; 

    // Calculate the difference from the target center
    const difference = Math.abs(scrollProgress - targetCenter);
    
    // Opacity calculation: 1 when difference < fadeRadius, fades to 0 as difference approaches segmentSize/2
    let opacity = 1 - (difference / fadeRadius);
    
    // Clamp the opacity between 0 and 1
    return Math.max(0, Math.min(1, opacity));
  };
  
  // Renders the text with a specific phrase highlighted based on the sentence index
  const renderTextWithHighlight = (text, index) => {
    let highlightPhrase = '';
    
    // ONLY highlight the phrase in the first sentence (index === 0)
    if (index === 0) {
      highlightPhrase = "I'm"; // Highlighting "I'm" or "I am"
    }
    // All other sentences will have an empty highlightPhrase, causing them to be rendered entirely white.

    if (!highlightPhrase) return <span className="text-white">{text}</span>;

    // Use a regex to split the text based on the determined highlightPhrase
    const regex = new RegExp(`(${highlightPhrase})`, 'i');
    const parts = text.split(regex);

    return (
      <React.Fragment>
        {parts.map((part, i) => {
          if (part.toLowerCase() === highlightPhrase.toLowerCase()) {
            return (
              <span key={i} className="text-blue-500 font-medium">
                {part}
              </span>
            );
          }
          return <span key={i} className="text-white">{part}</span>;
        })}
      </React.Fragment>
    );
  };

  return (
    <div className="relative w-full">
      {/* Height h-[1600vh] for long scroll time. */}
      <div 
        className="flex items-start justify-center w-full h-[1600vh]" 
        style={{ backgroundColor: '#131313' }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center p-4">
          {SENTENCES.map((sentence, index) => {
            const opacity = getOpacity(index);
            const baseFontSize = 40; 
            
            return (
              <div
                key={index}
                className="absolute text-center transition-opacity duration-300 pointer-events-none"
                style={{
                  opacity: opacity,
                  // Optional: slight scale effect when fully visible
                  transform: `scale(${0.9 + 0.1 * opacity})`, 
                  fontSize: `${baseFontSize}px`, 
                }}
              >
                <p className="font-light tracking-widest leading-relaxed">
                  {/* Use the render function to apply the highlight */}
                  {renderTextWithHighlight(sentence, index)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <AboutSection isDarkMode={true} />

      {/* Tailwind and Custom utility classes */}
      <style>{`
        /* Keep all styling within the component for a single-file application */ 
      `}</style>
    </div>
  );
};

export default App;

// --- NEW About Section (Animated Banners) ---
const AboutSection = ({ isDarkMode }) => {
  return (
    // Conditional background and text color based on theme
    <section 
      className={`relative w-full overflow-hidden transition-colors duration-500 pt-0 pb-6 
        ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`
      }
    >
      
      {/* 1. Infinite Moving WELCOME - Text color changes based on theme */}
    
      {/* 2. Infinite Moving ABOUT Banner (Fixed accent color for high contrast) */}
      <div
        className="w-full bg-[#f54b22] py-4 overflow-hidden"
      >
        <div
          // Uses the faster animation and static black text
          className="inline-block whitespace-nowrap font-extrabold uppercase text-[2.5vw] text-black"
        >
          <span className="mx-4">Case Studies.</span>
          <span className="mx-4">Case Studies.</span>
          <span className="mx-4">Case Studies.</span>
          <span className="mx-4">Case Studies.</span>
          <span className="mx-4">Case Studies.</span>
          <span className="mx-4">Case Studies.</span>
          <span className="mx-4">Case Studies.</span>
          <span className="mx-4">Case Studies.</span>
        </div>
      </div>
    </section>
  );
};