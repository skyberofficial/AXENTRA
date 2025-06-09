"use client";

import { motion, useAnimation } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { SVGProps } from 'react';

interface BoxProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const transition: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};

const variants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...transition,
      delay: 0.1 * custom,
    },
  }),
};

const Box = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}: BoxProps) => {
  const controls = useAnimation();

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <motion.path
          d="M21 8V21H3V8"
          variants={variants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M3 4h18"
          variants={variants}
          animate={controls}
          custom={1}
        />
        <motion.path
          d="M12 12h.01"
          variants={variants}
          animate={controls}
          custom={2}
        />
      </svg>
    </div>
  );
};

export { Box };
