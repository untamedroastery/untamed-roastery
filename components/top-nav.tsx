"use client";

import { useState } from "react";

const NAV_ITEMS = ["DASHBOARD", "ORDERS", "INVENTORY", "MACHINES", "REPORTS"];

export function TopNav() {
  const [active, setActive] = useState("DASHBOARD");

  return (
    <header className="border-b border-border bg-surface">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Untamed<span className="text-accent">.</span>
          </h1>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted sm:block">
            Roast Operations
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="mr-4 flex h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            LIVE
          </span>
        </div>
      </div>

      <nav className="flex border-t border-border" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`
              relative px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors
              ${
                active === item
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }
            `}
          >
            {item}
            {active === item && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
            )}
          </button>
        ))}
      </nav>
    </header>
  );
}
