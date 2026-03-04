"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  description: string;
  suffix?: string;
}

const GLITCH_CHARS = "!@#$%^&*0123456789";

function useDecodedText(target: string, duration = 600) {
  const [display, setDisplay] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const steps = 8;
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

export function StatCard({ value, label, description, suffix }: StatCardProps) {
  const decodedValue = useDecodedText(value, 500);

  return (
    <motion.div
      className="animate-scan-line card-hover flex overflow-hidden border border-border bg-surface"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Orange left column */}
      <div className="relative flex w-24 flex-shrink-0 flex-col items-start justify-end bg-accent p-4">
        <div className="hatch-pattern absolute inset-x-0 top-0 h-8 opacity-60" />
        <span className="text-[36px] font-bold leading-none tracking-tight text-surface">
          {decodedValue}
        </span>
        {suffix && (
          <motion.span
            className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground font-mono text-[10px] text-surface"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
          >
            {suffix}
          </motion.span>
        )}
      </div>

      {/* Right content column */}
      <div className="flex flex-col justify-center p-4">
        <h3 className="text-lg font-bold leading-tight tracking-tight text-foreground">
          {label}
        </h3>
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
