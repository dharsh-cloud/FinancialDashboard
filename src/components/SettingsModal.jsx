import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, title, children, onSave, loading }) => {
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
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-emerald-900/20 overflow-hidden border border-emerald-100 dark:border-emerald-900/30 p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight uppercase">{title}</h3>
                <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest mt-1">Update your preferences</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-900/20 hover:text-emerald-600 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {children}
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-50 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={loading}
                className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
