import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Receipt, Sparkles } from 'lucide-react';

const Services = ({ setIsFormOpen }) => {
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  // Updated: Prices are now numbers for the calculator math
  const services = [
    { id: '01', title: 'Precision Sculpting', price: 125, description: 'Architectural dry-cutting or wet-sculpting tailored to your bone structure.', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=1000' },
    { id: '02', title: 'Aurora Color', price: 240, description: 'Multi-dimensional hand-painted balayage or precision foiling.', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000' },
    { id: '03', title: 'Molecular Repair', price: 85, description: 'Deep-tissue hair repair using advanced bond-building technology.', image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1000' },
    { id: '04', title: 'Editorial Blow', price: 75, description: 'High-glamour blowout designed to last through your events.', image: 'https://images.unsplash.com/photo-1492102140294-8182912a2a1f?q=80&w=1000' }
  ];

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.find(s => s.id === service.id) 
        ? prev.filter(s => s.id !== service.id) 
        : [...prev, service]
    );
  };

  const totalPrice = selectedServices.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <section id="services" className="relative z-[100] bg-[#050505] py-24 lg:py-48 overflow-hidden">
      
      {/* Dynamic Background Reveal */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence mode='wait'>
          {hoveredService && (
            <motion.div
              key={hoveredService.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <img src={hoveredService.image} alt="" className="w-full h-full object-cover grayscale brightness-50" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16">
          <p className="text-pink-500 text-[10px] font-black uppercase tracking-[0.8em] mb-4">Investment Menu</p>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white leading-none">
            The <span className="italic font-extralight text-pink-500/80">Rituals</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 border-t border-white/10">
          {services.map((service, index) => {
            const isSelected = selectedServices.find(s => s.id === service.id);
            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredService(service)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => toggleService(service)}
                className={`group relative flex flex-col justify-between p-6 md:p-10 lg:p-16 border-b border-white/10 cursor-pointer transition-all duration-700 h-full ${index % 2 === 0 ? 'border-r' : ''} ${isSelected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}
              >
                <div className="flex-1">
                  <span className={`text-xs font-mono ${isSelected ? 'text-pink-500' : 'text-pink-500/30'}`}>{service.id}</span>
                  <h3 className={`text-2xl lg:text-5xl font-serif text-white mt-2 transition-all ${isSelected ? 'italic translate-x-2' : ''}`}>{service.title}</h3>
                </div>

                <div className="mt-12 flex items-end justify-between">
                  <div>
                    <span className="text-pink-500 text-[10px] font-black uppercase tracking-widest block mb-1">Starts at</span>
                    <span className="text-3xl lg:text-6xl font-serif text-white">${service.price}</span>
                  </div>
                  <div className={`flex w-12 h-12 lg:w-16 lg:h-16 rounded-full border items-center justify-center transition-all duration-500 ${isSelected ? 'bg-pink-500 border-pink-500 rotate-45' : 'border-white/10 group-hover:bg-white'}`}>
                    <Plus className={isSelected ? 'text-white' : 'text-white group-hover:text-black'} size={20} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Calculator Pop-up */}
        <AnimatePresence>
          {selectedServices.length > 0 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-md"
            >
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Receipt size={18} className="text-pink-500" />
                    <span className="text-white font-black uppercase tracking-tighter text-xs">Estimate</span>
                  </div>
                  <button onClick={() => setSelectedServices([])} className="text-zinc-500 hover:text-white"><X size={18} /></button>
                </div>
                
                <div className="pt-2 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">Total Investment</p>
                    <p className="text-3xl font-serif text-white">${totalPrice}</p>
                  </div>
                  
                  {/* BUTTON: Pass the selectedServices back to openForm */}
                  <button 
                    onClick={() => setIsFormOpen(selectedServices)}
                    className="bg-white text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-lg"
                  >
                    Book Rituals
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;