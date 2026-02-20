import React, { useEffect, useRef } from 'react';

// New data structure for portfolio projects (unchanged)
const portfolioData = [
  // Column 1: App Development
  [
    {
      id: "p1-1",
      image: "https://images.pexels.com/photos/38544/imac-apple-mockup-app-38544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Fintech Mobile App",
      description: "UX/UI Design & React Native Dev",
      url: "#case-study-1"
    },
    {
      id: "p1-2",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "SaaS Dashboard",
      description: "Frontend Architecture",
      url: "#case-study-2"
    },
    {
      id: "p1-3",
      image: "https://images.pexels.com/photos/205316/pexels-photo-205316.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Music Player App",
      description: "UI Concept & Prototyping",
      url: "#case-study-3"
    }
  ],
  // Column 2: Branding & Web
  [
    {
      id: "p2-1",
      image: "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "E-commerce Website",
      description: "Shopify & Headless CMS",
      url: "#case-study-4"
    },
    {
      id: "p2-2",
      image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Startup Brand Identity",
      description: "Logo, Style Guide & Web",
      url: "#case-study-5"
    },
    {
      id: "p2-3",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Corporate Landing Page",
      description: "Webflow Development",
      url: "#case-study-6"
    }
  ],
  // Column 3: Marketing & Social
  [
    {
      id: "p3-1",
      image: "https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Social Media Campaign",
      description: "Strategy & Content Creation",
      url: "#case-study-7"
    },
    {
      id: "p3-2",
      image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Real Estate Pitck Deck",
      description: "Presentation Design",
      url: "#case-study-8"
    },
    {
      id: "p3-3",
      image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Product Launch",
      description: "Marketing & Asset Design",
      url: "#case-study-9"
    }
  ]
];


const App = () => {
  const galleryRef = useRef(null);
  const colRefs = useRef([]);

  useEffect(() => {
    let cleanupFunc = () => {};
    
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                console.log(`${src} loaded successfully.`);
                resolve();
            };
            script.onerror = () => {
                console.error(`Script load error for ${src}`);
                reject(new Error(`Script load error for ${src}`));
            };
            document.head.appendChild(script);
        });
    };

    const initGsap = () => {
        if (typeof gsap === 'undefined') {
            console.error("GSAP is not defined after script load.");
            return;
        }

        if (!galleryRef.current) {
            console.warn("GSAP init failed: Gallery ref not ready.");
            return;
        }
        
        const cols = colRefs.current.filter(el => el != null);
        const allTweens = [];
        const allListeners = [];

        cols.forEach((col, i) => {
            const items = Array.from(col.children); 
            
            items.forEach((item) => {
                if (!item.parentElement) return;
                let columnHeight = item.parentElement.clientHeight;
                if (columnHeight === 0) {
                    console.warn("Column height is 0, skipping tween.");
                    return;
                }
                let direction = i % 2 !== 0 ? "+=" : "-=";
                const tween = gsap.to(item, {
                    y: direction + Number(columnHeight / 2),
                    duration: 35,
                    repeat: -1,
                    ease: "none",
                    modifiers: {
                        y: gsap.utils.unitize((y) => {
                            const ch = columnHeight * 0.5;
                            if (ch === 0) return y;
                            
                            if (direction === "+=") {
                                y = parseFloat(y) % ch;
                                if (y < 0) y += ch;
                                return y;
                            } else {
                                y = parseFloat(y) % -Number(ch);
                                if (y > 0) y -= ch;
                                return y;
                            }
                        })
                    }
                });
                allTweens.push(tween);

                const pauseAnim = () => tween.pause();
                const playAnim = () => tween.play();
                item.addEventListener('mouseenter', pauseAnim);
                item.addEventListener('mouseleave', playAnim);

                allListeners.push({ item, pause: pauseAnim, play: playAnim });
            });
        });

        cleanupFunc = () => {
            console.log("Cleaning up GSAP animations and listeners...");
            allTweens.forEach(tween => tween.kill());
            allListeners.forEach(({ item, pause, play }) => {
                item.removeEventListener('mouseenter', pause);
                item.removeEventListener('mouseleave', play);
            });
            if (window.ScrollTrigger) {
                window.ScrollTrigger.getAll().forEach(st => st.kill());
            }
        };
    };

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js")
        .then(initGsap)
        .catch(console.error);

    return () => {
      cleanupFunc();
    };

  }, []);

  const doubledPortfolioData = portfolioData.map(col => [
    ...col, 
    ...col.map(item => ({ ...item, id: `${item.id}-clone` }))
  ]);


  return (
    <section className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
            color: #111;
            overflow-x: hidden; 
          }

          .custom-shadow {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          
          .portfolio-overlay {
            /* FIX: Adjusted gradient for less gloominess */
            background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%);
            transition: opacity 0.3s ease-in-out;
          }
          
          .portfolio-item:hover .portfolio-text {
            opacity: 1;
            transform: translateY(0);
          }
          
          .portfolio-text {
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          }
        `}
      </style>

      <div 
        ref={galleryRef}
        className="gallery-container relative w-full h-[90vh] flex justify-center overflow-hidden rounded-lg"
      >
        {doubledPortfolioData.map((colProjects, i) => (
          <div
            key={i}
            className={`
              col flex flex-1 flex-col w-full
              ${i === 1 ? 'flex' : 'hidden md:flex'} 
            `}
            ref={el => colRefs.current[i] = el}
          >
            {colProjects.map((project) => (
              <a
                key={project.id} 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-item group relative block p-2 md:p-4 w-full"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  // FIX: Removed saturate-0, images are now full color
                  // Kept transition-all for scale effect
                  className="w-full h-auto object-cover custom-shadow rounded-md transition-all duration-300 group-hover:scale-105"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x600/3B82F6/ffffff?text=Image+Error"; }}
                />
                <div className="portfolio-overlay absolute inset-2 md:inset-4 rounded-md flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 pointer-events-none">
                  <div className="portfolio-text">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm text-gray-200">{project.description}</p>
                    <span className="mt-2 inline-block text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded-full">
                      View Case Study
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default App;