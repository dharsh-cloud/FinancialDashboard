import React from 'react';
import { Wallet, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 px-4 border-t border-emerald-50 dark:border-emerald-900/30 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">FinDash</span>
            </div>
            <p className="text-emerald-700/60 dark:text-emerald-100/40 text-sm leading-relaxed font-medium">
              Premium finance management for modern users. 
              Track, analyze, and grow your wealth with style.
            </p>
          </div>

          <div>
            <h4 className="text-emerald-900 dark:text-emerald-50 font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-emerald-700/60 dark:text-emerald-100/40 font-medium">
              <li><a href="#features" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Insights</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-emerald-900 dark:text-emerald-50 font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-emerald-700/60 dark:text-emerald-100/40 font-medium">
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-emerald-900 dark:text-emerald-50 font-bold mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/dharshini-shree-s/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/dharsh-cloud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-700/60 dark:text-emerald-100/40 font-medium">
              <Mail className="w-4 h-4" />
              <span>support@findash.com</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-50 dark:border-emerald-900/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-emerald-700/40 dark:text-emerald-100/20 text-xs font-bold">
            © 2026 FinDash Inc. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-emerald-700/40 dark:text-emerald-100/20 font-bold">
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
