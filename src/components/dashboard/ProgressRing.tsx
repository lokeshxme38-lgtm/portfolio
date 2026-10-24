import { motion } from "motion/react";
import { AnimatedNumber } from "./AnimatedNumber";

interface ProgressRingProps {
  /** Solved count; `null` renders an empty ring with a dash. */
  value: number | null;
  total: number | null;
  size?: number;
}

export function ProgressRing({ value, total, size = 168 }: ProgressRingProps) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const fraction = value !== null && total ? Math.min(value / total, 1) : 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-line/50" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="text-accent"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: fraction }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-semibold tracking-tight text-fg">
          {value !== null ? <AnimatedNumber value={value} /> : "—"}
        </span>
        <span className="mono mt-1 text-[0.7rem] text-muted">solved</span>
      </div>
    </div>
  );
}
