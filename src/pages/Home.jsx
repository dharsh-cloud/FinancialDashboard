import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Menu, X } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import StatsSection from '../components/home/StatsSection';
import Footer from '../components/home/Footer';
import AnimatedBackground from '../components/home/AnimatedBackground';
import MoneyAnimation from '../components/home/MoneyAnimation';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { loginAsViewer, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGuestAccess = () => {
    loginAsViewer();
    navigate('/dashboard');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30 transition-colors duration-300">
      <AnimatedBackground />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-emerald-500/10 dark:border-emerald-900/30 py-4' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          {/* Logo - Centered */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black text-emerald-900 dark:text-emerald-50 tracking-tighter">FinDash</span>
          </div>

          {/* Desktop Nav - Centered */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-black text-emerald-900 dark:text-emerald-100/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all uppercase tracking-[0.4em]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions - Absolute Right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => navigate('/login')}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black rounded-lg transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Toggle - Absolute Right */}
          <button 
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2 text-emerald-900 dark:text-emerald-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 border-b border-emerald-500/10 dark:border-emerald-900/30 overflow-hidden"
            >
              <div className="px-4 py-8 space-y-6">
                {navLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-bold text-emerald-900 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-400 uppercase tracking-widest transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-6 border-t border-emerald-500/10 dark:border-emerald-900/30 space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-widest">Theme</span>
                    <ThemeToggle />
                  </div>
                  <button 
                    onClick={handleGuestAccess}
                    className="w-full py-3 text-emerald-900/60 dark:text-emerald-100/40 font-bold uppercase tracking-widest text-[10px]"
                  >
                    View Dashboard
                  </button>
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl uppercase tracking-widest text-[10px]"
                  >
                    Admin Login
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <MoneyAnimation />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
