import React from 'react';
import { motion } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import useTransactionStore from '../store/useTransactionStore';
import useThemeStore from '../store/useThemeStore';

const SpendingChart = () => {
  const { getFilteredTransactions } = useTransactionStore();
  const transactions = getFilteredTransactions();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const processData = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categories = {};
    
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    return Object.keys(categories).map(name => ({
      name,
      value: categories[name]
    })).sort((a, b) => b.value - a.value);
  };

  const data = processData();
  const COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#f43f5e', '#6366f1'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-50 dark:border-emerald-900/30 shadow-2xl">
          <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest mb-1">{payload[0].name}</p>
          <p className="text-sm font-black text-emerald-600">${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-900 p-8 rounded-3xl h-[400px] flex flex-col border border-emerald-50 dark:border-emerald-900/30 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">Spending Breakdown</h3>
        <p className="text-xs font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">Expenses by category</p>
      </div>

      <div className="flex-1 w-full relative min-h-[250px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
                animationBegin={0}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                formatter={(value) => <span className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-emerald-900/20 dark:text-emerald-100/10 text-xs font-black uppercase tracking-widest italic">
            No expense data available
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SpendingChart;
