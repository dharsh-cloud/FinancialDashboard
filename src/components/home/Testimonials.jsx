import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Rivera',
    role: 'Product Designer',
    text: 'FinDash has completely changed how I track my freelance income. The UI is gorgeous and the insights are actually useful.',
    avatar: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    text: 'The best finance dashboard I have ever used. Fast, responsive, and the dark mode is just perfect.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    name: 'Marcus Thorne',
    role: 'Business Owner',
    text: 'Role-based access is a lifesaver for my small team. I can let my accountant view data without worrying about edits.',
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  },
  {
    name: 'Elena Vance',
    role: 'Financial Analyst',
    text: 'The charts are incredibly smooth. It makes data analysis feel like a premium experience rather than a chore.',
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4 bg-emerald-50/30 dark:bg-slate-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-emerald-900 dark:text-emerald-50">Loved by Users</h2>
          <p className="text-emerald-700/70 dark:text-emerald-100/40 max-w-2xl mx-auto font-medium">
            Join thousands of users who have transformed their financial management.
          </p>
        </div>

        <div className="flex gap-8 overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div 
                key={i}
                className="w-[350px] flex-shrink-0 glass-card dark:bg-slate-900 dark:border-emerald-900/30 p-8 rounded-3xl border border-emerald-500/10 relative"
              >
                <Quote className="absolute top-6 right-8 w-10 h-10 text-emerald-500/10 dark:text-emerald-400/5" />
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-emerald-500/20" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-50">{t.name}</h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-emerald-700/70 dark:text-emerald-100/40 text-sm leading-relaxed italic font-medium">
                  "{t.text}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
