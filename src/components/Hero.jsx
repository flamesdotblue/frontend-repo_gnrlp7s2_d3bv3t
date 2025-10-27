import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero({ onSubmitQuery, onQuickPick }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = input.trim();
    if (q) onSubmitQuery(q);
  };

  return (
    <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white dark:from-neutral-950/70 dark:via-neutral-950/60 dark:to-neutral-950"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300">
          Hey, I'm Raghav 👋
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Full-Stack Web Developer
        </motion.h1>

        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-8 flex items-center justify-center">
          <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-1 shadow-lg">
            <div className="h-full w-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-yellow-300 to-pink-300 shadow-inner flex items-center justify-center">
                <span className="text-3xl select-none">🙂</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="mt-8 w-full max-w-2xl mx-auto">
          <div className="rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-sm backdrop-blur px-4 py-2 flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none placeholder-neutral-400 text-neutral-800 dark:text-neutral-100 text-sm sm:text-base"
              placeholder="Ask me anything..."
            />
            <button type="submit" className="inline-flex items-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90 transition">
              Ask
            </button>
          </div>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {['Me', 'Projects', 'Skills', 'Contact'].map((label) => (
            <button key={label} onClick={() => onQuickPick(label)} className="rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-200 shadow-sm hover:shadow transition">
              {label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
