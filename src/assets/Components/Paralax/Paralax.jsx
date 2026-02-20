import React, { useEffect, useRef } from 'react';

// Data for the three columns
const columnsData = [
  [
    "https://images.pexels.com/photos/10324713/pexels-photo-10324713.jpeg?cs=srgb&dl=pexels-taha-samet-arslan-10324713.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/10533885/pexels-photo-10533885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/10253213/pexels-photo-10253213.jpeg?cs=srgb&dl=pexels-beepin-10253213.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940",
  ],
  [
    "https://images.pexels.com/photos/10050979/pexels-photo-10050979.jpeg?cs=srgb&dl=pexels-%D0%B8%D0%BB%D1%8C%D1%8F-%D0%BF%D0%B0%D1%85%D0%BE%D0%BC%D0%BE%D0%B2-10050979.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/1128660/pexels-photo-1128660.jpeg?cs=srgb&dl=pexels-nur-andi-ravsanjani-gusma-1128660.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/9699293/pexels-photo-9699293.jpeg?cs=srgb&dl=pexels-lada-rezantseva-9699293.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940",
  ],
  [
    "https://images.pexels.com/photos/6405575/pexels-photo-6405575.jpeg?cs=srgb&dl=pexels-daria-sannikova-6405575.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/10162526/pexels-photo-10162526.jpeg?cs=srgb&dl=pexels-svetlana%F0%9F%8E%9E-10162526.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/4394807/pexels-photo-4394807.jpeg?cs=srgb&dl=pexels-woodysmedia-4394807.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940",
  ],
];

const App = () => {
  // FIX: Removed mainRef, no longer needed for ScrollTrigger
  const galleryRef = useRef(null); // Ref for the gallery container
  const colRefs = useRef([]);

  useEffect(() => {
    let cleanupFunc = () => {};
    
    // Function to load GSAP script from CDN
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

    // Function to initialize GSAP animations
    const initGsap = () => {
        if (typeof gsap === 'undefined') {
            console.error("GSAP is not defined after script load.");
            return;
        }

        // FIX: Removed ScrollTrigger registration and logic
        if (!galleryRef.current) {
            console.warn("GSAP init failed: Gallery ref not ready.");
            return;
        }
        
        // FIX: Simplified logic. No more scroll acceleration.
        const cols = colRefs.current.filter(el => el != null);
        const allTweens = [];

        cols.forEach((col, i) => {
            const images = Array.from(col.children);
            images.forEach((item) => {
                if (!item.parentElement) return;
                let columnHeight = item.parentElement.clientHeight;
                if (columnHeight === 0) {
                    console.warn("Column height is 0, skipping tween.");
                    return;
                }
                let direction = i % 2 !== 0 ? "+=" : "-=";
                const tween = gsap.to(item, {
                    y: direction + Number(columnHeight / 2),
                    duration: 25, // Adjusted duration for a smooth loop
                    repeat: -1,
                    ease: "none",
                    modifiers: {
                        y: gsap.utils.unitize((y) => {
                            const ch = columnHeight * 0.5;
                            if (ch === 0) return y;
                            
                            if (direction === "+=") {
                                // Moving DOWN
                                y = parseFloat(y) % ch;
                                if (y < 0) y += ch;
                                return y;
                            } else {
                                // Moving UP
                                y = parseFloat(y) % -Number(ch);
                                if (y > 0) y -= ch;
                                return y;
                            }
                        })
                    }
                });
                allTweens.push(tween);
            });
        });

        // FIX: Simplified cleanup function
        cleanupFunc = () => {
            console.log("Cleaning up GSAP animations...");
            allTweens.forEach(tween => tween.kill());
            // Defensively kill ScrollTriggers if any exist
            if (window.ScrollTrigger) {
                window.ScrollTrigger.getAll().forEach(st => st.kill());
            }
        };
    };

    // FIX: Only load GSAP, ScrollTrigger is not needed
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js")
        .then(initGsap) // Run our GSAP setup code
        .catch(console.error);

    return () => {
      cleanupFunc();
    };

  }, []); // Runs once on mount

  return (
    // FIX: Changed layout to be a simple, contained section.
    // This lives in the normal page flow and will not overlap other content.
    <section className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <style>
        {`
          /* Custom font is assumed to be available */
          body {
            font-family: 'Inter', sans-serif;
            color: #111;
            /* background: #eee; */ /* FIX: Removed background color */
            overflow-x: hidden; /* Prevents horizontal scroll */
          }
          
          /* FIX: Removed .main-title and .credit-text styles */

          .custom-shadow {
            box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
              0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
              0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
              0 100px 80px rgba(0, 0, 0, 0.12);
          }
        `}
      </style>

      {/* A simple title for the component */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-8 text-gray-800">
        Infinite Image Gallery
      </h1>

      {/* FIX: This is the main gallery container.
        - It is 'relative' so 'overflow-hidden' works.
        - 'h-[90vh]' makes it use 90% of the viewport height (it's big!).
        - 'overflow-hidden' is CRITICAL: it clips the images animating outside the box.
        - This component will scroll normally with the page.
      */}
      <div 
        ref={galleryRef}
        className="gallery-container relative w-full h-[90vh] flex justify-center overflow-hidden rounded-lg"
      >
        {columnsData.map((colImages, i) => (
          <div
            key={i}
            className={`
              col flex flex-1 flex-col w-full
              ${i === 1 ? 'flex' : 'hidden md:flex'} /* FIX: Responsive! Shows only middle col on mobile */
            `}
            ref={el => colRefs.current[i] = el}
          >
            {/* Render images twice for the seamless loop */}
            {colImages.map((src, index) => (
              <div key={`col-${i}-img-${index}`} className="image p-2 md:p-4 w-full">
                <img
                  src={src}
                  alt={`Gallery image ${i}-${index}`}
                  className="w-full h-auto object-cover transition duration-300 ease-out custom-shadow rounded-md filter saturate-0 hover:filter-none"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x600/3B82F6/ffffff?text=Image+Error"; }}
                />
              </div>
            ))}
            {colImages.map((src, index) => (
              <div key={`col-${i}-clone-${index}`} className="image p-2 md:p-4 w-full">
                <img
                  src={src}
                  alt={`Gallery image ${i}-${index} (clone)`}
                  className="w-full h-auto object-cover transition duration-300 ease-out custom-shadow rounded-md filter saturate-0 hover:filter-none"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x600/3B82F6/ffffff?text=Image+Error"; }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* FIX: Removed the 500vh section and all sticky/fixed elements.
        You can add other page content right here, and it will appear 
        below the gallery component without any overlap.
      */}
      
    </section>
  );
};

export default App;