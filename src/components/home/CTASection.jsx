import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const CTASection = () => {
  const navigate = useNavigate();
  const { loginAsViewer } = useAuthStore();

  const handleGuestAccess = () => {
    loginAsViewer();
    navigate('/dashboard');
  };

  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-card dark:bg-slate-900 dark:border-emerald-900/30 rounded-[3rem] p-12 md:p-20 text-center border-emerald-500/20 overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-linear-to-br from-emerald-600/10 via-transparent to-teal-600/10 -z-10" />
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px]" />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ready to transform your finances?</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-slate-900 dark:text-emerald-50">
            Start Managing Your <br />
            <span className="gradient-text">Finances Today</span>
          </h2>
          
          <p className="text-emerald-700/70 dark:text-emerald-100/40 text-lg mb-12 max-w-2xl mx-auto font-medium">
            Join thousands of modern users who have already taken control 
            of their financial future. No hidden fees, just pure clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/40 flex items-center justify-center gap-2 group text-lg"
            >
              Admin Login <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleGuestAccess}
              className="w-full sm:w-auto px-10 py-5 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-black rounded-2xl transition-all flex items-center justify-center gap-2 group text-lg"
            >
              View Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
