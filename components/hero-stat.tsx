"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface HeroStatProps {
  value: string;
  suffix: string;
  label: string;
  subline: string;
}

const GLITCH_CHARS = "!@#$%^&*0123456789ABCDEF";

function useDecodedText(target: string, duration = 800) {
  const [display, setDisplay] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const steps = 12;
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

export function HeroStat({ value, suffix, label, subline }: HeroStatProps) {
  const decodedValue = useDecodedText(value, 900);

  return (
    <motion.div
      className="card-hover animate-scan-line relative flex overflow-hidden border border-border bg-surface"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Large orange block */}
      <div className="relative flex w-[140px] flex-shrink-0 flex-col items-start justify-end bg-accent p-6 lg:w-[180px]">
        <div className="hatch-pattern absolute inset-x-0 top-0 h-12 opacity-50" />
        <span className="relative z-10 text-[64px] font-bold leading-none tracking-tighter text-surface lg:text-[80px]">
          {decodedValue}
        </span>
        <motion.span
          className="relative z-10 mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-mono text-xs text-surface"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 250, delay: 0.7 }}
        >
          {suffix}
        </motion.span>
      </div>

      {/* Right content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <motion.h2
            className="text-2xl font-bold leading-tight tracking-tight text-foreground lg:text-3xl"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {label}
          </motion.h2>
          <motion.p
            className="mt-2 max-w-xs font-mono text-xs leading-relaxed text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {subline}
          </motion.p>
        </div>

        {/* Navigation arrows like the Impact reference */}
        <motion.div
          className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="cursor-pointer transition-colors hover:text-accent" aria-label="Previous metric">
            {"<-"}
          </span>
          <span className="text-foreground">period: Q1 2026</span>
          <span className="cursor-pointer transition-colors hover:text-accent" aria-label="Next metric">
            {"->"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
