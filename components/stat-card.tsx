"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

const GLITCH_CHARS = "!@#$%0123456789";

function useDecodedText(target: string, duration = 500) {
  const [display, setDisplay] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const steps = 7;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setDisplay(target);
        clearInterval(timer);
        return;
      }
      const decoded = target
        .split("")
        .map((char, i) => {
          if (i < (step / steps) * target.length) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
      setDisplay(decoded);
    }, interval);

    return () => clearInterval(timer);
  }, [target, duration]);

  return display;
}

export function StatCard({ value, label, suffix, delay = 0 }: StatCardProps) {
  const decodedValue = useDecodedText(value, 400);

  return (
    <motion.div
      className="animate-scan-line group flex cursor-default flex-col justify-between bg-surface p-4 transition-colors hover:bg-accent/[0.02]"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delay }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tight text-foreground">
          {decodedValue}
        </span>
        {suffix && (
          <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
            {suffix}
          </span>
        )}
      </div>
    </motion.div>
  );
}
