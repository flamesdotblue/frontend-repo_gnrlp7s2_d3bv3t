import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function renderMarkdown(md) {
  let html = md
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">$1</code>')
    .replace(/\[(.*?)\]\((https?:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-400 underline">$1<\/a>');
  // Simple lists
  html = html.replace(/^\s*[-•] (.*)$/gim, '<li>$1<\/li>');
  html = html.replace(/(<li>.*<\/li>\s*)+/gim, (m) => `<ul class="list-disc pl-6">${m}<\/ul>`);
  // URLs
  html = html.replace(/(https?:\/\/[\w.-]+(?:\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?)/g, '<a href="$1" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-400 underline">$1<\/a>');
  return { __html: html };
}

const info = {
  name: 'Raghav Mishra',
  title: 'Full-Stack Web Developer | AI Enthusiast',
  location: 'Bhopal',
  email: 'raghavm205@gmail.com',
  linkedin: 'https://linkedin.com/in/raghav-mishra-677418316',
  github: 'https://github.com/Raghavv1206',
  about:
    'Computer Science student with hands-on experience in full-stack web development using React.js, Next.js, Node.js, and MongoDB. Skilled in C++ and Python, with strong problem-solving skills. Finalist in Kiro and SIH hackathons.',
  skills: {
    frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux'],
    backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT'],
    databases: ['MongoDB', 'MySQL'],
    tools: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel'],
    languages: ['C++', 'Python', 'TypeScript', 'SQL'],
  },
  projects: [
    {
      name: 'PromptPal – AI Prompt Optimizer',
      desc:
        'Built with Next.js, React, and MongoDB. Integrated OpenRouter API for real-time evaluation. Tech Stack: Next.js, React, Tailwind, MongoDB, Recharts.',
    },
    {
      name: 'Get Me a Chai – Micro-Donation Platform',
      desc:
        'Full-stack platform for small financial contributions. Integrated Razorpay API for payments with a scalable backend using Next.js API routes and MongoDB.',
    },
  ],
  roles: [
    'Vice President, E-Cell LNCT University — Organized startup competitions and mentored teams.',
    'Volunteer, Bhasha Bandhu Hackathon — Coordinated 200+ participants.',
  ],
};

function buildResponse(intent) {
  switch (intent) {
    case 'me':
    case 'about':
      return `**About Me**\n\n${info.about}\n\n- Name: ${info.name}\n- Location: ${info.location}\n- Email: [${info.email}](mailto:${info.email})\n- LinkedIn: ${info.linkedin}\n- GitHub: ${info.github}`;
    case 'skills': {
      const s = info.skills;
      return `**Skills Snapshot**\n\n- Frontend: ${s.frontend.join(', ')}\n- Backend: ${s.backend.join(', ')}\n- Databases: ${s.databases.join(', ')}\n- Languages: ${s.languages.join(', ')}\n- Tools: ${s.tools.join(', ')}`;
    }
    case 'projects': {
      const lines = info.projects
        .map((p) => `- **${p.name}** — ${p.desc}`)
        .join('\n');
      return `**Highlighted Projects**\n\n${lines}`;
    }
    case 'contact':
      return `**Contact**\n\nYou can reach me at [${info.email}](mailto:${info.email}).\n\nConnect on LinkedIn: ${info.linkedin}\n\nSee more on GitHub: ${info.github}`;
    default:
      return `I can share details about **me**, **projects**, **skills**, or **contact**. Ask away!`;
  }
}

function detectIntent(text) {
  const t = text.toLowerCase();
  if (/project|work|built|portfolio/.test(t)) return 'projects';
  if (/skill|tech|stack|tools|languages/.test(t)) return 'skills';
  if (/contact|email|reach|connect/.test(t)) return 'contact';
  if (/about|me|who|summary|bio/.test(t)) return 'about';
  return 'other';
}

function Message({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
        isUser
          ? 'bg-blue-600 text-white rounded-br-none'
          : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-bl-none'
      }`}>
        <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={renderMarkdown(content)} />
      </div>
    </div>
  );
}

export default function Chat({ initialQuery }) {
  const [messages, setMessages] = useState(() =>
    initialQuery
      ? [
          { role: 'user', content: initialQuery },
          { role: 'assistant', content: buildResponse(detectIntent(initialQuery)) },
        ]
      : [
          { role: 'assistant', content: `Hi! I'm Raghav's portfolio. Ask me about my projects, skills, or how to contact me.` },
        ]
  );
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const intent = detectIntent(text);
    const reply = buildResponse(intent);
    setMessages((m) => [...m, { role: 'user', content: text }]);
    // Simulate thinking delay
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    }, 350);
    setInput('');
  };

  return (
    <section className="min-h-[70vh] w-full max-w-3xl mx-auto px-4 py-6">
      <div className="text-center mb-3">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Chat with Raghav's Portfolio</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Alternating bubbles with markdown support</p>
      </div>
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm overflow-hidden">
        <div className="h-[50vh] sm:h-[60vh] overflow-y-auto p-4">
          <AnimatePresence initial={false}>
            {messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <Message role={m.role} content={m.content} />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={endRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t border-neutral-200 dark:border-neutral-800 p-3">
          <div className="flex items-center gap-2 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, or contact..."
              className="flex-1 bg-transparent outline-none text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400"
            />
            <button type="submit" className="rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-1.5 text-sm font-medium hover:opacity-90 transition">
              Send
            </button>
          </div>
        </form>
      </div>
      <p className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">Built by Raghav Mishra</p>
    </section>
  );
}
