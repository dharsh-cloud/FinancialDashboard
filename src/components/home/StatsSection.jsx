import React, { useEffect, useState } from 'react';
import { motion, animate } from 'motion/react';
import axios from 'axios';

const Counter = ({ value, suffix = "", decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = typeof value === 'string' 
      ? parseFloat(value.replace(/[^0-9.]/g, '')) 
      : value;
    
    const controls = animate(displayValue, numericValue, {
      duration: 2,
      onUpdate: (latest) => setDisplayValue(latest)
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
};

const StatsSection = () => {
  const [stats, setStats] = useState([
    { label: 'Transactions', value: 0, suffix: '+', decimals: 0 },
    { label: 'Active Users', value: 0, suffix: '+', decimals: 0 },
    { label: 'Money Tracked', value: 0, suffix: '+', decimals: 0 },
    { label: 'Accuracy', value: 99.9, suffix: '%', decimals: 2 }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/transactions/global-stats');
        const data = response.data;
        
        setStats([
          { label: 'Transactions', value: data.transactions, suffix: '+', decimals: 0 },
          { label: 'Active Users', value: data.users, suffix: '+', decimals: 0 },
          { label: 'Money Tracked', value: data.moneyTracked, suffix: '+', decimals: 0 },
          { label: 'Accuracy', value: data.accuracy, suffix: '%', decimals: 2 }
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-950 border-y border-emerald-50 dark:border-emerald-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 right-0 flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[8px] font-black text-emerald-600/60 dark:text-emerald-400/40 uppercase tracking-[0.3em]">Live Data</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.5em] mb-6"
          >
            Statistics
          </motion.p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <h3 className="text-4xl md:text-6xl font-black text-emerald-900 dark:text-emerald-50 mb-2 group-hover:scale-110 transition-transform">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </h3>
              <p className="text-emerald-700/60 dark:text-emerald-100/40 font-bold uppercase tracking-widest text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
