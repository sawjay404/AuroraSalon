import React from "react";
import { 
  Phone, 
  Mail, 
  Sparkles, 
  Instagram, 
  Facebook, 
  ArrowUpRight,
  Award,
  Scissors
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // Replace with actual link
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.4000!2d120.9!3d14.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDE4JzAwLjAiTiAxMjDCsDU0JzAwLjAiRQ!5e0!3m2!1sen!2sph!4v123456789";

  return (
    <footer className="relative bg-[#050505] pt-16 md:pt-24 pb-12 px-6 overflow-hidden border-t border-white/5">
      {/* Texture & Glow */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
      <div className="absolute top-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-500/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- TOP SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles size={28} className="text-black md:w-8 md:h-8" />
              </div>
              <div className="leading-none text-left">
                <h1 className="text-3xl md:text-4xl font-serif italic text-white tracking-tighter">Aurora</h1>
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-pink-500 mt-1">Private Sanctuary</p>
              </div>
            </div>

            <p className="text-zinc-200 font-medium leading-relaxed text-lg md:text-xl italic font-serif max-w-md mx-auto lg:mx-0">
              "A bespoke hair experience designed for the modern individual. Where artistry meets ritual."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 pt-4">
              <ContactItem icon={<Phone size={18}/>} label="The Line" value="(555) 123-4567" />
              <ContactItem icon={<Mail size={18}/>} label="Inquiries" value="concierge@aurora.com" />
            </div>
          </div>

          {/* Luxury Map - Responsive Height Fix */}
          <div className="lg:col-span-7 w-full h-[250px] md:h-[350px] lg:h-[450px] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
              allowFullScreen=""
              loading="lazy"
              title="Aurora Location"
              className="relative z-0 scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            
            {/* Mobile-Optimized Status Label */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10 bg-[#080808]/90 backdrop-blur-xl border border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 shadow-2xl">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full" />
                  <div className="absolute w-2 h-2 bg-pink-500 rounded-full animate-ping" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-1">Status</span>
                  <span className="text-[11px] md:text-[13px] font-serif italic text-white tracking-wide leading-none">Accepting Bookings</span>
                </div>
            </div>
          </div>
        </div>

        {/* --- MIDDLE SECTION: QUICK LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 py-12 md:py-16 border-y border-white/10">
          <LinkGroup title="Navigation" items={['Home', 'Rituals', 'Gallery', 'Book']} />
          <LinkGroup title="Rituals" items={['Signature Color', 'Precision Cut', 'Balayage', 'Keratin Silk']} isSerif />
          
          <div className="space-y-6">
            <h4 className="text-[10px] md:text-[11px] font-black text-pink-500 uppercase tracking-[0.3em]">Social Ritual</h4>
            <div className="flex gap-3 md:gap-4">
              {[Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 md:w-14 md:h-14 bg-zinc-900 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:border-pink-500 transition-all group">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] md:text-[11px] font-black text-pink-500 uppercase tracking-[0.3em]">Accolades</h4>
            <div className="flex flex-col gap-4">
                <AccoladeItem icon={<Award size={18}/>} text="Master Colorist 2026" />
                <AccoladeItem icon={<Scissors size={18}/>} text="Luxe Stylist Certified" />
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">
            © {currentYear} AURORA HAIR STUDIO.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] hover:text-pink-500 transition-colors">Privacy</a>
            <a href="#" className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] hover:text-pink-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-components for cleaner code
const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 text-white justify-center lg:justify-start group">
    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:border-pink-500 transition-all">
      <span className="text-pink-500">{icon}</span>
    </div>
    <div className="flex flex-col text-left">
      <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{label}</span>
      <span className="font-serif italic text-lg md:text-xl group-hover:text-pink-500 transition-colors">{value}</span>
    </div>
  </div>
);

const LinkGroup = ({ title, items, isSerif }) => (
  <div className="space-y-6">
    <h4 className="text-[10px] md:text-[11px] font-black text-pink-500 uppercase tracking-[0.3em]">{title}</h4>
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item}>
          <a href="#" className={`${isSerif ? 'font-serif italic text-lg md:text-xl text-zinc-200' : 'text-[10px] font-black uppercase tracking-widest text-zinc-400'} hover:text-pink-500 transition-all flex items-center gap-2 group`}>
            {item} {!isSerif && <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const AccoladeItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-zinc-300 justify-center md:justify-start">
    <span className="text-pink-500">{icon}</span>
    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/80">{text}</span>
  </div>
);