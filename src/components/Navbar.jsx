import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Bell, User, ChevronDown, Shield, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useNotificationStore from '../store/useNotificationStore';
import useTransactionStore from '../store/useTransactionStore';
import useUIStore from '../store/useUIStore';
import ThemeToggle from './ThemeToggle';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const { user, setRole } = useAuthStore();
  const { notifications } = useNotificationStore();
  const { filters, setFilters } = useTransactionStore();
  const { setActiveTab } = useUIStore();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters({ search: value });
    
    if (value && location.pathname !== '/dashboard') {
      setActiveTab('transactions');
      navigate('/dashboard');
    }
  };

  const toggleRole = () => {
    const newRole = user?.role === 'admin' ? 'viewer' : 'admin';
    setRole(newRole);
  };

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-emerald-50 dark:border-emerald-900/30 flex items-center justify-between px-8 z-20 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700/40 dark:text-emerald-100/20 group-focus-within:text-emerald-600 transition-colors" />
          <input
            type="text"
            placeholder="Search transactions, insights..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all text-sm text-emerald-900 dark:text-emerald-50 placeholder:text-emerald-700/30 dark:placeholder:text-emerald-100/20 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-emerald-700/40 dark:text-emerald-100/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all group"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950 group-hover:scale-110 transition-transform animate-pulse"></span>
            )}
          </button>
          <NotificationDropdown 
            isOpen={isNotificationsOpen} 
            onClose={() => setIsNotificationsOpen(false)} 
          />
        </div>

        <div className="h-8 w-[1px] bg-emerald-50 dark:bg-emerald-900/30"></div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-black text-emerald-900 dark:text-emerald-50">{user?.name || 'Guest'}</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                {user?.role || 'VIEWER'}
              </span>
            </div>
          </div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <User className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
