
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-dark-900"
        >
          <div className="relative w-32 h-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon-blue border-r-neon-purple"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-full border-2 border-transparent border-b-neon-cyan border-l-neon-pink"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple opacity-70 blur-md"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-sm tracking-[0.4em] text-white/60 uppercase"
          >
            Initializing Global Data
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}