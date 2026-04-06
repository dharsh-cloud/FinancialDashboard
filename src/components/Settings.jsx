import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Globe, 
  Lock,
  CreditCard,
  Mail,
  Smartphone,
  Check,
  ChevronRight
} from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useNotificationStore from '../store/useNotificationStore';
import SettingsModal from './SettingsModal';

const Settings = () => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    pushNotifications: true,
    emailReports: true,
    privacyMode: false
  });

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addNotification({
      title: 'Settings Updated',
      message: `Your ${activeModal?.label || 'settings'} have been successfully updated.`,
      type: 'success',
      icon: Check
    });
    
    setLoading(false);
    setActiveModal(null);
  };

  const sections = [
    {
      title: 'Account Settings',
      description: 'Manage your personal information and security',
      items: [
        { id: 'profile', icon: User, label: 'Profile Information', description: 'Update your name, email, and avatar', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { id: 'password', icon: Lock, label: 'Password & Security', description: 'Change your password and enable 2FA', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { id: 'privacy', icon: Shield, label: 'Privacy Preferences', description: 'Control how your data is shared', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
      ]
    },
    {
      title: 'Notifications',
      description: 'Choose what updates you want to receive',
      items: [
        { id: 'push', icon: Bell, label: 'Push Notifications', description: 'Real-time alerts for transactions', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
        { id: 'email', icon: Mail, label: 'Email Reports', description: 'Weekly and monthly financial summaries', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
      ]
    },
    {
      title: 'Preferences',
      description: 'Customize your dashboard experience',
      items: [
        { id: 'language', icon: Globe, label: 'Language & Region', description: 'English (US) - USD ($)', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        { id: 'accounts', icon: CreditCard, label: 'Linked Accounts', description: 'Manage your connected bank accounts', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
      ]
    }
  ];

  const renderModalContent = () => {
    switch (activeModal?.id) {
      case 'profile':
        return (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-emerald-900 dark:text-emerald-50 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-emerald-900 dark:text-emerald-50 font-bold"
              />
            </div>
          </>
        );
      case 'password':
        return (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-emerald-900 dark:text-emerald-50 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-emerald-50/30 dark:bg-emerald-900/10 border border-emerald-50 dark:border-emerald-900/30 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-emerald-900 dark:text-emerald-50 font-bold"
              />
            </div>
          </>
        );
      case 'push':
      case 'email':
        return (
          <div className="flex items-center justify-between p-6 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-3xl border border-emerald-50 dark:border-emerald-900/30">
            <div>
              <p className="text-sm font-black text-emerald-900 dark:text-emerald-50">Enable {activeModal.label}</p>
              <p className="text-[10px] font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Receive updates in real-time</p>
            </div>
            <button 
              onClick={() => setFormData({ ...formData, [activeModal.id === 'push' ? 'pushNotifications' : 'emailReports']: !formData[activeModal.id === 'push' ? 'pushNotifications' : 'emailReports'] })}
              className={`w-12 h-6 rounded-full transition-all relative ${formData[activeModal.id === 'push' ? 'pushNotifications' : 'emailReports'] ? 'bg-emerald-600' : 'bg-emerald-200 dark:bg-emerald-900/40'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData[activeModal.id === 'push' ? 'pushNotifications' : 'emailReports'] ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        );
      default:
        return <p className="text-center py-8 text-emerald-900/40 dark:text-emerald-100/40 font-bold uppercase tracking-widest text-xs">This feature is coming soon in the next update.</p>;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">Settings</h3>
          <p className="text-xs font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Customize your financial dashboard experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-emerald-50 dark:border-emerald-900/30 shadow-sm text-center">
            <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-black shadow-xl shadow-emerald-500/30">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h4 className="text-xl font-black text-emerald-900 dark:text-emerald-50">{user?.name || 'User'}</h4>
            <p className="text-xs font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest mt-1">{user?.role || 'Member'}</p>
            <div className="mt-6 pt-6 border-t border-emerald-50 dark:border-emerald-900/30 flex flex-col gap-2">
              <button 
                onClick={() => setActiveModal({ id: 'profile', label: 'Profile Information' })}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black rounded-xl transition-all shadow-md shadow-emerald-500/20 uppercase tracking-widest"
              >
                Edit Profile
              </button>
              <button className="w-full py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest">
                View Public Profile
              </button>
            </div>
          </div>

          <div className="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl shadow-emerald-500/20">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <Shield className="w-8 h-8 mb-4 opacity-50" />
              <h4 className="text-lg font-black mb-2">Pro Plan Active</h4>
              <p className="text-xs font-medium opacity-80 leading-relaxed mb-6">
                You have access to all premium features, unlimited accounts, and priority support.
              </p>
              <button className="w-full py-3 bg-white text-emerald-600 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest">
                Manage Subscription
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <div className="px-2">
                <h5 className="text-sm font-black text-emerald-900 dark:text-emerald-50 uppercase tracking-widest">{section.title}</h5>
                <p className="text-[10px] font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest mt-1">{section.description}</p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-emerald-50 dark:border-emerald-900/30 shadow-sm divide-y divide-emerald-50 dark:divide-emerald-900/30">
                {section.items.map((item, iIdx) => (
                  <button 
                    key={iIdx}
                    onClick={() => setActiveModal(item)}
                    className="w-full flex items-center justify-between p-6 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${item.bg} ${item.color} transition-transform group-hover:scale-110`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-emerald-900 dark:text-emerald-50">{item.label}</p>
                        <p className="text-[10px] font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">{item.description}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ChevronRight className="w-4 h-4 text-emerald-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SettingsModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={activeModal?.label || 'Settings'}
        onSave={handleSave}
        loading={loading}
      >
        {renderModalContent()}
      </SettingsModal>
    </div>
  );
};

export default Settings;

