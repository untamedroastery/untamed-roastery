"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = ["DASHBOARD", "ORDERS", "INVENTORY", "REPORTS"];

export function TopNav() {
  const [active, setActive] = useState("DASHBOARD");
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <header className="border-b border-border bg-surface">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <motion.h1
            className="text-xl font-bold tracking-tight text-foreground"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className="glitch-hover inline-block">Untamed</span>
            <motion.span
              className="inline-block text-accent"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              .
            </motion.span>
          </motion.h1>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted sm:block">
            Roast Operations
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="live-dot flex h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            LIVE
          </span>
        </div>
      </div>

      <nav ref={navRef} className="relative flex border-t border-border" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
            className={`
              relative px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors
              ${active === item ? "text-accent" : "text-muted hover:text-foreground"}
            `}
          >
            {/* Hover background */}
            <AnimatePresence>
              {hovered === item && active !== item && (
                <motion.span
                  className="absolute inset-0 bg-accent/[0.04]"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0, originX: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            <span className="relative z-10">{item}</span>

            {/* Active underline */}
            {active === item && (
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                layoutId="nav-underline"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>
    </header>
  );
}
