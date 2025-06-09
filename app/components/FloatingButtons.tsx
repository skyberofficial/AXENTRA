'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug } from '@/public/icons/Bug';
import { ChevronUp } from '@/public/icons/ChevronUp';
import { Codesandbox } from '@/public/icons/Codesandbox';
import { ChatContainer } from './ChatContainer';

interface FloatingButtonsProps {
  isMenuOpen?: boolean;
  isLoading?: boolean;
  isPageLoading?: boolean;
}

export default function FloatingButtons({ 
  isMenuOpen = false, 
  isLoading = false,
  isPageLoading = false 
}: FloatingButtonsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <ChatContainer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <AnimatePresence>
        {!isChatOpen && !isMenuOpen && !isLoading && !isPageLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <motion.div 
              className="flex flex-col gap-3"
              layout
              transition={{
                layout: {
                  duration: 0.2,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
            >
              {/* Chat Button */}
              <motion.button
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-black border border-neutral-700 hover:border-[#AEF56A] transition-colors shadow-lg"
                onClick={() => setIsChatOpen(true)}
              >
                <Codesandbox width={16} height={16} stroke="#AEF56A" />
              </motion.button>

              {/* Bug Report Button */}
              <motion.button
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-black border border-neutral-700 hover:border-[#AEF56A] transition-colors shadow-lg"
                onClick={() => window.open('/bug-report', '_blank')}
              >
                <Bug width={16} height={16} stroke="#AEF56A" />
              </motion.button>

              {/* Back to Top Button */}
              <AnimatePresence mode="popLayout">
                {showBackToTop && (
                  <motion.button
                    layout
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ 
                      y: 0, 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }
                    }}
                    exit={{ 
                      y: 20, 
                      opacity: 0, 
                      scale: 0.8,
                      transition: {
                        duration: 0.2,
                        ease: [0.4, 0, 1, 1]
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-black border border-neutral-700 hover:border-[#AEF56A] transition-colors shadow-lg group"
                    onClick={scrollToTop}
                  >
                    <ChevronUp 
                      width={16} 
                      height={16} 
                      className="text-neutral-400 group-hover:text-[#AEF56A] transition-colors"
                    />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 