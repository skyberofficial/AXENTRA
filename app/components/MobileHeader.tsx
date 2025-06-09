'use client';

import React from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useCallback } from 'react';

export default function MobileHeader() {
    const { theme, setTheme } = useTheme();
    const [hasScrolled, setHasScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Wait for component to mount to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        requestAnimationFrame(() => {
            setHasScrolled(scrollY > 10);
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out
                ${hasScrolled ? 'mt-2 mx-3' : 'mt-0 mx-0'}
            `}
        >
            <div 
                className={`transition-all duration-300 ease-out
                    ${hasScrolled ? 'glass-effect-darker rounded-xl shadow-lg' : 'bg-transparent'}
                `}
            >
                <div 
                    className={`flex items-center justify-between transition-all duration-300
                        ${hasScrolled ? 'px-3 py-2.5' : 'px-4 py-3'}
                    `}
                >
                    <Link 
                        href="/" 
                        className={`text-base font-bold tracking-wider transition-colors duration-300
                            ${hasScrolled ? 'text-white' : 'text-white/90'}
                        `}
                    >
                        AXENTRA
                    </Link>
                    {mounted && (
                        <button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-1.5 rounded-lg transition-colors hover:text-white/90"
                            aria-label="Toggle theme"
                        >
                            <Sun className="w-4 h-4 dark:hidden" />
                            <Moon className="w-4 h-4 hidden dark:block" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
} 