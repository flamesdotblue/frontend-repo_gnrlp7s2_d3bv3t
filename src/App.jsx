import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Chat from './components/Chat';

function App() {
  const [mode, setMode] = useState('landing');
  const [theme, setTheme] = useState('light');
  const [initialQuery, setInitialQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') setTheme(saved);
    }
  }, []);

  const handleQuery = (q) => {
    setInitialQuery(q);
    setMode('chat');
  };

  const handleQuickPick = (label) => {
    const map = {
      Me: 'Tell me about you',
      Projects: 'Show my projects',
      Skills: 'What are your skills?',
      Contact: 'How can I contact you?',
    };
    handleQuery(map[label] || label);
  };

  const handleResume = () => {
    // Open email compose or link to GitHub as a placeholder resume source
    window.open('https://github.com/Raghavv1206', '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header onResume={handleResume} theme={theme} setTheme={setTheme} />
      {mode === 'landing' ? (
        <>
          <Hero onSubmitQuery={handleQuery} onQuickPick={handleQuickPick} />
          <div className="max-w-5xl mx-auto px-4 pb-16">
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              Tip: Click a card or start typing to begin the conversation.
            </p>
          </div>
        </>
      ) : (
        <Chat initialQuery={initialQuery} />
      )}
    </div>
  );
}

export default App;
