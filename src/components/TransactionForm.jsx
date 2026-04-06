import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Plus, DollarSign, Type, Tag, Calendar } from 'lucide-react';
import useTransactionStore from '../store/useTransactionStore';
import useAuthStore from '../store/useAuthStore';
import WarningModal from './WarningModal';

const TransactionForm = ({ isOpen, onClose, initialData }) => {
  const { addTransaction, updateTransaction, getSummary, getTotalSummary } = useTransactionStore();
  const { user } = useAuthStore();
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: new Date(initialData.date).toISOString().split('T')[0],
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Warning logic: if expense amount > total income
    const summary = getTotalSummary();
    const isExpense = formData.type === 'expense';
    
    if (isExpense && formData.amount > summary.totalIncome && !isWarningOpen) {
      setIsWarningOpen(true);
      return;
    }

    const success = initialData 
      ? await updateTransaction(initialData._id, formData)
      : await addTransaction(formData);
    
    if (success) onClose();
  };

  const handleConfirmWarning = async () => {
    setIsWarningOpen(false);
    const success = initialData 
      ? await updateTransaction(initialData._id, formData)
      : await addTransaction(formData);
    
    if (success) onClose();
  };

  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Salary', 'Freelance', 'Investment', 'Other'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-emerald-950/20 dark:bg-black/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 relative z-10 border border-emerald-50 dark:border-emerald-900/30 shadow-2xl shadow-emerald-500/5"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">
              {initialData ? 'Edit Transaction' : 'New Transaction'}
            </h3>
            <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest mt-1">
              {initialData ? 'Update your transaction details' : 'Add a new record to your dashboard'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-900/20 hover:text-emerald-600 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Title</label>
            <div className="relative group">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/20 dark:text-emerald-100/20 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-emerald-900 dark:text-emerald-50 font-bold placeholder:text-emerald-900/20 dark:placeholder:text-emerald-100/10"
                placeholder="e.g. Monthly Rent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Amount</label>
              <div className="relative group">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/20 dark:text-emerald-100/20 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="w-full bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-emerald-900 dark:text-emerald-50 font-bold placeholder:text-emerald-900/20 dark:placeholder:text-emerald-100/10"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Type</label>
              <div className="flex p-1 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-2xl border border-emerald-50 dark:border-emerald-900/30">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    formData.type === 'income' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'text-emerald-900/40 dark:text-emerald-100/40 hover:text-emerald-600'
                  }`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    formData.type === 'expense' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'text-emerald-900/40 dark:text-emerald-100/40 hover:text-rose-600'
                  }`}
                >
                  Expense
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Category</label>
              <div className="relative group">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/20 dark:text-emerald-100/20 group-focus-within:text-emerald-600 transition-colors" />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-emerald-900 dark:text-emerald-50 font-bold appearance-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="dark:bg-slate-900">{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/20 dark:text-emerald-100/20 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-emerald-900 dark:text-emerald-50 font-bold"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 active:scale-[0.98] mt-6"
          >
            <Save className="w-5 h-5" />
            {initialData ? 'Update Transaction' : 'Create Transaction'}
          </button>
        </form>
      </motion.div>
      
      <WarningModal
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        onConfirm={handleConfirmWarning}
        showConfirm={true}
        title="High Expense Warning"
        message={`Warning: This expense amount ($${formData.amount.toLocaleString()}) exceeds your total income ($${getTotalSummary().totalIncome.toLocaleString()}). Your balance will become negative. Do you want to proceed?`}
      />
    </div>
  );
};

export default TransactionForm;
