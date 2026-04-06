import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, TrendingDown, Target, ShieldCheck, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

const BudgetOptimizationModal = ({ isOpen, onClose, suggestions, loading }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-emerald-100 dark:border-emerald-900/30 overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-emerald-50 dark:border-emerald-900/20 flex items-center justify-between bg-linear-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-600/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">AI Budget Optimization</h3>
                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-0.5">Personalized Financial Strategy</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-colors group"
            >
              <X className="w-6 h-6 text-emerald-900/40 dark:text-emerald-100/40 group-hover:text-emerald-600 transition-colors" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                  <Sparkles className="w-6 h-6 text-emerald-400 absolute -top-2 -right-2 animate-pulse" />
                </div>
                <p className="text-emerald-900/60 dark:text-emerald-100/60 font-bold animate-pulse">Analyzing your spending patterns...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30">
                    <TrendingDown className="w-5 h-5 text-emerald-600 mb-2" />
                    <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Potential Savings</p>
                    <p className="text-lg font-black text-emerald-900 dark:text-emerald-50">High</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30">
                    <Target className="w-5 h-5 text-amber-600 mb-2" />
                    <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Efficiency Score</p>
                    <p className="text-lg font-black text-emerald-900 dark:text-emerald-50">84/100</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Risk Level</p>
                    <p className="text-lg font-black text-emerald-900 dark:text-emerald-50">Low</p>
                  </div>
                </div>

                <div className="prose prose-emerald dark:prose-invert max-w-none">
                  <div className="markdown-body">
                    <Markdown>{suggestions}</Markdown>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 bg-emerald-50/50 dark:bg-emerald-900/10 border-t border-emerald-50 dark:border-emerald-900/20 flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
            >
              Apply Strategy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BudgetOptimizationModal;
