'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import NavLink from './NavLink';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const [scrollStage, setScrollStage] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounced scroll handler
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleScroll = useCallback(
    debounce(() => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.scrollY / totalHeight) * 100;
      
      requestAnimationFrame(() => {
        if (scrollPercentage >= 15) {
          setScrollStage(3);
        } else if (scrollPercentage >= 10) {
          setScrollStage(2);
        } else if (scrollPercentage >= 5) {
          setScrollStage(1);
        } else {
          setScrollStage(0);
        }
      });
    }, 10),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const getHeaderClasses = () => {
    const baseClasses = 'transition-all duration-500 ease-out transform-gpu';
    let width = 'w-full scale-100';
    let styles = 'px-8 py-2.5 bg-transparent';
    
    if (scrollStage >= 1) {
      width = scrollStage === 1 ? 'w-[75%] scale-[0.98]' 
        : scrollStage === 2 ? 'w-[65%] scale-[0.96]' 
        : 'w-[50%] scale-[0.94]';
      
      styles = `px-4 py-2 rounded-full ${
        scrollStage === 1 
          ? 'bg-black/40 backdrop-blur-[2px] border border-white/5' 
          : scrollStage === 2 
            ? 'bg-black/50 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20' 
            : 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30'
      }`;
    }

    return `${baseClasses} ${width} ${styles}`;
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out ${
      scrollStage > 0 ? 'px-4 mt-3' : ''
    }`}>
      <header className={getHeaderClasses()}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-white hover:text-accent transition-colors relative z-10">
            AXENTRA
          </Link>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg transition-colors hover:text-white/90 relative z-10"
              aria-label="Toggle theme"
            >
              <Sun className="w-5 h-5 dark:hidden" />
              <Moon className="w-5 h-5 hidden dark:block" />
            </button>
          )}
        </nav>
      </header>
    </div>
  );
} 