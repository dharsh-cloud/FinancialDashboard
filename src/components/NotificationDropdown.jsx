import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, Trash2, Info, CheckCircle, AlertCircle, X } from 'lucide-react';
import useNotificationStore from '../store/useNotificationStore';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-rose-500" />;
      default: return <Info className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-3xl border border-emerald-50 dark:border-emerald-900/30 shadow-2xl shadow-emerald-500/10 z-40 overflow-hidden"
          >
            <div className="p-6 border-b border-emerald-50 dark:border-emerald-900/30 flex items-center justify-between bg-emerald-50/30 dark:bg-emerald-900/10">
              <div>
                <h4 className="text-sm font-black text-emerald-900 dark:text-emerald-50 uppercase tracking-widest">Notifications</h4>
                <p className="text-[10px] font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">
                  {unreadCount} Unread Messages
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={markAllAsRead}
                  className="p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 transition-all"
                  title="Mark all as read"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button 
                  onClick={clearNotifications}
                  className="p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 transition-all"
                  title="Clear all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                <div className="divide-y divide-emerald-50 dark:divide-emerald-900/30">
                  {notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-4 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-colors cursor-pointer relative group ${!n.read ? 'bg-emerald-50/10 dark:bg-emerald-900/5' : ''}`}
                    >
                      {!n.read && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600" />
                      )}
                      <div className="flex gap-3">
                        <div className="mt-1">{getIcon(n.type)}</div>
                        <div className="flex-1">
                          <p className={`text-xs font-black ${n.read ? 'text-emerald-900/60 dark:text-emerald-50/60' : 'text-emerald-900 dark:text-emerald-50'}`}>
                            {n.title}
                          </p>
                          <p className="text-[11px] text-emerald-900/40 dark:text-emerald-100/40 font-medium mt-0.5 leading-relaxed">
                            {n.message}
                          </p>
                          <p className="text-[9px] font-black text-emerald-900/20 dark:text-emerald-100/20 uppercase tracking-widest mt-2">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-6 h-6 text-emerald-900/20 dark:text-emerald-100/10" />
                  </div>
                  <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">No notifications</p>
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 bg-emerald-50/30 dark:bg-emerald-900/10 border-t border-emerald-50 dark:border-emerald-900/30 text-center">
                <button 
                  onClick={onClose}
                  className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest hover:underline"
                >
                  Close Panel
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
