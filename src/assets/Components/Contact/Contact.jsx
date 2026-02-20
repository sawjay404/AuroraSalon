import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

const Contact = ({ isDarkMode }) => {
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // Put your Web3Forms key here

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={`py-24 transition-colors duration-500 scroll-mt-20 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
                Let’s build your <br />
                <span className="text-emerald-500 underline decoration-1 underline-offset-8">Next Big Move</span>
              </h2>
              <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Bridge the gap between strategy and execution. Send a message and let's start the engine.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Mail size={20} /></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Email Me</p>
                    <p className="text-lg font-medium tracking-tight">jvbenitez404@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Animated Form Container */}
            <div className={`relative p-8 md:p-10 border rounded-2xl overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50 border-black/5 shadow-2xl'}`}>
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  // SUCCESS STATE
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                      <CheckCircle size={48} />
                    </div>
                    <h3 className="text-2xl font-black uppercase italic italic mb-2">Message Received</h3>
                    <p className="opacity-60 mb-8">System check: Stable. I'll get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="text-emerald-500 font-bold uppercase tracking-widest text-xs hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  // FORM STATE
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-widest opacity-70">Your Name</label>
                      <input type="text" name="name" required placeholder="John Doe" className={`w-full bg-transparent border-b-2 py-3 focus:outline-none focus:border-emerald-500 transition-colors ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-300 text-black'}`} />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-widest opacity-70">Work Email</label>
                      <input type="email" name="email" required placeholder="john@company.com" className={`w-full bg-transparent border-b-2 py-3 focus:outline-none focus:border-emerald-500 transition-colors ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-300 text-black'}`} />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-widest opacity-70">Message</label>
                      <textarea name="message" required rows="4" placeholder="Tell me about your project..." className={`w-full bg-transparent border-b-2 py-3 focus:outline-none focus:border-emerald-500 transition-colors resize-none ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-300 text-black'}`} />
                    </div>

                    <motion.button
                      disabled={status === "sending"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="group w-full flex items-center justify-center gap-3 bg-emerald-500 text-black px-8 py-4 font-black uppercase italic tracking-widest text-sm rounded-full transition-all hover:bg-emerald-400 disabled:opacity-50"
                    >
                      {status === "sending" ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>
                    {status === "error" && <p className="text-red-500 text-xs text-center">Connection error. Please try again.</p>}
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;