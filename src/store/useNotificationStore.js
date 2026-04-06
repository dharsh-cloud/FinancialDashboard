import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  
  addNotification: (notification) => {
    set((state) => ({
      notifications: [
        {
          id: Date.now(),
          time: 'Just now',
          read: false,
          ...notification
        },
        ...state.notifications
      ]
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true }))
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  }
}));

export default useNotificationStore;
