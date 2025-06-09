"use client";

import { SVGProps } from 'react';

interface ChevronUpProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export function ChevronUp({
  width = 24,
  height = 24,
  strokeWidth = 1.5,
  ...props
}: ChevronUpProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
