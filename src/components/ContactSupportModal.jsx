import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mail, MessageCircle, Phone, CheckCircle2 } from 'lucide-react';

const ContactSupportModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const phoneNumber = '9965419230';
    const text = `*Subject:* ${formData.subject}\n\n*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success state
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ subject: '', message: '' });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/20 dark:bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl shadow-emerald-900/20 overflow-hidden border border-emerald-100 dark:border-emerald-900/30 p-8"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">Pro Support</h3>
                  <p className="text-emerald-600/70 dark:text-emerald-100/40 font-bold text-sm">Direct WhatsApp Support</p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-50 mb-2">Opening WhatsApp...</h4>
                  <p className="text-emerald-600/70 dark:text-emerald-100/40">You can now send your message directly to our support team.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20">
                      <div className="flex items-center gap-3 mb-1">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        <span className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-50/40 uppercase tracking-widest">Email</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-900 dark:text-emerald-50">support@findash.com</p>
                    </div>
                    <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20">
                      <div className="flex items-center gap-3 mb-1">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-50/40 uppercase tracking-widest">Phone</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-900 dark:text-emerald-50">9965419230</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-emerald-900/40 dark:text-emerald-50/40 uppercase tracking-widest mb-2 ml-1">Subject</label>
                      <input 
                        required
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                        className="w-full px-5 py-4 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-emerald-900 dark:text-emerald-50 placeholder:text-emerald-900/20 dark:placeholder:text-emerald-50/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-emerald-900/40 dark:text-emerald-50/40 uppercase tracking-widest mb-2 ml-1">Message</label>
                      <textarea 
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your issue or question..."
                        className="w-full px-5 py-4 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-emerald-900 dark:text-emerald-50 placeholder:text-emerald-900/20 dark:placeholder:text-emerald-50/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 uppercase tracking-widest"
                  >
                    <Send className="w-5 h-5" />
                    Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-emerald-400 hover:text-emerald-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactSupportModal;
