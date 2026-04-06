import { create } from 'zustand';
import useNotificationStore from './useNotificationStore';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // We'll use axios directly here to avoid interceptor issues before login
      const { data } = await import('axios').then(m => m.default.post('/api/auth/login', { email, password }));
      localStorage.setItem('userInfo', JSON.stringify(data));
      set({ user: data, loading: false });
      
      useNotificationStore.getState().addNotification({
        title: 'Login Successful',
        message: `Welcome back, ${data.name}!`,
        type: 'success'
      });
      
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', loading: false });
      
      useNotificationStore.getState().addNotification({
        title: 'Login Failed',
        message: error.response?.data?.message || 'Invalid credentials',
        type: 'error'
      });
      
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('userInfo');
    set({ user: null });
    
    // Clear transactions store to ensure a clean state
    import('./useTransactionStore').then(m => {
      m.default.setState({ transactions: [] });
    });
    
    useNotificationStore.getState().addNotification({
      title: 'Logged Out',
      message: 'You have been successfully logged out.',
      type: 'info'
    });
  },

  setRole: (role) => {
    set((state) => {
      const newUser = { ...state.user, role };
      localStorage.setItem('userInfo', JSON.stringify(newUser));
      return { user: newUser };
    });
  },

  loginAsViewer: () => {
    const guestUser = {
      _id: 'guest_viewer_id',
      name: 'Guest Viewer',
      email: 'guest@findash.com',
      role: 'viewer',
      token: 'guest_token'
    };
    localStorage.setItem('userInfo', JSON.stringify(guestUser));
    set({ user: guestUser, loading: false, error: null });
    
    useNotificationStore.getState().addNotification({
      title: 'Guest Access Enabled',
      message: 'You are now viewing the dashboard in guest mode.',
      type: 'info'
    });
    
    return true;
  }
}));

export default useAuthStore;
