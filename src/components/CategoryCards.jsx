import { motion } from 'framer-motion';

export default function CategoryCards({ onSelect }) {
  const cards = [
    { key: 'Me', desc: 'Who I am and what I do' },
    { key: 'Projects', desc: 'Things I’ve built and shipped' },
    { key: 'Skills', desc: 'Tech I use and love' },
    { key: 'Contact', desc: 'Ways to reach me' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {cards.map((c, i) => (
        <motion.button
          key={c.key}
          onClick={() => onSelect(c.key)}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 * i }}
          className="rounded-2xl text-left bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm hover:shadow-md transition"
        >
          <p className="font-semibold text-neutral-800 dark:text-neutral-100">{c.key}</p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{c.desc}</p>
        </motion.button>
      ))}
    </div>
  );
}
