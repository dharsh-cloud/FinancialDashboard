import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import useTransactionStore from '../store/useTransactionStore';

const SummaryCards = () => {
  const { getSummary } = useTransactionStore();
  const summary = getSummary();

  const cards = [
    {
      title: 'Total Balance',
      value: summary.totalBalance,
      icon: Wallet,
      color: 'emerald',
      trend: '',
      trendIcon: ArrowUpRight,
      bg: 'from-emerald-600/20 to-emerald-500/10',
      border: 'border-emerald-500/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: 'Total Income',
      value: summary.totalIncome,
      icon: TrendingUp,
      color: 'teal',
      trend: '',
      trendIcon: ArrowUpRight,
      bg: 'from-teal-600/20 to-teal-500/10',
      border: 'border-teal-500/20',
      iconColor: 'text-teal-600 dark:text-teal-400',
      iconBg: 'bg-teal-50 dark:bg-teal-900/20'
    },
    {
      title: 'Total Expenses',
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: 'rose',
      trend: '',
      trendIcon: ArrowDownRight,
      bg: 'from-rose-600/20 to-rose-500/10',
      border: 'border-rose-500/20',
      iconColor: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-50 dark:bg-rose-900/20'
    },
    {
      title: 'Transactions',
      value: summary.transactionCount,
      icon: Activity,
      color: 'amber',
      trend: '',
      trendIcon: ArrowUpRight,
      bg: 'from-amber-600/20 to-amber-500/10',
      border: 'border-amber-500/20',
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-[0.5em]">Financial Overview</h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[8px] font-black text-emerald-600/60 dark:text-emerald-400/40 uppercase tracking-[0.3em]">Live Sync</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border border-emerald-50 dark:border-emerald-900/30 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500`}
          >
            {/* Background Glow */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-linear-to-br ${card.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="flex items-start justify-between relative z-10">
              <div className={`p-3 rounded-2xl ${card.iconBg} dark:bg-emerald-900/20 border border-emerald-50 dark:border-emerald-900/30 group-hover:scale-110 transition-transform duration-500`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              {card.trend && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  card.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                }`}>
                  <card.trendIcon className="w-3 h-3" />
                  {card.trend}
                </div>
              )}
            </div>

            <div className="mt-6 relative z-10">
              <p className="text-xs font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">{card.title}</p>
              <h3 className="text-3xl font-black text-emerald-900 dark:text-emerald-50 mt-1 tracking-tight">
                {typeof card.value === 'number' && card.title !== 'Transactions' 
                  ? `$${card.value.toLocaleString()}` 
                  : card.value}
              </h3>
            </div>

            <div className="mt-6 h-1.5 w-full bg-emerald-50 dark:bg-emerald-900/20 rounded-full overflow-hidden relative z-10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                className={`h-full bg-emerald-600 rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
