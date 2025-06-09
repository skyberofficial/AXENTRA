"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import { useRouter } from 'next/navigation';
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Earth } from "@/public/icons/Earth";
import { User } from "@/public/icons/User";
import { HeartHandshake } from "@/public/icons/HeartHandshake";
import { Grip } from "@/public/icons/Grip";
import { Globe } from "@/public/icons/Globe";
import { Code } from "@/public/icons/Code";
import { AtSign } from "@/public/icons/AtSign";
import { MoreMenu } from "./MoreMenu";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items?: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  onMenuOpenChange?: (isOpen: boolean) => void;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const mouseDistance = useTransform(mouseX, (val) => {
    if (!isMounted) return 0;
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );

  const finalSize = useTransform(targetSize, (size) => 
    isActive ? magnification : size
  );

  const size = useSpring(finalSize, spring);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick?.();
  };

  useEffect(() => {
    if (!isMounted) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMounted]);

  return (
    <motion.div
      ref={ref}
      style={{
        width: isMounted ? size : baseItemSize,
        height: isMounted ? size : baseItemSize,
      }}
      initial={false}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center rounded-xl bg-[#060010] border-neutral-700 border shadow-md transition-colors ${isActive ? 'border-white' : ''} ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-pressed={isActive}
    >
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return cloneElement(child, { isHovered, isActive } as any);
        }
        return child;
      })}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};

function DockLabel({ children, className = "", ...rest }: DockLabelProps) {
  const { isHovered } = rest as { isHovered: MotionValue<number> };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060010] px-2 py-0.5 text-xs text-white`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

function DockIcon({ children, className = "" }: DockIconProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export default function Dock({
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 60,
  distance = 100,
  panelHeight = 64,
  dockHeight = 50,
  baseItemSize = 50,
  items,
  onMenuOpenChange,
}: DockProps) {
  const router = useRouter();
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMoreMenuOpen = (open: boolean) => {
    setIsMoreMenuOpen(open);
    onMenuOpenChange?.(open);
  };

  const defaultItems = [
    { 
      icon: <Earth width={18} height={18} stroke="currentColor" strokeWidth={2} />, 
      label: 'Home', 
      onClick: () => router.push('/') 
    },
    { 
      icon: <User width={18} height={18} />, 
      label: 'About', 
      onClick: () => router.push('/about') 
    },
    { 
      icon: <HeartHandshake width={18} height={18} />, 
      label: 'Contact', 
      onClick: () => router.push('/contact') 
    },
    { 
      icon: <Grip width={18} height={18} />, 
      label: 'More', 
      onClick: () => handleMoreMenuOpen(true)
    },
  ];

  const dockItems = items || defaultItems.map(item => ({ ...item, className: '' }));
  
  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <>
      <motion.div
        initial={false}
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center"
        style={{ 
          height: panelHeight,
          scrollbarWidth: "none"
        }}
      >
        <motion.div
          initial={false}
          onMouseMove={({ pageX }) => {
            if (!isMounted) return;
            isHovered.set(1);
            mouseX.set(pageX);
          }}
          onMouseLeave={() => {
            if (!isMounted) return;
            isHovered.set(0);
            mouseX.set(Infinity);
          }}
          className={`${className} flex items-end w-fit gap-4 rounded-2xl border-neutral-700 border bg-black/30 backdrop-blur-md pb-2 px-4 mb-4`}
          style={{ height: panelHeight }}
          role="toolbar"
          aria-label="Application dock"
        >
          {dockItems.map((item, index) => (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          ))}
        </motion.div>
      </motion.div>

      <MoreMenu 
        isOpen={isMoreMenuOpen} 
        onClose={() => handleMoreMenuOpen(false)} 
      />
    </>
  );
} 