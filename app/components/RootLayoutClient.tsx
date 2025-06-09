'use client';

import { ThemeProvider } from "next-themes";
import { useState } from 'react';
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import MobileDock from "./MobileDock";
import PageLoading from "./PageLoading";
import PreLoader from "./PreLoader";
import Noise from "./Noise";
import FloatingButtons from './FloatingButtons';

interface RootLayoutClientProps {
  children: React.ReactNode;
  className: string;
}

export default function RootLayoutClient({ children, className }: RootLayoutClientProps) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="theme-preference"
      enableSystem={false}
    >
      <div className="relative z-0">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={10}
        />
      </div>
      <div className="relative z-10">
        <PreLoader onLoadingChange={setIsLoading} />
        <div className="contents">
          <PageLoading onLoadingChange={setIsPageLoading} />
          <div className="hidden md:block">
            <Header />
          </div>
          <div className="md:hidden">
            <MobileHeader />
          </div>
          <main className={`pt-[calc(2.5rem+10px-90px)] md:pt-0 pb-24 md:py-0 ${className}`}>
            {children}
          </main>
          <div className="md:hidden">
            <MobileDock onMenuOpenChange={setIsMoreMenuOpen} />
          </div>
        </div>
      </div>
      <FloatingButtons 
        isMenuOpen={isMoreMenuOpen} 
        isLoading={isLoading}
        isPageLoading={isPageLoading}
      />
    </ThemeProvider>
  );
} 