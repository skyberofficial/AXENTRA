'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useCallback } from 'react';

export default function DesktopHeader() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [hasScrolled, setHasScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

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

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

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
                        ${hasScrolled ? 'px-6 py-3' : 'px-8 py-4'}
                    `}
                >
                    <Link 
                        href="/" 
                        className={`text-lg font-bold tracking-wider transition-colors duration-300
                            ${hasScrolled ? 'text-white' : 'text-white/90'}
                        `}
                    >
                        AXENTRA
                    </Link>

                    <nav className="flex items-center space-x-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative px-3 py-2 transition-colors hover:text-white/90"
                                >
                                    <span className={isActive ? 'text-[#aef56a]' : 'text-white/50'}>
                                        {item.name}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navIndicator"
                                            className="absolute -bottom-px left-0 right-0 h-px bg-[#aef56a]"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 25
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {mounted && (
                        <button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg transition-colors hover:text-white/90"
                            aria-label="Toggle theme"
                        >
                            <Sun className="w-5 h-5 dark:hidden" />
                            <Moon className="w-5 h-5 hidden dark:block" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
} 