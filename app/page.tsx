"use client";

import { motion } from "framer-motion";
import { TopNav } from "@/components/top-nav";
import { SectionHeader } from "@/components/section-header";
import { HeroStat } from "@/components/hero-stat";
import { StatCard } from "@/components/stat-card";
import { MachineStatus } from "@/components/machine-status";
import { DataTable } from "@/components/data-table";
import { OrderForm } from "@/components/order-form";
import { InventoryPanel } from "@/components/inventory-panel";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.15 + i * 0.12, ease: "easeOut" },
  }),
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {/* ═══════════════════════════════════════════
            TIER 1 — HERO BLOCK  (dominant focal point)
            ═══════════════════════════════════════════ */}
        <section className="mb-8">
          <SectionHeader
            label="KEY METRICS"
            action={
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                March 2026
              </span>
            }
          />

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
            {/* Hero stat — takes 3 columns, tall, visually dominant */}
            <div className="lg:col-span-3">
              <HeroStat
                value="169"
                suffix="kg"
                label="Kilos Produced"
                subline="Total roasted output across all batches. Track cumulative weight, yield efficiency, and production velocity."
              />
            </div>

            {/* Supporting stats — stacked vertically in 2 columns, smaller text, secondary weight */}
            <div className="grid grid-cols-2 gap-px border border-border bg-border lg:col-span-2">
              <StatCard value="29" label="Total Roasts" suffix="#" delay={0.15} />
              <StatCard value="72" label="Success Rate" suffix="%" delay={0.2} />
              <StatCard value="$21" label="Avg Cost/kg" suffix="/kg" delay={0.25} />
              <StatCard
                value="6"
                label="Active Orders"
                suffix="open"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            TIER 1.5 — MACHINE STATUS (compact, informational strip)
            ═══════════════════════════════════════════ */}
        <section className="mb-8">
          <MachineStatus />
        </section>

        {/* ═══════════════════════════════════════════
            TIER 2 — ORDER LOG (primary working area)
            ═══════════════════════════════════════════ */}
        <motion.section
          className="mb-8"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={sectionVariants}
        >
          <SectionHeader
            label="ORDER LOG"
            action={
              <div className="flex gap-2">
                <motion.button
                  whileHover={{
                    y: -1,
                    boxShadow: "0 2px 8px rgba(17,17,17,0.08)",
                  }}
                  whileTap={{ y: 0, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="btn-interactive border border-foreground bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground hover:bg-foreground hover:text-surface"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  Export CSV
                </motion.button>
                <motion.button
                  whileHover={{
                    y: -1,
                    boxShadow: "0 2px 8px rgba(232,75,26,0.15)",
                  }}
                  whileTap={{ y: 0, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="btn-interactive bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-surface hover:bg-accent-hover"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  + New Order
                </motion.button>
              </div>
            }
          />
          <div className="mt-4">
            <DataTable />
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════
            TIER 3 — OPERATIONS (form + inventory, lowest urgency)
            ═══════════════════════════════════════════ */}
        <motion.section
          className="mb-10"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={sectionVariants}
        >
          <SectionHeader label="OPERATIONS" />
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <OrderForm />
            </div>
            <div className="lg:col-span-2">
              <InventoryPanel />
            </div>
          </div>
        </motion.section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            Untamed Roastery Internal Ops v2.1
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            2026
          </span>
        </div>
      </footer>
    </div>
  );
}
