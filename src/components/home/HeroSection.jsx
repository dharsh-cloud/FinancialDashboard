import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Wallet, Shield, Zap, Coins, TrendingUp } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import useTransactionStore from '../../store/useTransactionStore';

const HeroSection = () => {
  const navigate = useNavigate();
  const { loginAsViewer, user } = useAuthStore();
  const { getSummary } = useTransactionStore();
  const summary = getSummary();

  const handleGuestAccess = () => {
    loginAsViewer();
    navigate('/dashboard');
  };

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white dark:bg-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-20 text-emerald-500/10 dark:text-emerald-400/5"
        >
          <Coins className="w-24 h-24" />
        </motion.div>
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-20 text-emerald-500/10 dark:text-emerald-400/5"
        >
          <TrendingUp className="w-32 h-32" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.5em] mb-6"
        >
          Home
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-8"
        >
          <Zap className="w-4 h-4" />
          <span>Next Generation Finance Management</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-emerald-50"
        >
          Smart Finance Dashboard <br />
          <span className="gradient-text">for Modern Users</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 dark:text-emerald-100/60 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Take control of your financial future with our premium dashboard. 
          Track expenses, analyze trends, and manage your wealth with 
          unprecedented clarity and style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 group"
          >
            Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={handleGuestAccess}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" /> View Dashboard
          </button>
        </motion.div>

        {/* Floating UI Elements */}
        <div className="hidden lg:block">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-20 top-40 glass-card dark:bg-slate-900 dark:border-emerald-900/30 p-4 rounded-2xl border-emerald-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 dark:text-emerald-100/40">Secure Data</p>
                <p className="text-sm font-bold text-slate-900 dark:text-emerald-50">AES-256 Encrypted</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-20 top-60 glass-card dark:bg-slate-900 dark:border-emerald-900/30 p-4 rounded-2xl border-amber-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 dark:text-emerald-100/40">Total Balance</p>
                <p className="text-sm font-bold text-slate-900 dark:text-emerald-50">
                  {user ? `$${summary.totalBalance.toLocaleString()}` : 'Live Tracking'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
