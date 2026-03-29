import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Award, ShieldCheck, Clock, ThumbsUp } from 'lucide-react';

// --- INTEGRATED COUNTER COMPONENT ---
const Counter = ({ value, decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 100 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals);
      }
    });
  }, [springValue, decimals]);

  return <span ref={ref}>0</span>;
};

const About = () => {
  const stats = [
    { icon: <Award size={18} />, value: 5, suffix: "+", label: "Years", sub: "Mastery" },
    { icon: <ShieldCheck size={18} />, value: 100, suffix: "%", label: "Certified", sub: "Technicians" },
    { icon: <Clock size={18} />, value: 24, suffix: "/7", label: "Weekly", sub: "Precision" },
    { icon: <ThumbsUp size={18} />, value: 100, suffix: "%", label: "Guaranteed", sub: "Satisfaction" },
  ];

  return (
    // FIXED: Changed bg-white to bg-slate-50 (Slight Grey)
    <section id="about" className="py-16 md:py-40 bg-slate-50 overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
          
          {/* Left Side: Pool Image - FIXED Size for Mobile */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12"
          >
            {/* FIXED: Reduced rounded corners and border-width for mobile */}
            <div className="relative rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200" 
                alt="Luxury Pool" 
                // FIXED: Changed mobile height to 300px (from 500px)
                className="w-full h-[300px] md:h-[700px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#06b6d4] font-black uppercase tracking-[0.5em] text-[10px] block mb-4 md:mb-6">
                Redefining Maintenance
              </span>
              
              <h2 className="text-4xl md:text-8xl font-black text-slate-900 leading-[0.9] md:leading-[0.85] uppercase tracking-tighter mb-6 md:mb-10">
                WAVY IS <br />
                <span className="text-[#06b6d4]">Effortless.</span>
              </h2>
              
              <p className="text-slate-600 font-bold text-sm md:text-lg leading-relaxed max-w-xl mb-10 md:mb-12">
                We believe your pool should be a source of relaxation, not a second job. 
                Our team blends high-tech water analysis with precision care.
              </p>

              {/* Counting Stats Grid - Matching the 2x2 Style */}
              <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-slate-200 pt-10">
                {stats.map((item, idx) => (
                  <div key={idx} className="group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-5">
                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[#06b6d4] group-hover:bg-[#06b6d4] group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xl md:text-4xl font-black text-slate-900 tracking-tighter">
                        <Counter value={item.value} />{item.suffix} <span className="text-xs md:text-2xl">{item.label}</span>
                      </div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Founder Quote Card - FIXED Padding for Mobile */}
              <div className="mt-12 p-6 md:p-8 bg-slate-900 rounded-[2rem] md:rounded-[3rem] text-white flex flex-row items-center gap-4 md:gap-6 relative overflow-hidden">
                <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden border-2 border-[#06b6d4] rotate-3 shadow-xl">
                  <img 
                    src="https://i.pravatar.cc/150?u=jay" 
                    alt="Jay Benitez" 
                    className="w-full h-full object-cover grayscale" 
                  />
                </div>
                <div>
                  <p className="text-[11px] md:text-base font-medium italic text-slate-300 leading-tight">
                    "Crystal clear water and complete peace of mind for every homeowner."
                  </p>
                  <p className="mt-1 md:mt-2 font-black uppercase text-[#06b6d4] tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px]">
                    Jay Benitez — Founder
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;