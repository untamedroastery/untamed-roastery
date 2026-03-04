import { TopNav } from "@/components/top-nav";
import { SectionHeader } from "@/components/section-header";
import { StatCard } from "@/components/stat-card";
import { DataTable } from "@/components/data-table";
import { OrderForm } from "@/components/order-form";
import { InventoryPanel } from "@/components/inventory-panel";
import { MachineGrid } from "@/components/machine-grid";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {/* ── STATS ROW ── */}
        <section className="mb-10">
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
        </section>

        {/* ── ORDER LOG TABLE ── */}
        <section className="mb-10">
          <SectionHeader
            label="ORDER LOG"
            action={
              <div className="flex gap-2">
                <button
                  className="border border-foreground bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-foreground hover:text-surface"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  Export CSV
                </button>
                <button
                  className="bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-surface transition-colors hover:bg-accent-hover"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  + New Order
                </button>
              </div>
            }
          />
          <div className="mt-4">
            <DataTable />
          </div>
        </section>

        {/* ── NEW ORDER FORM + INVENTORY SIDE-BY-SIDE ── */}
        <section className="mb-10">
          <SectionHeader label="OPERATIONS" />
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <OrderForm />
            </div>
            <div className="lg:col-span-2">
              <InventoryPanel />
            </div>
          </div>
        </section>

        {/* ── MACHINES ── */}
        <section className="mb-10">
          <SectionHeader label="MACHINES" />
          <div className="mt-4">
            <MachineGrid />
          </div>
        </section>
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
