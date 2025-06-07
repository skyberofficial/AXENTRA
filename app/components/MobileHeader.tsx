'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, User2, FolderGit2, Send, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useCallback } from 'react';
import { Grip } from './Grip';
import MenuPanel from './MenuPanel';

interface IconProps {
    width: number;
    height: number;
    strokeWidth: number;
    stroke: string;
}

interface NavItem {
    name: string;
    href: string;
    icon?: React.ComponentType<any>;
    customIcon?: (props: IconProps) => React.ReactElement;
}

export default function MobileHeader() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [hasScrolled, setHasScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

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

    // Left side menu items
    const leftNavItems = [
        { name: 'About', href: '/about', icon: User2 },
        { name: 'Projects', href: '/projects', icon: FolderGit2 },
    ];

    // Right side menu items
    const rightNavItems: NavItem[] = [
        { name: 'Contact', href: '/contact', icon: Send },
        { 
            name: 'More', 
            href: '#', 
            customIcon: ({ width, height, strokeWidth, stroke }: IconProps) => 
                isPanelOpen ? (
                    <X 
                        width={width} 
                        height={height} 
                        strokeWidth={strokeWidth} 
                        stroke={stroke}
                    />
                ) : (
                    <Grip 
                        width={width} 
                        height={height} 
                        strokeWidth={strokeWidth} 
                        stroke={stroke}
                    />
                )
        },
    ];

    const handleGripClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <>
            {/* Top header */}
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

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50">
                {/* Navigation content */}
                <div className="flex items-center justify-between px-8 py-2">
                    {/* Left side menu items */}
                    <div className="flex items-center gap-12">
                        {leftNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="mobile-nav-item"
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: isActive ? 1 : 0.95,
                                            color: isActive ? '#aef56a' : '#ffffff80'
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className="relative p-3 rounded-xl transition-all duration-300"
                                        style={{
                                            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                            boxShadow: isActive ? '0 4px 12px rgba(174, 245, 106, 0.1)' : 'none'
                                        }}
                                    >
                                        <Icon className="w-[22px] h-[22px]" strokeWidth={1.5} />
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Center Home Button */}
                    <div className="flex items-center">
                        <Link href="/" className="mobile-nav-item">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: pathname === '/' ? 1 : 0.95,
                                    color: pathname === '/' ? '#aef56a' : '#ffffff'
                                }}
                                whileTap={{ scale: 0.9 }}
                                className="relative p-3 rounded-xl transition-all duration-300"
                                style={{
                                    backgroundColor: pathname === '/' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                    boxShadow: pathname === '/' ? '0 4px 12px rgba(174, 245, 106, 0.1)' : 'none'
                                }}
                            >
                                <Home className="w-[22px] h-[22px]" strokeWidth={1.5} />
                            </motion.div>
                        </Link>
                    </div>

                    {/* Right side menu items */}
                    <div className="flex items-center gap-12">
                        {rightNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const IconComponent = item.icon;
                            const CustomIcon = item.customIcon;
                            const isHovered = hoveredItem === item.href;
                            const isGrip = !!item.customIcon;
                            
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="mobile-nav-item"
                                    onMouseEnter={() => setHoveredItem(item.href)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    onClick={isGrip ? handleGripClick : undefined}
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: isActive ? 1 : 0.95,
                                            color: isActive ? '#aef56a' : (isHovered ? '#ffffff' : '#ffffff80')
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className="relative p-3 rounded-xl transition-all duration-300"
                                        style={{
                                            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                            boxShadow: isActive ? '0 4px 12px rgba(174, 245, 106, 0.1)' : 'none'
                                        }}
                                    >
                                        {CustomIcon ? (
                                            <CustomIcon 
                                                width={22} 
                                                height={22} 
                                                strokeWidth={1.5}
                                                stroke={isActive ? '#aef56a' : (isHovered ? '#ffffff' : '#ffffff80')}
                                            />
                                        ) : IconComponent && (
                                            <IconComponent className="w-[22px] h-[22px]" strokeWidth={1.5} />
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Menu Panel */}
            <MenuPanel 
                isOpen={isPanelOpen} 
                onClose={() => setIsPanelOpen(false)} 
            />
        </>
    );
} 