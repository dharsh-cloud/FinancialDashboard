import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Globe, Users, Heart } from 'lucide-react';
import axios from 'axios';

const AboutSection = () => {
  const [stats, setStats] = useState([
    { label: 'Active Users', value: '0+', icon: Users },
    { label: 'Countries', value: '1+', icon: Globe },
    { label: 'Security Score', value: '99.9%', icon: Shield },
    { label: 'User Rating', value: '4.9/5', icon: Heart },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/transactions/global-stats');
        const data = response.data;
        
        setStats([
          { label: 'Active Users', value: `${data.users}+`, icon: Users },
          { label: 'Countries', value: '1+', icon: Globe },
          { label: 'Security Score', value: `${data.accuracy}%`, icon: Shield },
          { label: 'User Rating', value: '4.9/5', icon: Heart },
        ]);
      } catch (error) {
        console.error('Error fetching about stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="about" className="py-24 px-4 bg-emerald-50/30 dark:bg-slate-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-8">
              <span>Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-emerald-900 dark:text-emerald-50 mb-8 leading-tight">
              Democratizing Financial <br />
              <span className="gradient-text">Intelligence for Everyone</span>
            </h2>
            <p className="text-emerald-700/70 dark:text-emerald-100/60 text-lg mb-8 font-medium leading-relaxed">
              We believe that everyone deserves access to high-quality financial tools. 
              Our mission is to simplify complex financial data and provide actionable 
              insights that help you build a better future.
            </p>
            <p className="text-emerald-700/70 dark:text-emerald-100/60 text-lg mb-12 font-medium leading-relaxed">
              Founded in 2024, FinDash has grown from a simple tracking tool to a 
              complete financial ecosystem used by thousands of professionals and 
              individuals worldwide.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <stat.icon className="w-5 h-5" />
                    <span className="text-2xl font-black text-emerald-900 dark:text-emerald-50">{stat.value}</span>
                  </div>
                  <p className="text-[10px] font-black text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-500/20 border border-emerald-500/10">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Team" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
