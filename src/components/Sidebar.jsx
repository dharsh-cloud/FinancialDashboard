import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  LogOut, 
  Wallet,
  Settings,
  MessageCircle,
  Shield,
  Bell
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useUIStore from '../store/useUIStore';

const Sidebar = () => {
  const { logout, user } = useAuthStore();
  const { activeTab, setActiveTab, setSupportOpen } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight, path: '/dashboard' },
    { id: 'insights', label: 'Insights', icon: PieChart, path: '/dashboard' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/dashboard' },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: Shield, path: '/admin' }] : []),
  ];

  const handleTabClick = (item) => {
    setActiveTab(item.id);
    if (location.pathname !== item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-950 border-r border-emerald-50 dark:border-emerald-900/30 hidden md:flex flex-col h-screen sticky top-0 transition-colors duration-300">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">FinDash</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative ${
              activeTab === item.id 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                : 'text-emerald-900/60 dark:text-emerald-100/60 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
              />
            )}
            <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
              activeTab === item.id ? 'text-white' : 'text-emerald-700/40 group-hover:text-emerald-600'
            }`} />
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-emerald-50 dark:border-emerald-900/30 space-y-2">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
            activeTab === 'settings' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
              : 'text-emerald-900/60 dark:text-emerald-100/60 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400'
          }`}
        >
          <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-white' : 'text-emerald-700/40'}`} />
          <span className="font-bold">Settings</span>
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all group font-bold text-sm"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">Logout</span>
        </button>
      </div>

      <div className="p-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-emerald-600/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-[10px] font-black text-emerald-900 dark:text-emerald-50 uppercase tracking-widest">WhatsApp Support</span>
            </div>
            <p className="text-[10px] text-emerald-700/60 dark:text-emerald-100/40 leading-relaxed font-bold">
              Need help? Chat with our experts directly on WhatsApp.
            </p>
            <button 
              onClick={() => setSupportOpen(true)}
              className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black rounded-xl transition-all shadow-md shadow-emerald-500/20 uppercase tracking-widest"
            >
              Chat Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
