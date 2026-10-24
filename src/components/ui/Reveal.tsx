import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
}

/**
 * Scroll-triggered entrance. Plays once per element (never repeats on
 * re-scroll). Reduced-motion is handled globally by <MotionConfig reducedMotion="user">.
 */
export function Reveal({ children, delay = 0, y = 18, className, as = "div" }: RevealProps) {
  const motionProps = {
    className,
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  if (as === "li") return <motion.li {...motionProps}>{children}</motion.li>;
  return <motion.div {...motionProps}>{children}</motion.div>;
}
