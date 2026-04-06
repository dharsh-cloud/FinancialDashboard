import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useNotificationStore from './useNotificationStore';

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        
        useNotificationStore.getState().addNotification({
          title: 'Theme Changed',
          message: `Switched to ${newTheme} mode`,
          type: 'info'
        });
        
        return { theme: newTheme };
      }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;
