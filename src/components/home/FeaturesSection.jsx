import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  PieChart, 
  Users, 
  Smartphone 
} from 'lucide-react';

const features = [
  {
    title: 'Expense Tracking',
    desc: 'Monitor every penny with our intuitive tracking system. Categorize and tag transactions effortlessly.',
    icon: BarChart3,
    color: 'emerald'
  },
  {
    title: 'Financial Insights',
    desc: 'Get instant insights into your spending habits with live data processing and visualization.',
    icon: Zap,
    color: 'amber'
  },
  {
    title: 'Interactive Charts',
    desc: 'Beautiful, responsive charts that help you visualize your financial trends over time.',
    icon: PieChart,
    color: 'teal'
  },
  {
    title: 'Secure Transactions',
    desc: 'Your financial data is protected with bank-grade encryption and secure cloud storage.',
    icon: ShieldCheck,
    color: 'emerald'
  },
  {
    title: 'Role Based Access',
    desc: 'Securely manage team or family access with granular permissions for admins and viewers.',
    icon: Users,
    color: 'emerald'
  },
  {
    title: 'Mobile Ready',
    desc: 'Access your dashboard anywhere. Fully responsive design works perfectly on all devices.',
    icon: Smartphone,
    color: 'emerald'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4 bg-emerald-50/30 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.5em] mb-6"
          >
            Features
          </motion.p>
          <h2 className="text-4xl font-bold mb-4 text-emerald-900 dark:text-emerald-50">Powerful Features</h2>
          <p className="text-emerald-700/70 dark:text-emerald-100/40 max-w-2xl mx-auto font-medium">
            Everything you need to manage your personal or business finances in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card dark:bg-slate-900 dark:border-emerald-900/30 p-8 rounded-3xl border border-emerald-500/10 group hover:border-emerald-500/30 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-emerald-900 dark:text-emerald-50">{feature.title}</h3>
              <p className="text-emerald-700/70 dark:text-emerald-100/40 leading-relaxed text-sm font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
