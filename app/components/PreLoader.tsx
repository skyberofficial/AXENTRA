'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TrueFocus from './TrueFocus';

interface PreLoaderProps {
    onLoadingChange?: (isLoading: boolean) => void;
}

export default function PreLoader({ onLoadingChange }: PreLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Disable scroll and right-click during loading
        const disableScroll = (e: Event) => e.preventDefault();
        const disableRightClick = (e: MouseEvent) => e.preventDefault();
        
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('scroll', disableScroll, { passive: false });
            window.addEventListener('wheel', disableScroll, { passive: false });
            window.addEventListener('touchmove', disableScroll, { passive: false });
            window.addEventListener('contextmenu', disableRightClick);
        }

        // Hide preloader after 3 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
            onLoadingChange?.(false);
            document.body.style.overflow = '';
            window.removeEventListener('scroll', disableScroll);
            window.removeEventListener('wheel', disableScroll);
            window.removeEventListener('touchmove', disableScroll);
            window.removeEventListener('contextmenu', disableRightClick);
        }, 3000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
            window.removeEventListener('scroll', disableScroll);
            window.removeEventListener('wheel', disableScroll);
            window.removeEventListener('touchmove', disableScroll);
            window.removeEventListener('contextmenu', disableRightClick);
        };
    }, [isLoading, onLoadingChange]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                >
                    <TrueFocus
                        sentence="Loading Complete"
                        blurAmount={3}
                        borderColor="#aef56a"
                        glowColor="rgba(174, 245, 106, 0.6)"
                        animationDuration={0.75}
                        pauseBetweenAnimations={1.5}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
} 