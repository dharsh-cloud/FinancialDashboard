import { create } from 'zustand';

const useUIStore = create((set) => ({
  activeTab: 'dashboard',
  isSupportOpen: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSupportOpen: (isOpen) => set({ isSupportOpen: isOpen }),
}));

export default useUIStore;
