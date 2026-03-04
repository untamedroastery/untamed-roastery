"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { BEAN_CATALOG } from "@/lib/data";

export function InventoryPanel() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          -- BEAN INVENTORY
        </span>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-interactive flex items-center gap-1.5 border border-foreground bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground hover:bg-foreground hover:text-surface"
          style={{ borderRadius: "var(--radius)" }}
        >
          <Plus className="h-3 w-3" />
          Add Bean
        </motion.button>
      </div>

      {/* Accordion rows */}
      {BEAN_CATALOG.map((bean) => {
        const isOpen = openId === bean.id;
        return (
          <div key={bean.id} className="border-b border-border last:border-b-0">
            <button
              onClick={() => setOpenId(isOpen ? null : bean.id)}
              className="table-row-hover flex w-full items-center justify-between px-5 py-3.5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground">{bean.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                  {bean.origin}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold text-foreground">
                  {bean.stockKg}kg
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`flex h-6 w-6 items-center justify-center border transition-colors ${
                    isOpen
                      ? "border-accent bg-accent text-surface"
                      : "border-accent bg-surface text-accent"
                  }`}
                  style={{ borderRadius: "var(--radius)" }}
                >
                  <Plus className="h-3 w-3" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={bean.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border bg-background px-5 py-4">
                    <div className="stagger-fade-in grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                          Processing
                        </div>
                        <div className="mt-1 text-sm font-medium text-foreground">
                          {bean.processing}
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                          Cost / KG
                        </div>
                        <div className="mt-1 text-sm font-medium text-foreground">
                          ${bean.costPerKg.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                          Stock Level
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden bg-border">
                            <motion.div
                              className="h-full bg-accent"
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((bean.stockKg / 60) * 100, 100)}%` }}
                              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                            />
                          </div>
                          <span className="font-mono text-[10px] text-muted">{bean.stockKg}kg</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                          Total Value
                        </div>
                        <div className="mt-1 text-sm font-semibold text-foreground">
                          ${(bean.costPerKg * bean.stockKg).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
