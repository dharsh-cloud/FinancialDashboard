import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, Sparkles } from 'lucide-react';

const MoneyAnimation = () => {
  const [coins, setCoins] = useState([]);
  const [count, setCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCoin = {
        id: Date.now(),
        left: Math.random() * 80 + 10, // 10% to 90%
      };
      setCoins((prev) => [...prev, newCoin]);
      
      // Remove coin after animation
      setTimeout(() => {
        setCoins((prev) => prev.filter(c => c.id !== newCoin.id));
        setCount(prev => prev + 1);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 200);
      }, 2000);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 overflow-hidden bg-emerald-50/30">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-emerald-900">Smart Budgeting</h2>
          <p className="text-emerald-700/70 max-w-2xl mx-auto font-medium">
            Watch your savings grow in real-time with our automated tracking tools.
          </p>
        </div>

        <div className="relative w-full max-w-md h-[400px] flex flex-col items-center justify-end pb-12">
          {/* Falling Coins */}
          <AnimatePresence>
            {coins.map((coin) => (
              <motion.div
                key={coin.id}
                initial={{ y: -100, opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ y: 280, opacity: 1, scale: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 2, ease: "easeIn" }}
                style={{ left: `${coin.left}%` }}
                className="absolute top-0 text-amber-400"
              >
                <Coins className="w-8 h-8 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Piggy Bank / Wallet Icon */}
          <motion.div
            animate={isShaking ? {
              x: [-2, 2, -2, 2, 0],
              scale: [1, 1.05, 1]
            } : {}}
            className="relative z-10"
          >
            <div className="w-32 h-32 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 border-4 border-emerald-400/30">
              <div className="absolute -top-2 -right-2">
                <AnimatePresence>
                  {isShaking && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="text-amber-400"
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-white fill-current">
                <path d="M19,6H5C3.89,6 3,6.89 3,8V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V8C21,6.89 20.1,6 19,6M19,18H5V12H19V18M19,10H5V8H19V10M16,14A1,1 0 0,1 17,15A1,1 0 0,1 16,16A1,1 0 0,1 15,15A1,1 0 0,1 16,14Z" />
              </svg>
            </div>
          </motion.div>

          {/* Counter */}
          <div className="mt-8 text-center">
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">Total Savings Tracked</p>
            <motion.h3 
              key={count}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-emerald-900"
            >
              ${(count * 50).toLocaleString()}
            </motion.h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyAnimation;
