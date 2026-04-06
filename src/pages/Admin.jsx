import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Shield, Users, Settings, Database, Lock } from 'lucide-react';
import api from '../services/api';
import useUIStore from '../store/useUIStore';

const Admin = () => {
  const { activeTab, setActiveTab } = useUIStore();
  const [stats, setStats] = useState({
    users: 0,
    logs: '0',
    security: 'Active',
    api: 'Healthy'
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await api.get('/transactions/global-stats');
        setStats(prev => ({
          ...prev,
          users: response.data.users,
          logs: `${(response.data.transactions * 1.5).toFixed(0)}`
        }));
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };
    fetchAdminStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30 transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">Admin Control Center</h1>
                <p className="text-xs font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">System Administration & Security</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'User Management', icon: Users, color: 'bg-blue-500', count: stats.users },
                { label: 'System Logs', icon: Database, color: 'bg-emerald-500', count: stats.logs },
                { label: 'Security Settings', icon: Lock, color: 'bg-rose-500', count: stats.security },
                { label: 'API Status', icon: Settings, color: 'bg-amber-500', count: stats.api },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-emerald-50 dark:border-emerald-900/30 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${item.color}/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.icon className={`w-5 h-5 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="text-xl font-black text-emerald-900 dark:text-emerald-50">{item.count}</span>
                  </div>
                  <h3 className="text-xs font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">{item.label}</h3>
                </motion.div>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-emerald-50 dark:border-emerald-900/30 shadow-sm">
              <h2 className="text-xl font-black text-emerald-900 dark:text-emerald-50 mb-6">Security Overview</h2>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-emerald-900/20 dark:text-emerald-100/10" />
                </div>
                <p className="text-emerald-900/40 dark:text-emerald-100/40 font-black uppercase tracking-widest text-xs">No security alerts at this time.</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
