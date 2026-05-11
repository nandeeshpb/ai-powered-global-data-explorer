import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Explore', 'Weather', 'Flights', 'AI Insights', 'Dashboard'];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className={`mx-auto max-w-7xl px-6 ${scrolled ? 'glass-strong rounded-2xl mx-4 md:mx-auto' : ''}`}>
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple animate-spin-slow opacity-80" />
              <div className="absolute inset-1 rounded-full bg-dark-900 flex items-center justify-center">
                <span className="text-neon-cyan text-xs font-bold">AI</span>
              </div>
            </div>
            <span className="font-bold text-lg tracking-wide">
              <span className="gradient-text">GLOBAL</span>
              <span className="text-white/80 ml-1">EXPLORER</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-sm text-white/70 hover:text-white transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-neon-blue to-neon-purple group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-5 py-2 rounded-full text-sm font-medium overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-90" />
            <span className="absolute inset-[1px] rounded-full bg-dark-900 group-hover:bg-transparent transition-colors" />
            <span className="relative z-10 text-white">Launch App</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}