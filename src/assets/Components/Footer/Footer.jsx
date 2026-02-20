import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUp, Zap } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 transition-colors duration-500 border-t bg-gray-900/95 text-white border-white/5">
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center rounded-lg">
                < Zap size={18} className="text-black fill-current" />
              </div>
              <span className="text-xl font-black italic tracking-tighter uppercase">
                Jay <span className="text-emerald-500 italic">Benitez</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed mb-6 text-gray-400">
              Bridging the gap between high-level strategy and technical engineering. I build systems that convert traffic into predictable revenue.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Linkedin size={18} />, href: "#" },
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Github size={18} />, href: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="transition-colors text-gray-400 hover:text-emerald-400"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 opacity-50">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#home" className="hover:text-emerald-500 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-emerald-500 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-emerald-500 transition-colors">Contact Me</a></li>
            </ul>
          </div>

          {/* System Info / Back to Top */}
          <div className="flex flex-col justify-between items-start md:items-end">
             <div className="text-left md:text-right">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 opacity-50">System Status</h4>
                <div className="flex items-center gap-2 md:justify-end mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-mono tracking-tight uppercase">Core_Live: Stable</span>
                </div>
                <p className="text-[10px] font-mono opacity-40 uppercase">Build_Version: 2.0.4</p>
             </div>

             <motion.button 
               onClick={scrollToTop}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               className="mt-8 p-3 rounded-full border transition-all border-white/10 hover:bg-white/5 text-white"
             >
               <ArrowUp size={20} />
             </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6 border-white/5">
          
          <div className="text-[11px] font-mono tracking-widest opacity-40 uppercase">
            © {currentYear} // Jay Benitez
          </div>

          <div className="flex gap-8 text-[11px] font-mono tracking-widest opacity-40 uppercase">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy_Policy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms_of_Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;