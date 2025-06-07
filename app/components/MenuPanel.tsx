'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Search, X, Settings, BookOpen, MessageSquare, Bell, Heart, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface MenuPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Documentation', href: '/docs', icon: BookOpen },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Favorites', href: '/favorites', icon: Heart },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
];

export default function MenuPanel({ isOpen, onClose }: MenuPanelProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const dragY = useMotionValue(0);
    
    // Clamp opacity between 0 and 1
    const dragOpacity = useTransform(dragY, [0, 200], [1, 0.5], {
        clamp: true
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ 
                            type: 'spring', 
                            damping: 25, 
                            stiffness: 200,
                            duration: 0.3
                        }}
                        style={{
                            y: dragY
                        }}
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(velocity.y) * offset.y;
                            if (swipe > 20000 || offset.y > 200) {
                                onClose();
                            }
                        }}
                        className="fixed bottom-[64px] left-0 right-0 z-50 bg-black/95 rounded-t-3xl overflow-hidden h-[calc(100vh-128px)]"
                    >
                        {/* Handle bar area - Made larger for better touch target */}
                        <motion.div 
                            className="h-12 cursor-grab active:cursor-grabbing touch-pan-y"
                            onTouchStart={(e) => e.currentTarget.style.cursor = 'grabbing'}
                            onTouchEnd={(e) => e.currentTarget.style.cursor = 'grab'}
                            style={{
                                opacity: dragOpacity
                            }}
                        >
                            <div className="flex justify-center items-center h-full">
                                <div className="w-12 h-1 rounded-full bg-white/20" />
                            </div>
                        </motion.div>

                        {/* Search bar */}
                        <div className="px-4 pb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/10 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white/20 transition-colors"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            </div>
                        </div>

                        {/* Menu items */}
                        <motion.div 
                            className="px-4 pb-8 overflow-y-auto h-[calc(100%-100px)]"
                            style={{
                                opacity: dragOpacity
                            }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                                            onClick={onClose}
                                        >
                                            <div className="p-2 rounded-lg bg-white/10 text-white/80 group-hover:text-[#aef56a] transition-colors">
                                                <Icon size={20} />
                                            </div>
                                            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
} 