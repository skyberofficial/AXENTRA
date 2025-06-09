'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from '@/public/icons/Search';
import { Code } from '@/public/icons/Code';
import { FileText } from '@/public/icons/FileText';
import { Briefcase } from '@/public/icons/Briefcase';
import { Users } from '@/public/icons/Users';
import { GraduationCap } from '@/public/icons/GraduationCap';
import { LifeBuoy } from '@/public/icons/LifeBuoy';
import { Shield } from "@/public/icons/Shield";
import { LogIn } from "@/public/icons/LogIn";

interface MoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MoreMenu({ isOpen, onClose }: MoreMenuProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const preventDefault = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent scroll on body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // Prevent scroll events
      document.addEventListener('wheel', preventDefault, { passive: false });
      document.addEventListener('touchmove', preventDefault, { passive: false });
    } else {
      // Restore scroll on body
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      
      // Remove event listeners
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    }
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isOpen, preventDefault]);

  const menuItems = [
    { 
      label: 'Projects', 
      icon: <Code width={20} height={20} className="stroke-current" />,
      onClick: () => router.push('/projects') 
    },
    { 
      label: 'Blog', 
      icon: <FileText width={20} height={20} className="stroke-current" />,
      onClick: () => router.push('/blog') 
    },
    { 
      label: 'Services', 
      icon: <Briefcase width={20} height={20} className="stroke-current" />,
      onClick: () => router.push('/services') 
    },
    { 
      label: 'Team', 
      icon: <Users width={20} height={20} className="stroke-current" />,
      onClick: () => router.push('/team') 
    },
    { 
      label: 'Careers', 
      icon: <GraduationCap width={20} height={20} className="stroke-current" />,
      onClick: () => router.push('/careers') 
    },
    { 
      label: 'Support', 
      icon: <LifeBuoy width={20} height={20} className="stroke-current" />,
      onClick: () => router.push('/support') 
    },
    { 
      label: 'Verify', 
      icon: <Shield width={20} height={20} className="stroke-current" />,
      onClick: () => router.push('/verify') 
    },
    { 
      label: 'Login', 
      icon: <LogIn width={20} height={20} className="stroke-current" />,
      onClick: () => router.push('/login') 
    },
  ];

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-black border border-neutral-700 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {/* Search Bar */}
            <div className="p-4 border-b border-neutral-700 bg-black">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900 text-white placeholder-neutral-400 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-neutral-600"
                />
                <Search 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" 
                  width={16} 
                  height={16}
                />
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {filteredItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.onClick();
                      onClose();
                    }}
                    className="flex items-center gap-3 p-3 text-white rounded-lg hover:bg-white/5 transition-colors group border border-[#AEF56A]/50 hover:border-[#AEF56A]"
                  >
                    <div className="text-neutral-400 group-hover:text-white transition-colors shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={onClose}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-lg p-3 bg-black border border-neutral-700 rounded-xl text-white hover:bg-white/5 transition-colors z-50 font-medium"
          >
            Close Menu
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
} 