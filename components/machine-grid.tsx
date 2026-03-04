"use client";

import { motion } from "framer-motion";
import { MACHINES } from "@/lib/data";

export function MachineGrid() {
  return (
    <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {MACHINES.map((machine, index) => (
        <motion.div
          key={machine.id}
          className="card-hover animate-scan-line flex flex-col bg-surface p-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
          whileHover={{ scale: 1.015 }}
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                {machine.brand}
              </span>
              <h4 className="mt-0.5 text-base font-bold text-foreground">{machine.model}</h4>
            </div>
            <motion.span
              className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted"
              style={{ borderRadius: "var(--radius)" }}
              whileHover={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
              transition={{ duration: 0.15 }}
            >
              {machine.tag}
            </motion.span>
          </div>

          <div className="mt-auto flex gap-3">
            <div className="border-l-2 border-accent pl-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">Capacity</div>
              <div className="text-sm font-semibold text-foreground">
                {machine.capacity >= 1000
                  ? `${(machine.capacity / 1000).toFixed(0)}kg`
                  : `${machine.capacity}g`}
              </div>
            </div>
            <div className="border-l border-border pl-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">Type</div>
              <div className="text-sm text-foreground">{machine.type}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
