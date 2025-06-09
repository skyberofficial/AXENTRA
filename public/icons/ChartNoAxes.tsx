"use client";

import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

interface ChartNoAxesProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const frameVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 1 },
};

const lineVariants: Variants = {
  visible: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
};

const ChartNoAxes = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}: ChartNoAxesProps) => {
  const controls = useAnimation();

  const handleHoverStart = async () => {
    await controls.start((i) => ({
      pathLength: 0,
      opacity: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }));
    await controls.start((i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 },
    }));
  };

  const handleHoverEnd = () => {
    controls.start("visible");
  };

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
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
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
          variants={lineVariants}
          initial="visible"
          animate={controls}
          custom={5}
          d="M12 16v5"
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={controls}
          custom={4}
          d="M16 14v7"
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={controls}
          custom={3}
          d="M20 10v11"
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={controls}
          custom={2}
          d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={controls}
          custom={1}
          d="M4 18v3"
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={controls}
          custom={0}
          d="M8 14v7"
        />
      </svg>
    </div>
  );
};

export { ChartNoAxes };
