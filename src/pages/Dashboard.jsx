import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import BalanceChart from '../components/BalanceChart';
import SpendingChart from '../components/SpendingChart';
import TransactionsTable from '../components/TransactionsTable';
import Insights from '../components/Insights';
import Notifications from '../components/Notifications';
import Settings from '../components/Settings';
import ContactSupportModal from '../components/ContactSupportModal';
import useTransactionStore from '../store/useTransactionStore';
import useAuthStore from '../store/useAuthStore';
import useUIStore from '../store/useUIStore';

const Dashboard = () => {
  const { fetchTransactions, loading } = useTransactionStore();
  const { user } = useAuthStore();
  const { activeTab, setActiveTab, isSupportOpen, setSupportOpen } = useUIStore();

  useEffect(() => {
    fetchTransactions();
    
    // Poll for updates every 30 seconds to keep data live
    const interval = setInterval(fetchTransactions, 30000);
    return () => clearInterval(interval);
  }, [fetchTransactions]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30 transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <SummaryCards />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <BalanceChart />
                  </div>
                  <div>
                    <SpendingChart />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  <TransactionsTable limit={5} />
                </div>
              </motion.div>
            )}

            {activeTab === 'transactions' && (
              <motion.div
                key="transactions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <TransactionsTable />
              </motion.div>
            )}

            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <Insights />
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <Notifications />
              </motion.div>
            )}
            
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <Settings />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <ContactSupportModal 
        isOpen={isSupportOpen} 
        onClose={() => setSupportOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
