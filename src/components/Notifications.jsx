import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, Trash2, Info, CheckCircle, AlertCircle, Calendar, Clock } from 'lucide-react';
import useNotificationStore from '../store/useNotificationStore';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-6 h-6 text-emerald-500" />;
      case 'error': return <AlertCircle className="w-6 h-6 text-rose-500" />;
      default: return <Info className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">Notifications</h3>
          <p className="text-xs font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">
            Stay updated with your account activities
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl font-bold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
            Mark all as read
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearNotifications}
            disabled={notifications.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-xl font-bold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </motion.button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-50 dark:border-emerald-900/30 shadow-sm overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-emerald-50 dark:divide-emerald-900/30">
            <AnimatePresence mode="popLayout">
              {notifications.map((n, index) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => markAsRead(n.id)}
                  className={`p-6 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-colors cursor-pointer relative group ${!n.read ? 'bg-emerald-50/10 dark:bg-emerald-900/5' : ''}`}
                >
                  {!n.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-600" />
                  )}
                  <div className="flex gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      n.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 
                      n.type === 'error' ? 'bg-rose-50 dark:bg-rose-900/20' : 
                      'bg-emerald-50 dark:bg-emerald-900/20'
                    }`}>
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-base font-black ${n.read ? 'text-emerald-900/60 dark:text-emerald-50/60' : 'text-emerald-900 dark:text-emerald-50'}`}>
                          {n.title}
                        </p>
                        <div className="flex items-center gap-4 text-[10px] font-black text-emerald-900/20 dark:text-emerald-100/20 uppercase tracking-widest">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Today</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{n.time}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-emerald-900/40 dark:text-emerald-100/40 font-medium leading-relaxed max-w-3xl">
                        {n.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 text-emerald-900/20 dark:text-emerald-100/10" />
            </div>
            <h4 className="text-lg font-black text-emerald-900 dark:text-emerald-50 mb-2 uppercase tracking-widest">No notifications</h4>
            <p className="text-xs font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
