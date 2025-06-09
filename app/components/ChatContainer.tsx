'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from '@/public/icons/Send';
import { X } from '@/public/icons/X';

interface ChatContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatContainer({ isOpen, onClose }: ChatContainerProps) {
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const preventDefault = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scroll on body
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      
      // Prevent scroll events
      document.addEventListener('wheel', preventDefault, { passive: false });
      document.addEventListener('touchmove', preventDefault, { passive: false });
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      
      // Remove event listeners
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    }
    
    return () => {
      // Cleanup
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isOpen, preventDefault]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={`
              fixed z-50 bg-black border border-neutral-700 rounded-xl shadow-lg overflow-hidden
              ${isMobile ? 
                'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[80vh] max-h-[600px]' : 
                'bottom-24 right-6 w-[90%] max-w-lg'
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-700">
              <div className="flex items-center gap-3">
                <span className="text-[#AEF56A] font-medium">AXENTRA</span>
                <span className="text-xs text-neutral-400">AI Assistant</span>
              </div>
              <button 
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X width={20} height={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className={`
              overflow-y-auto p-4
              ${isMobile ? 'h-[calc(80vh-8rem)]' : 'h-[400px]'}
            `}>
              {/* Initial Message */}
              <div className="flex gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#AEF56A]/10 flex items-center justify-center">
                  <span className="text-[#AEF56A] text-sm font-medium">A</span>
                </div>
                <div className="flex-1">
                  <div className="bg-neutral-900 rounded-lg p-3 text-white">
                    Hello! I'm AXENTRA, your AI assistant. How can I help you today?
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-700 bg-black">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-neutral-900 text-white placeholder-neutral-400 rounded-lg pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-[#AEF56A]/50"
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-[#AEF56A] transition-colors"
                >
                  <Send width={20} height={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 