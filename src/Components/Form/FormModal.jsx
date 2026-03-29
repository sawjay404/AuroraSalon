import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Sparkles, ChevronRight } from 'lucide-react';

const FormModal = ({ isOpen, setIsOpen }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    serviceType: 'Haircut & Styling',
    preferredDay: '', preferredTime: 'Morning (9AM - 12PM)',
    notes: ''
  });

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2hyprIowwG9xQkFaLO0wNmfjz1flHVgyGEuJYyeSixsSDX5ZmbamO28GPmJI5NqQX/exec";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Note: no-cors will always resolve successfully even if the script fails, 
      // unless there is a network error.
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("System busy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Wait for exit animation to finish before resetting state
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ 
        name: '', phone: '', email: '', 
        serviceType: 'Haircut & Styling', preferredDay: '', 
        preferredTime: 'Morning (9AM - 12PM)', notes: '' 
      });
    }, 400); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={handleClose} 
            className="absolute inset-0 bg-black/95 backdrop-blur-md" 
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 40 }} 
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#080808] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-y-auto max-h-[90vh] no-scrollbar"
          >
            <button 
              onClick={handleClose} 
              className="absolute top-8 right-8 text-white/50 hover:text-pink-500 transition-colors z-50 p-2"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <>
                <header className="mb-10 text-center">
                  <motion.div 
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    className="flex justify-center mb-4 text-pink-500"
                  >
                    <Sparkles size={32} />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-2 tracking-tight">
                    Private <span className="text-pink-500">Booking</span>
                  </h2>
                  <p className="text-white text-[10px] font-black tracking-[0.6em] uppercase opacity-60">
                    Experience the Aurora standard
                  </p>
                </header>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 block ml-1">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="ALEXA BLISS" className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:border-pink-500/50 transition-all font-medium" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 block ml-1">Phone</label>
                      <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+1 (000) 000" className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:border-pink-500/50 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 block ml-1">Email</label>
                      <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="YOUR@EMAIL.COM" className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:border-pink-500/50 transition-all font-medium" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 block ml-1">Arrival Date</label>
                      <input 
                        required name="preferredDay" value={formData.preferredDay} onChange={handleChange} 
                        type="date" min={today}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-pink-500/50 transition-all font-medium appearance-none" 
                        style={{ colorScheme: 'dark' }} // Built-in way to make date picker dark
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 block ml-1">Preferred Time</label>
                      <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-pink-500/50 transition-all font-medium cursor-pointer appearance-none">
                        <option value="Morning (9AM - 12PM)">Morning</option>
                        <option value="Afternoon (12PM - 5PM)">Afternoon</option>
                        <option value="Evening (5PM - 8PM)">Evening</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 block ml-1">Select Ritual</label>
                    <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-pink-500/50 transition-all font-medium cursor-pointer appearance-none">
                      <option>Haircut & Styling</option>
                      <option>Full Color / Balayage</option>
                      <option>Highlights</option>
                      <option>Keratin Treatment</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-[0.5em] text-[11px] hover:bg-pink-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 mt-4 disabled:bg-zinc-800 disabled:text-zinc-500 active:scale-[0.98] group"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>Confirm Request <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* --- SUCCESS STATE --- */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="py-12 text-center"
              >
                <div className="flex justify-center mb-8">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-20 h-20 border border-pink-500 rounded-full flex items-center justify-center text-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.2)]"
                  >
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                  </motion.div>
                </div>

                <h2 className="text-4xl font-serif italic text-white mb-4">
                  Request <span className="text-pink-500">Received</span>
                </h2>

                <p className="text-white/70 font-medium text-[15px] mb-10 max-w-sm mx-auto leading-relaxed px-4">
                  We’ve received your request! Our staff will reach out as soon as possible via 
                  <span className="text-white font-bold"> email, text, or call</span> to confirm. 
                  Please keep your lines open.
                </p>

                <button 
                  onClick={handleClose} 
                  className="px-10 py-4 border border-white/20 text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all active:scale-95"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FormModal;