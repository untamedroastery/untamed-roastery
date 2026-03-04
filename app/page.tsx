"use client";

import { motion } from "framer-motion";
import { TopNav } from "@/components/top-nav";
import { SectionHeader } from "@/components/section-header";
import { StatCard } from "@/components/stat-card";
import { DataTable } from "@/components/data-table";
import { OrderForm } from "@/components/order-form";
import { InventoryPanel } from "@/components/inventory-panel";
import { MachineGrid } from "@/components/machine-grid";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

function AnimatedButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  return (
    <motion.button
      whileHover={{ y: -1, boxShadow: "0 2px 8px rgba(17,17,17,0.08)" }}
      whileTap={{ y: 0, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`btn-interactive font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
        variant === "primary"
          ? "bg-accent px-3 py-1.5 text-surface hover:bg-accent-hover"
          : "border border-foreground bg-surface px-3 py-1.5 text-foreground hover:bg-foreground hover:text-surface"
      }`}
      style={{ borderRadius: "var(--radius)" }}
    >
      {children}
    </motion.button>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {/* ── STATS ROW ── */}
        <motion.section
          className="mb-10"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={sectionVariants}
        >
          <SectionHeader
            label="KEY METRICS"
            action={
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                March 2026
              </span>
            }
          />
          <div className="mt-4 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              value="29"
              label="Total Roasts"
              description="Completed batches this month across all machines."
              suffix="#"
            />
            <StatCard
              value="72"
              label="Campaign Success"
              description="Performance score and engagement statistics for Q1."
              suffix="%"
            />
            <StatCard
              value="169"
              label="Kilos Produced"
              description="Total roasted output in kg for current period."
              suffix="kg"
            />
            <StatCard
              value="$21"
              label="Avg Cost/kg"
              description="Weighted average green bean cost per kilogram."
              suffix="/kg"
            />
          </div>
        </motion.section>

        {/* ── ORDER LOG TABLE ── */}
        <motion.section
          className="mb-10"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={sectionVariants}
        >
          <SectionHeader
            label="ORDER LOG"
            action={
              <div className="flex gap-2">
                <AnimatedButton variant="outline">Export CSV</AnimatedButton>
                <AnimatedButton variant="primary">+ New Order</AnimatedButton>
              </div>
            }
          />
          <div className="mt-4">
            <DataTable />
          </div>
        </motion.section>

        {/* ── NEW ORDER FORM + INVENTORY SIDE-BY-SIDE ── */}
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

        {/* ── MACHINES ── */}
        <motion.section
          className="mb-10"
          initial="hidden"
          animate="visible"
          custom={3}
          variants={sectionVariants}
        >
          <SectionHeader label="MACHINES" />
          <div className="mt-4">
            <MachineGrid />
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
