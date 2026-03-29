import React, { useState, useEffect } from 'react';
import { Menu, X, User, ArrowRight, Instagram, Twitter, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setIsFormOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: 'Services', path: '#services' },
    { name: 'Gallery', path: '#gallery' },
    { name: 'Contact', path: '#contact' },
  ];

  // Helper for logo click
  const scrollToTop = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-[999] transition-all duration-500 ease-in-out ${
        (scrolled || isOpen) 
          ? 'py-4 bg-[#050505] border-b border-white/10' 
          : 'py-8 lg:py-10 bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        <div className="flex justify-between lg:grid lg:grid-cols-3 items-center relative z-[1001]">
          
          {/* LEFT: DESKTOP */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.slice(0, 2).map((link) => (
              <a 
                key={link.name} 
                href={link.path} 
                className="text-[14px] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-pink-500 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CENTER: LOGO */}
          <div 
            className="flex justify-start lg:justify-center cursor-pointer group"
            onClick={scrollToTop}
          >
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-serif tracking-[0.2em] text-white group-hover:text-pink-500 transition-colors duration-500 leading-none">
                AURORA
              </h1>
              <p className="text-[10px] md:text-[12px] tracking-[0.5em] text-pink-600 font-black mt-1.5 uppercase leading-none">
                Studios
              </p>
            </div>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center justify-end gap-4 md:gap-8">
            <a 
              href="#contact" 
              className="hidden lg:block text-[14px] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-pink-500 transition-all duration-300"
            >
              Contact
            </a>
            
            <button 
              onClick={() => navigate('/login')} 
              className="text-white/50 hover:text-white transition-colors p-2"
            >
              <User size={22} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => setIsFormOpen(true)}
              className="hidden sm:flex items-center gap-3 px-8 py-3.5 bg-white text-black text-[11px] font-black uppercase tracking-[0.15em] hover:bg-pink-600 hover:text-white transition-all duration-500 rounded-full group"
            >
              Book Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Mobile Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 hover:text-pink-500 transition-colors"
            >
              {isOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div 
        className={`fixed inset-0 bg-[#050505] z-[1000] flex flex-col transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center flex-grow px-8 pt-20">
          <div className="space-y-6">
            {['Home', 'Services', 'Gallery', 'Contact'].map((item, index) => (
              <a
                key={item}
                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block text-[12vw] font-serif italic text-white hover:text-pink-500 transition-all duration-500 transform ${
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 80 + 200}ms` }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="p-8 border-t border-white/5 bg-[#080808]">
           <div className="flex flex-col gap-6">
              <p className="text-pink-500 text-[10px] font-black tracking-[0.4em] uppercase">Follow the Glow</p>
              <div className="flex gap-6 text-white/40 mb-4">
                <Instagram size={24} className="hover:text-pink-500 transition-colors cursor-pointer" /> 
                <Twitter size={24} className="hover:text-pink-500 transition-colors cursor-pointer" /> 
                <Compass size={24} className="hover:text-pink-500 transition-colors cursor-pointer" />
              </div>
              <button 
                onClick={() => {setIsOpen(false); setIsFormOpen(true);}}
                className="w-full py-6 bg-pink-600 text-white font-black text-[13px] uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                Book Appointment <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;