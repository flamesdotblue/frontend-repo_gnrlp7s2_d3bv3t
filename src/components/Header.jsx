import { useEffect, useState } from 'react';
import { Sun, Moon, Github, Linkedin } from 'lucide-react';

export default function Header({ onResume, theme, setTheme }) {
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200/60 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow">
            RM
          </div>
          <div className="hidden sm:block">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Raghav Mishra</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">Full-Stack Web Developer</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Raghavv1206"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
          </a>
          <a
            href="https://linkedin.com/in/raghav-mishra-677418316"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
          </a>
          <button
            onClick={onResume}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition shadow-sm"
          >
            Resume
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-neutral-700" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
