import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  Target,
  Sparkles,
  PieChart,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import useTransactionStore from '../store/useTransactionStore';
import BudgetOptimizationModal from './BudgetOptimizationModal';

const Insights = () => {
  const { getFilteredTransactions, getSummary } = useTransactionStore();
  const transactions = getFilteredTransactions();
  const summary = getSummary();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setIsModalOpen(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `As a professional financial advisor, analyze the following transaction summary and provide 3-4 actionable budget optimization tips.
      
      Summary:
      - Total Income: $${summary.totalIncome}
      - Total Expenses: $${summary.totalExpenses}
      - Total Balance: $${summary.totalBalance}
      - Number of Transactions: ${summary.transactionCount}
      
      Recent Categories and Spending:
      ${transactions.slice(0, 10).map(t => `- ${t.category}: $${t.amount} (${t.title})`).join('\n')}
      
      Please provide the advice in a clear, encouraging tone using Markdown formatting. Focus on high-impact changes and specific strategies based on the data.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setSuggestions(response.text || "I couldn't generate suggestions at this time. Please try again later.");
    } catch (error) {
      console.error('Optimization error:', error);
      setSuggestions("An error occurred while analyzing your finances. Please check your connection and try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const getInsights = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categories = {};
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories[0] || ['None', 0];
    
    const avgTransaction = transactions.length > 0 
      ? summary.totalExpenses / expenses.length 
      : 0;

    const savingsRate = summary.totalIncome > 0 
      ? ((summary.totalIncome - summary.totalExpenses) / summary.totalIncome) * 100 
      : 0;

    return [
      {
        title: 'Highest Spending',
        value: topCategory[0],
        subValue: `$${topCategory[1].toLocaleString()}`,
        icon: AlertCircle,
        color: 'rose',
        desc: 'This is your largest expense category this month.'
      },
      {
        title: 'Savings Rate',
        value: `${savingsRate.toFixed(1)}%`,
        subValue: 'Monthly Average',
        icon: Target,
        color: 'emerald',
        desc: 'This shows the percentage of income you are saving.'
      },
      {
        title: 'Avg. Expense',
        value: `$${avgTransaction.toFixed(0)}`,
        subValue: 'Per Transaction',
        icon: Zap,
        color: 'amber',
        desc: 'Your average spending per transaction.'
      }
    ];
  };

  const insights = getInsights();

  const getColorClasses = (color) => {
    const colors = {
      rose: {
        bg: 'bg-rose-50 dark:bg-rose-900/20',
        border: 'border-rose-100 dark:border-rose-900/30',
        text: 'text-rose-600 dark:text-rose-400',
        glow: 'bg-rose-500/10'
      },
      emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        border: 'border-emerald-100 dark:border-emerald-900/30',
        text: 'text-emerald-600 dark:text-emerald-400',
        glow: 'bg-emerald-500/10'
      },
      amber: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-100 dark:border-amber-900/30',
        text: 'text-amber-600 dark:text-amber-400',
        glow: 'bg-amber-500/10'
      }
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">Financial Insights</h3>
          <p className="text-xs font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">AI-powered analysis of your spending habits</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">AI Analysis Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {insights.map((insight, index) => {
          const theme = getColorClasses(insight.color);
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-emerald-50 dark:border-emerald-900/30 relative group overflow-hidden shadow-sm"
            >
              <div className={`absolute -right-8 -top-8 w-32 h-32 ${theme.glow} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`} />
              
              <div className="flex items-start justify-between relative z-10">
                <div className={`p-4 rounded-2xl ${theme.bg} border ${theme.border}`}>
                  <insight.icon className={`w-8 h-8 ${theme.text}`} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">{insight.title}</p>
                  <h4 className="text-3xl font-black text-emerald-900 dark:text-emerald-50 mt-1 tracking-tight">{insight.value}</h4>
                  <p className={`text-sm font-black ${theme.text} mt-1`}>{insight.subValue}</p>
                </div>
              </div>

              <div className="mt-8 relative z-10">
                <p className="text-emerald-900/60 dark:text-emerald-100/60 text-sm leading-relaxed font-medium">{insight.desc}</p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-emerald-600 dark:text-emerald-400 cursor-pointer group/link relative z-10 uppercase tracking-widest">
                View Detailed Analysis <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 bg-linear-to-br from-emerald-50/50 dark:from-emerald-900/10 to-transparent shadow-sm"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/30">
            <PieChart className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">Monthly Budget Optimization</h4>
            <p className="text-emerald-900/60 dark:text-emerald-100/60 mt-2 text-sm max-w-2xl font-medium">
              Track your spending patterns to get personalized budget optimization tips and saving strategies.
            </p>
          </div>
          <button 
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isOptimizing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              'Optimize Now'
            )}
          </button>
        </div>
      </motion.div>

      <BudgetOptimizationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        suggestions={suggestions}
        loading={isOptimizing}
      />
    </div>
  );
};

export default Insights;
