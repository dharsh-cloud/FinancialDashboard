import { create } from 'zustand';
import api from '../services/api';
import useNotificationStore from './useNotificationStore';

const useTransactionStore = create((set, get) => ({
  transactions: [],
  loading: false,
  error: null,
  filters: {
    type: 'all',
    category: 'all',
    search: '',
  },

  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/transactions');
      set({ transactions: data, loading: false });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error('Fetch Transactions Error:', message, error.response?.data);
      set({ error: message, loading: false });
    }
  },

  addTransaction: async (transactionData) => {
    try {
      const { data } = await api.post('/transactions', transactionData);
      set((state) => ({ transactions: [data, ...state.transactions] }));
      
      useNotificationStore.getState().addNotification({
        title: 'Transaction Added',
        message: `Successfully added "${data.title}"`,
        type: 'success'
      });
      
      return true;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error('Add Transaction Error:', message, error.response?.data);
      set({ error: message });
      
      useNotificationStore.getState().addNotification({
        title: 'Error Adding Transaction',
        message: message,
        type: 'error'
      });
      
      return false;
    }
  },

  updateTransaction: async (id, transactionData) => {
    try {
      const { data } = await api.put(`/transactions/${id}`, transactionData);
      set((state) => ({
        transactions: state.transactions.map((t) => (t._id === id ? data : t)),
      }));
      
      useNotificationStore.getState().addNotification({
        title: 'Transaction Updated',
        message: `Successfully updated "${data.title}"`,
        type: 'success'
      });
      
      return true;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error('Update Transaction Error:', message, error.response?.data);
      set({ error: message });
      
      useNotificationStore.getState().addNotification({
        title: 'Error Updating Transaction',
        message: message,
        type: 'error'
      });
      
      return false;
    }
  },

  deleteTransaction: async (id) => {
    try {
      const transactionToDelete = get().transactions.find(t => t._id === id);
      await api.delete(`/transactions/${id}`);
      set((state) => ({
        transactions: state.transactions.filter((t) => t._id !== id),
      }));
      
      useNotificationStore.getState().addNotification({
        title: 'Transaction Deleted',
        message: `Successfully deleted "${transactionToDelete?.title || 'transaction'}"`,
        type: 'info'
      });
      
      return true;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error('Delete Transaction Error:', message, error.response?.data);
      set({ error: message });
      
      useNotificationStore.getState().addNotification({
        title: 'Error Deleting Transaction',
        message: message,
        type: 'error'
      });
      
      return false;
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },

  getFilteredTransactions: () => {
    const { transactions, filters } = get();
    return transactions.filter((t) => {
      const matchesType = filters.type === 'all' || t.type === filters.type;
      const matchesCategory = filters.category === 'all' || t.category === filters.category;
      
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        t.title.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower) ||
        t.amount.toString().includes(searchLower);
        
      return matchesType && matchesCategory && matchesSearch;
    });
  },

  getSummary: () => {
    const { getFilteredTransactions } = get();
    const filteredTransactions = getFilteredTransactions();
    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
      transactionCount: filteredTransactions.length,
    };
  },

  getTotalSummary: () => {
    const { transactions } = get();
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
      transactionCount: transactions.length,
    };
  },
}));

export default useTransactionStore;
