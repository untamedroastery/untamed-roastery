"use client";

import { motion } from "framer-motion";
import { MACHINES } from "@/lib/data";

export function MachineStatus() {
  return (
    <motion.div
      className="flex items-stretch border border-border bg-surface"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.35 }}
    >
      <div className="flex items-center border-r border-border px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          Machines
        </span>
      </div>

      {MACHINES.map((machine, i) => (
        <motion.div
          key={machine.id}
          className={`group flex flex-1 cursor-default items-center justify-between px-4 py-2.5 transition-colors hover:bg-accent/[0.03] ${
            i < MACHINES.length - 1 ? "border-r border-border" : ""
          }`}
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-2 w-2 rounded-full ${
                machine.status === "roasting"
                  ? "live-dot bg-accent"
                  : "bg-muted/40"
              }`}
            />
            <span className="text-sm font-medium text-foreground">
              {machine.brand} {machine.model}
            </span>
            <span className="font-mono text-[10px] uppercase text-muted opacity-0 transition-opacity group-hover:opacity-100">
              {machine.tag}
            </span>
          </div>

          <span
            className={`font-mono text-[10px] uppercase tracking-[0.08em] ${
              machine.status === "roasting" ? "text-accent" : "text-muted"
            }`}
          >
            {machine.status}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
