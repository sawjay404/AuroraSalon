import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react'; 

const Portfolio = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Check for mobile to disable parallax offsets
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // PARALLAX CONTROLS (Only applied if not mobile)
  const y1 = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : -250]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : 250]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : -150]);
  const xWatermark = useTransform(smoothProgress, [0, 1], ["10%", "-30%"]);
  
  const bannerImgY = useTransform(smoothProgress, [0, 0.4], ["0%", "15%"]);

  const items = [
    { id: 1, url: '/Image2.jpg', category: 'Platinum', title: 'Nordic Ice' },
    { id: 2, url: 'https://images.pexels.com/photos/3746226/pexels-photo-3746226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Color', title: 'Sunset Copper' },
    { id: 3, url: 'https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Studio', title: 'The Lounge' },
    { id: 4, url: 'https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Balayage', title: 'Aurora Blend' },
    { id: 5, url: 'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Texture', title: 'Silk Waves' },
    { id: 6, url: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Cut', title: 'Modern Bob' },
  ];

  return (
    <section 
      id="gallery" 
      ref={containerRef} 
      className="relative isolate z-[100] bg-[#050505] pb-24 lg:pb-60 overflow-hidden"
    >
      {/* --- SECTION 1: BANNER --- */}
      <div className="relative h-[50vh] lg:h-[65vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: bannerImgY }} className="absolute inset-0 w-full h-full z-0">
          <img 
            src="https://images.pexels.com/photos/8467417/pexels-photo-8467417.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Main Banner" 
            className="w-full h-full object-cover opacity-40 block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent opacity-60 z-10"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-20 text-center px-6"
        >
          <div className="flex items-center justify-center gap-4 mb-4 lg:mb-6">
            <span className="h-[1px] w-8 lg:w-12 bg-pink-600"></span>
            <p className="text-pink-500 text-[10px] lg:text-[12px] font-black uppercase tracking-[0.6em] lg:tracking-[0.8em]">The Lookbook</p>
            <span className="h-[1px] w-8 lg:w-12 bg-pink-600"></span>
          </div>
          <h2 className="text-5xl lg:text-9xl font-serif text-white leading-tight lg:leading-none">
            Selected <span className="italic font-extralight text-pink-500/80">Works</span>
          </h2>
        </motion.div>
      </div>

      {/* --- SECTION 2: THE GALLERY GRID --- */}
      <div className="max-w-7xl mx-auto relative z-[110] px-4 md:px-6 -mt-16 lg:-mt-24">
        <div className="mb-16 lg:mb-32 border-l-2 border-pink-600/30 pl-6 lg:pl-8">
           <p className="text-pink-500 text-[11px] lg:text-[13px] font-black uppercase tracking-[0.5em] lg:tracking-[0.8em] mb-2 lg:mb-4">Visual Art</p>
           <h2 className="text-5xl lg:text-9xl font-serif text-white leading-none">
             The <span className="italic font-extralight opacity-80">Gallery</span>
           </h2>
        </div>

        {/* 2-Column Grid on Mobile, 3-Column on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-10 relative z-[120]">
          
          {/* Column 1 */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-4 lg:gap-10">
            <PortfolioItem data={items[0]} onPhotoClick={() => setSelectedImg(items[0])} />
            <PortfolioItem data={items[3]} onPhotoClick={() => setSelectedImg(items[3])} />
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-4 lg:gap-10 md:pt-40">
            <PortfolioItem data={items[1]} onPhotoClick={() => setSelectedImg(items[1])} />
            <PortfolioItem data={items[4]} onPhotoClick={() => setSelectedImg(items[4])} />
          </motion.div>

          {/* Column 3 (Hidden on mobile, merged into grid logic) */}
          <motion.div style={{ y: y3 }} className="flex flex-col gap-4 lg:gap-10 md:pt-20 col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1">
            <PortfolioItem data={items[2]} onPhotoClick={() => setSelectedImg(items[2])} />
            <PortfolioItem data={items[5]} onPhotoClick={() => setSelectedImg(items[5])} />
          </motion.div>
        </div>
      </div>

      {/* LIGHTBOX MODAL (Full Visibility Fix) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 lg:p-6 cursor-zoom-out"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white hover:text-pink-500 transition-colors">
              <X size={32} lg:size={48} strokeWidth={1.5} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()} 
            >
              <img 
                src={selectedImg.url} 
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl lg:rounded-2xl border border-white/10"
                alt={selectedImg.title}
              />
              <div className="mt-6 lg:mt-8 text-center">
                <h3 className="text-white text-3xl lg:text-5xl font-serif italic">{selectedImg.title}</h3>
                <p className="text-pink-500 text-[10px] lg:text-xs font-black uppercase tracking-[0.4em] mt-2 lg:mt-3">{selectedImg.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PortfolioItem = ({ data, onPhotoClick }) => (
  <div 
    className="group relative cursor-pointer overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] bg-zinc-900 border border-white/5 transition-all duration-500 hover:border-pink-600/30"
    onClick={(e) => {
      e.stopPropagation();
      onPhotoClick();
    }}
  >
    <img 
      src={data.url} 
      alt={data.title}
      className="w-full aspect-[4/5] lg:aspect-[2/3] object-cover transition-transform duration-[2000ms] group-hover:scale-105"
    />
    {/* Info Overlay - Scaled for mobile */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 lg:opacity-60 lg:group-hover:opacity-40 transition-opacity duration-700"></div>
    <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 lg:translate-y-4 lg:group-hover:translate-y-0">
       <span className="text-pink-500 text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.4em] mb-1">{data.category}</span>
       <div className="flex justify-between items-end">
          <h4 className="text-white text-lg lg:text-3xl font-serif italic leading-none">{data.title}</h4>
          <Maximize2 className="text-white/50 hidden lg:block" size={20} strokeWidth={1} />
       </div>
    </div>
  </div>
);

export default Portfolio;