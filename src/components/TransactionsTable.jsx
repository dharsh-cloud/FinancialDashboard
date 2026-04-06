import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import useTransactionStore from '../store/useTransactionStore';
import useAuthStore from '../store/useAuthStore';
import TransactionForm from './TransactionForm';
import ConfirmModal from './ConfirmModal';

const TransactionsTable = ({ limit }) => {
  const { getFilteredTransactions, filters, setFilters, deleteTransaction } = useTransactionStore();
  const { user } = useAuthStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const itemsPerPage = limit || 10;

  const transactions = getFilteredTransactions();
  const isAdmin = user?.role === 'admin';

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (t) => {
    setEditingTransaction(t);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await deleteTransaction(deletingId);
      setDeletingId(null);
    }
  };

  const getCategoryIcon = (category) => {
    // Simplified category icon logic
    return <Tag className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">Recent Transactions</h3>
          <p className="text-xs font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Manage and track your financial activities</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ type: e.target.value })}
            className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm text-emerald-900 dark:text-emerald-50 font-bold"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingTransaction(null);
              setIsFormOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-emerald-50 dark:border-emerald-900/30 shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-emerald-50 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-900/20">
                <th className="px-6 py-4 text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Transaction</th>
                <th className="px-6 py-4 text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 dark:divide-emerald-900/30">
              <AnimatePresence mode="popLayout">
                {paginatedTransactions.map((t, index) => (
                  <motion.tr
                    key={t._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${
                          t.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600'
                        }`}>
                          {t.type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-black text-emerald-900 dark:text-emerald-50">{t.title}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-900/40 dark:text-emerald-100/40">{t.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 w-fit">
                        <Tag className="w-3 h-3 text-emerald-600" />
                        <span className="text-[10px] font-black text-emerald-900/60 dark:text-emerald-100/60 uppercase tracking-widest">{t.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-emerald-900/40 dark:text-emerald-100/40 font-bold">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">{new Date(t.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-black ${
                        t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(t)}
                          className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(t._id)}
                          className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {transactions.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-emerald-900/20 dark:text-emerald-100/10" />
            </div>
            <p className="text-emerald-900/40 dark:text-emerald-100/40 font-black uppercase tracking-widest text-xs">No transactions found matching your filters.</p>
          </div>
        )}

        {!limit && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-emerald-50 dark:border-emerald-900/30 flex items-center justify-between bg-emerald-50/30 dark:bg-emerald-900/20">
            <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">
              Showing <span className="text-emerald-900 dark:text-emerald-50">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-emerald-900 dark:text-emerald-50">{Math.min(currentPage * itemsPerPage, transactions.length)}</span> of <span className="text-emerald-900 dark:text-emerald-50">{transactions.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-900/40 dark:text-emerald-100/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                      currentPage === i + 1 ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' : 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-900/40 dark:text-emerald-100/40'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-900/40 dark:text-emerald-100/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <TransactionForm 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)} 
            initialData={editingTransaction}
          />
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setDeletingId(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
      />
    </div>
  );
};

export default TransactionsTable;
