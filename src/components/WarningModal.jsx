import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

const WarningModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Proceed Anyway", showConfirm = true }) => {
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
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl shadow-emerald-900/20 overflow-hidden border border-emerald-100 dark:border-emerald-900/30 p-8"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              
              <h3 className="text-xl font-black text-emerald-900 dark:text-emerald-50 mb-2 tracking-tight uppercase">{title}</h3>
              <p className="text-sm font-bold text-emerald-900/40 dark:text-emerald-100/40 mb-8 leading-relaxed">{message}</p>
              
              <div className="flex gap-4 w-full">
                <button
                  onClick={onClose}
                  className={`flex-1 px-6 py-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-50 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all ${!showConfirm ? 'w-full' : ''}`}
                >
                  {showConfirm ? 'Cancel' : 'Close'}
                </button>
                {showConfirm && (
                  <button
                    onClick={async () => {
                      await onConfirm();
                      onClose();
                    }}
                    className="flex-1 px-6 py-4 rounded-2xl bg-amber-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                  >
                    {confirmText}
                  </button>
                )}
              </div>
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

export default WarningModal;
