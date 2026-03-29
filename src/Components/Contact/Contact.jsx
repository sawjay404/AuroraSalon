import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Send, CheckCircle2, Loader2, MapPin, Calendar } from 'lucide-react';

const Contact = ({ setIsFormOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    serviceType: 'Haircut & Styling',
    preferredDay: '', preferredTime: 'Morning (9AM - 12PM)',
    notes: ''
  });

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7trtXSK4sR3RBT2kVPsKOpUdYYyN4j4cLnpAqM34eTngzwlYdwCRYUs2BJ6ChQl1u/exec";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
    } catch (error) {
      alert("System busy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-[100] bg-[#050505] overflow-hidden">
      
      {/* --- BANNER (Always Visible) --- */}
      <div className="relative h-[45vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2000" 
            alt="Salon" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="relative z-10 text-center px-6 flex flex-col items-center"
        >
          <p className="text-pink-500 text-[11px] font-black uppercase tracking-[1em] mb-4">Reservations</p>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            Secure Your <span className="italic text-pink-500/80 font-light">Moment</span>
          </h2>

          {/* MOBILE BUTTON: Calls setIsFormOpen (openForm from App.jsx) */}
          <div className="md:hidden">
             <button 
              onClick={setIsFormOpen}
              className="flex items-center gap-3 bg-pink-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-lg shadow-pink-500/20 active:scale-95 transition-all"
            >
              <Calendar size={16} />
              Book Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* --- DESKTOP WRAPPER: HIDDEN ON MOBILE --- */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 pb-32 -mt-10 relative z-20">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Info */}
            <div className="w-full lg:w-4/12 space-y-12">
              <div className="space-y-4">
                <h3 className="text-white text-3xl font-serif italic">The Studio</h3>
                <p className="text-zinc-500 text-lg font-light leading-relaxed">Private sanctuary in the arts district. By appointment only.</p>
              </div>
              <div className="space-y-8">
                <ContactDetail label="Location" value="123 Aurora Blvd" icon={<MapPin size={18}/>} />
                <ContactDetail label="Direct Line" value="(555) 123-4567" icon={<Phone size={18}/>} />
                <ContactDetail label="Inquiries" value="concierge@aurora.com" icon={<Mail size={18}/>} />
              </div>
            </div>

            {/* Right: The Form */}
            <motion.div className="w-full lg:w-8/12">
              <div className="bg-zinc-900/40 border border-white/5 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DarkInput label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="ALEXA BLISS" required />
                        <DarkInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (000) 000" required />
                      </div>
                      <DarkInput label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="YOUR@EMAIL.COM" type="email" required />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DarkInput label="Arrival Date" name="preferredDay" value={formData.preferredDay} onChange={handleChange} type="date" min={today} required />
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-pink-500 block ml-1">Preferred Time</label>
                          <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-pink-500 transition-all font-serif italic text-xl appearance-none cursor-pointer">
                            <option>Morning (9AM - 12PM)</option>
                            <option>Afternoon (12PM - 5PM)</option>
                            <option>Evening (5PM - 8PM)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-pink-500 block ml-1">Select Ritual</label>
                        <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-pink-500 transition-all font-serif italic text-xl appearance-none cursor-pointer">
                          <option>Haircut & Styling</option>
                          <option>Full Color / Balayage</option>
                          <option>Highlights</option>
                          <option>Keratin Treatment</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-pink-500 block ml-1">Notes (Optional)</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special requests?" rows="3" className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-pink-500 transition-all font-serif italic text-xl resize-none" />
                      </div>

                      <button disabled={isLoading} className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.5em] text-[12px] hover:bg-pink-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 disabled:bg-zinc-800 group">
                        {isLoading ? <Loader2 className="animate-spin" size={24} /> : <>Confirm Inquiry <Send size={18} /></>}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 space-y-6">
                      <CheckCircle2 size={60} className="text-pink-500 mx-auto" strokeWidth={1} />
                      <h3 className="text-white text-4xl font-serif italic">It's a Date</h3>
                      <p className="text-zinc-400">Request received. Our concierge will contact you shortly.</p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-pink-500 text-[10px] font-black uppercase tracking-widest border-b border-pink-500/20 pb-1"
                      >
                        Send another request
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactDetail = ({ label, value, icon }) => (
  <div className="flex gap-5">
    <div className="text-pink-500/50">{icon}</div>
    <div>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 block mb-1">{label}</span>
      <p className="text-white font-serif italic text-xl">{value}</p>
    </div>
  </div>
);

const DarkInput = ({ label, type = "text", ...props }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-pink-500 block ml-1">{label}</label>
    <input {...props} type={type} className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-800 outline-none focus:border-pink-500 transition-all font-serif italic text-xl" style={{ colorScheme: 'dark' }} />
  </div>
);

export default Contact;