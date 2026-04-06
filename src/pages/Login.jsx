import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Wallet, Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginAsViewer, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
  };

  const handleGuestAccess = () => {
    loginAsViewer();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: [0, -100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] relative z-10 border border-emerald-50 dark:border-emerald-900/30 shadow-2xl shadow-emerald-500/5"
      >
        <button 
          onClick={() => navigate('/')}
          className="absolute left-6 top-6 p-2.5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-900/20 hover:text-emerald-600 transition-all group"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30"
          >
            <Wallet className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-black text-emerald-900 dark:text-emerald-50 tracking-tighter">FinDash</h1>
          <p className="text-xs font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest mt-2">Premium Finance Management</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl mb-8 text-xs font-black uppercase tracking-widest text-center"
          >
            <div className="mb-2">{error}</div>
            {error.includes('failed') && (
              <div className="text-[8px] opacity-60 lowercase font-normal">
                Check Vercel logs for "Admin match failed" or "Body Keys"
              </div>
            )}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/20 dark:text-emerald-100/20 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-emerald-50/30 dark:bg-emerald-900/20 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all text-emerald-900 dark:text-emerald-50 font-bold placeholder:text-emerald-900/20 dark:placeholder:text-emerald-100/20"
                placeholder="admin@findash.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/20 dark:text-emerald-100/20 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-emerald-50/30 dark:bg-emerald-900/20 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all text-emerald-900 dark:text-emerald-50 font-bold placeholder:text-emerald-900/20 dark:placeholder:text-emerald-100/20"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-900/20 dark:text-emerald-100/20 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-emerald-50 dark:border-emerald-900/30 space-y-6">
          <p className="text-[10px] text-center text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest font-black">Access Options</p>
          <div className="space-y-4">
            <button
              onClick={handleGuestAccess}
              className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest text-[10px] hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition-all shadow-sm"
            >
              View Dashboard (Guest Mode)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
