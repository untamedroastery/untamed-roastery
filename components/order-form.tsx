"use client";

import { useState } from "react";
import { BEAN_CATALOG, ROAST_LEVELS, MACHINES, CHANNELS, fmtWeight } from "@/lib/data";

export function OrderForm() {
  const [client, setClient] = useState("");
  const [beanId, setBeanId] = useState("");
  const [roastLevel, setRoastLevel] = useState("medium");
  const [targetWeight, setTargetWeight] = useState("");
  const [unit, setUnit] = useState<"g" | "kg">("g");
  const [machineId, setMachineId] = useState("");
  const [channel, setChannel] = useState("retail");

  const bean = BEAN_CATALOG.find((b) => b.id === beanId);
  const level = ROAST_LEVELS.find((r) => r.id === roastLevel);
  const machine = MACHINES.find((m) => m.id === machineId);
  const grams = unit === "kg" ? parseFloat(targetWeight || "0") * 1000 : parseFloat(targetWeight || "0");
  const greenNeeded = level ? grams / (1 - level.loss) : 0;
  const rounds = machine && machine.capacity > 0 ? Math.ceil(greenNeeded / machine.capacity) : 0;

  return (
    <div className="border border-border bg-surface">
      {/* Form header strip */}
      <div className="flex items-center justify-between border-b border-border bg-accent px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-surface">
          New Roast Order
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-surface/60">
          -- FORM
        </span>
      </div>

      <div className="p-5">
        {/* Row 1: Client + Bean */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Client / Order Name
            </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="e.g. KNDZ, Wedding Favors..."
              className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted/50"
              style={{ borderRadius: "var(--radius)" }}
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Bean Origin
            </label>
            <select
              value={beanId}
              onChange={(e) => setBeanId(e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground"
              style={{ borderRadius: "var(--radius)" }}
            >
              <option value="">Select bean...</option>
              {BEAN_CATALOG.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.stockKg}kg)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Target Weight + Roast Level */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Target Roasted Weight
            </label>
            <div className="flex gap-0">
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                placeholder="e.g. 2000"
                className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted/50"
                style={{ borderRadius: "var(--radius) 0 0 var(--radius)" }}
              />
              <div className="flex flex-shrink-0 border border-l-0 border-border">
                {(["g", "kg"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-3 py-2.5 font-mono text-[11px] uppercase transition-colors ${
                      unit === u
                        ? "bg-accent text-surface"
                        : "bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Roast Level
            </label>
            <select
              value={roastLevel}
              onChange={(e) => setRoastLevel(e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground"
              style={{ borderRadius: "var(--radius)" }}
            >
              {ROAST_LEVELS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label} ({(l.loss * 100).toFixed(0)}% loss)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Machine
            </label>
            <select
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground"
              style={{ borderRadius: "var(--radius)" }}
            >
              <option value="">Select machine...</option>
              {MACHINES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.brand} {m.model} ({m.tag})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Channel */}
        <div className="mb-5">
          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            Sales Channel
          </label>
          <div className="flex gap-0">
            {CHANNELS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setChannel(ch.id)}
                className={`border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors first:rounded-l last:rounded-r ${
                  channel === ch.id
                    ? "border-accent bg-accent text-surface"
                    : "bg-surface text-muted hover:text-foreground"
                }`}
                style={{
                  marginLeft: ch.id !== "retail" ? "-1px" : undefined,
                  borderRadius:
                    ch.id === "retail"
                      ? "var(--radius) 0 0 var(--radius)"
                      : ch.id === "flavored"
                        ? "0 var(--radius) var(--radius) 0"
                        : "0",
                }}
              >
                {ch.label} ({ch.margin}%)
              </button>
            ))}
          </div>
        </div>

        {/* Calculation preview */}
        {grams > 0 && machine && (
          <div className="mb-5 border border-border bg-background p-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              -- CALCULATION PREVIEW
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "GREEN NEEDED", value: fmtWeight(Math.ceil(greenNeeded)) },
                { label: "ROUNDS", value: String(rounds) },
                { label: "LOSS", value: `${((level?.loss || 0) * 100).toFixed(0)}%` },
                { label: "COST/KG", value: bean ? `$${bean.costPerKg.toFixed(2)}` : "--" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    {item.label}
                  </div>
                  <div className="mt-1 text-lg font-bold text-foreground">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            className="bg-accent px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-surface transition-colors hover:bg-accent-hover"
            style={{ borderRadius: "var(--radius)" }}
          >
            Save to Log
          </button>
          <button
            className="border border-foreground bg-surface px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-foreground hover:text-surface"
            style={{ borderRadius: "var(--radius)" }}
          >
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
}
