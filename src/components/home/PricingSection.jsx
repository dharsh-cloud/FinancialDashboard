import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const plans = [
  {
    name: 'Starter',
    price: '0',
    desc: 'Perfect for individuals just starting their financial journey.',
    features: ['Basic Expense Tracking', 'Single Account', 'Monthly Reports', 'Community Support'],
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '19',
    desc: 'Advanced tools for serious financial management and growth.',
    features: ['Unlimited Transactions', 'Multiple Accounts', 'Real-time Insights', 'Priority Support', 'Custom Categories'],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: '49',
    desc: 'Complete solution for businesses and high-net-worth individuals.',
    features: ['Team Collaboration', 'API Access', 'Dedicated Manager', 'Advanced Security', 'Custom Integrations'],
    isPopular: false,
  },
];

const PricingSection = () => {
  const navigate = useNavigate();
  const { loginAsViewer } = useAuthStore();

  const handleGuestAccess = () => {
    loginAsViewer();
    navigate('/dashboard');
  };

  return (
    <section id="pricing" className="py-24 px-4 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-emerald-900 dark:text-emerald-50">Simple, Transparent Pricing</h2>
          <p className="text-emerald-700/70 dark:text-emerald-100/40 max-w-2xl mx-auto font-medium">
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass-card dark:bg-slate-900 dark:border-emerald-900/30 p-8 rounded-[2.5rem] border ${
                plan.isPopular ? 'border-emerald-500 shadow-2xl shadow-emerald-500/10' : 'border-emerald-500/10 dark:border-emerald-900/30'
              } flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-emerald-500/30">
                  <Zap className="w-3 h-3 fill-current" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-50 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-emerald-900 dark:text-emerald-50">${plan.price}</span>
                  <span className="text-emerald-700/40 dark:text-emerald-100/40 font-bold">/month</span>
                </div>
                <p className="mt-4 text-sm text-emerald-700/60 dark:text-emerald-100/40 font-medium leading-relaxed">
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm text-emerald-900/70 dark:text-emerald-100/60 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleGuestAccess}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                  plan.isPopular 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl shadow-emerald-500/30' 
                    : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
