import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import axios from 'axios';

const COLORS = ['#10b981', '#059669', '#34d399', '#065f46'];

const DashboardPreview = () => {
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    chartData: [
      { name: '1', value: 400 },
      { name: '2', value: 300 },
      { name: '3', value: 600 },
      { name: '4', value: 800 },
      { name: '5', value: 500 },
      { name: '6', value: 900 },
      { name: '7', value: 1100 },
    ],
    pieData: [
      { name: 'Food', value: 400 },
      { name: 'Rent', value: 300 },
      { name: 'Bills', value: 300 },
      { name: 'Other', value: 200 },
    ]
  });

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        const response = await axios.get('/api/transactions/global-stats');
        const data = response.data;
        
        // We can derive some mock-but-related data for the preview
        setSummary(prev => ({
          ...prev,
          balance: data.moneyTracked / 2,
          income: data.moneyTracked * 0.7,
          expense: data.moneyTracked * 0.3,
        }));
      } catch (error) {
        console.error('Error fetching preview data:', error);
      }
    };
    fetchPreviewData();
  }, []);

  return (
    <section className="py-24 px-4 relative bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-emerald-900 dark:text-emerald-50">Intuitive Interface</h2>
          <p className="text-emerald-700/70 dark:text-emerald-100/40 max-w-2xl mx-auto font-medium">
            Experience the most powerful financial dashboard ever built. 
            Clean, fast, and packed with features.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-card dark:bg-slate-900 dark:border-emerald-900/30 rounded-[2rem] p-4 md:p-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden"
        >
          {/* Mock Dashboard UI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Summary & Chart */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-900/20 border border-emerald-500/10 dark:border-emerald-900/30 shadow-sm">
                  <Wallet className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-3" />
                  <p className="text-xs font-bold text-emerald-700/50 dark:text-emerald-100/40 uppercase tracking-wider">Balance</p>
                  <p className="text-2xl font-black text-emerald-900 dark:text-emerald-50">${summary.balance.toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-2xl bg-teal-500/5 dark:bg-teal-900/20 border border-teal-500/10 dark:border-teal-900/30 shadow-sm">
                  <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400 mb-3" />
                  <p className="text-xs font-bold text-teal-700/50 dark:text-teal-100/40 uppercase tracking-wider">Income</p>
                  <p className="text-2xl font-black text-emerald-900 dark:text-emerald-50">+${summary.income.toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-900/20 border border-amber-500/10 dark:border-amber-900/30 shadow-sm">
                  <TrendingDown className="w-6 h-6 text-amber-600 dark:text-amber-400 mb-3" />
                  <p className="text-xs font-bold text-amber-700/50 dark:text-amber-100/40 uppercase tracking-wider">Expense</p>
                  <p className="text-2xl font-black text-emerald-900 dark:text-emerald-50">-${summary.expense.toLocaleString()}</p>
                </div>
              </div>

              <div className="h-[300px] w-full p-6 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-500/10 dark:border-emerald-900/30 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={summary.chartData}>
                    <defs>
                      <linearGradient id="prevIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} fill="url(#prevIncome)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column: Pie Chart & List */}
            <div className="space-y-8">
              <div className="h-[250px] w-full p-6 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-500/10 dark:border-emerald-900/30 shadow-sm flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={summary.pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {summary.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-emerald-50/50 dark:bg-slate-800/50 border border-emerald-500/10 dark:border-emerald-900/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                        <div className="w-5 h-5 bg-emerald-500/20 rounded" />
                      </div>
                      <div>
                        <div className="w-24 h-3 bg-emerald-200 dark:bg-emerald-800 rounded mb-2" />
                        <div className="w-16 h-2 bg-emerald-100 dark:bg-emerald-900/40 rounded" />
                      </div>
                    </div>
                    <div className="w-16 h-4 bg-emerald-200 dark:bg-emerald-800 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overlay to prevent interaction in preview */}
          <div className="absolute inset-0 bg-transparent z-20" />
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
