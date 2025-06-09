'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecryptedText from './DecryptedText';

interface PageLoadingProps {
    onLoadingChange?: (isLoading: boolean) => void;
}

export default function PageLoading({ onLoadingChange }: PageLoadingProps) {
    const pathname = usePathname();
    const [pageName, setPageName] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isFirstHomeVisit, setIsFirstHomeVisit] = useState(true);

    useEffect(() => {
        // Check if this is the first visit to home page
        if (pathname === '/') {
            if (isFirstHomeVisit) {
                setIsFirstHomeVisit(false);
                return; // Don't show loading animation for first home page visit
            }
        }

        // Get page name from pathname
        const name = pathname.split('/').filter(Boolean).pop() || 'Home';
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        setPageName(formattedName);
        
        // Show loading state
        setIsVisible(true);
        onLoadingChange?.(true);
        
        // Hide after animation
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
            onLoadingChange?.(false);
        }, 2000); // Reduced to 2 seconds since we only show one animation now

        return () => {
            clearTimeout(hideTimer);
            onLoadingChange?.(false);
        };
    }, [pathname, isFirstHomeVisit, onLoadingChange]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-40 bg-black"
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center px-6 w-full max-w-[90vw] mx-auto">
                            <DecryptedText
                                text={`Loading Your ${pageName} Page...`}
                                speed={50}
                                maxIterations={15}
                                sequential={true}
                                revealDirection="center"
                                animateOn="view"
                                className="text-white font-[200] tracking-wider"
                                encryptedClassName="text-white/50 font-[200] tracking-wider"
                                parentClassName="text-3xl font-oxanium"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 