"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BEAN_CATALOG, ROAST_LEVELS, MACHINES, CHANNELS, fmtWeight } from "@/lib/data";

function Ripple({ x, y }: { x: number; y: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute rounded-full bg-surface/30"
      style={{ left: x, top: y, width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
      initial={{ scale: 0, opacity: 0.6 }}
      animate={{ scale: 6, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
}

export function OrderForm() {
  const [client, setClient] = useState("");
  const [beanId, setBeanId] = useState("");
  const [roastLevel, setRoastLevel] = useState("medium");
  const [targetWeight, setTargetWeight] = useState("");
  const [unit, setUnit] = useState<"g" | "kg">("g");
  const [machineId, setMachineId] = useState("");
  const [channel, setChannel] = useState("retail");
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const bean = BEAN_CATALOG.find((b) => b.id === beanId);
  const level = ROAST_LEVELS.find((r) => r.id === roastLevel);
  const machine = MACHINES.find((m) => m.id === machineId);
  const grams = unit === "kg" ? parseFloat(targetWeight || "0") * 1000 : parseFloat(targetWeight || "0");
  const greenNeeded = level ? grams / (1 - level.loss) : 0;
  const rounds = machine && machine.capacity > 0 ? Math.ceil(greenNeeded / machine.capacity) : 0;

  const addRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  return (
    <div className="border border-border bg-surface">
      {/* Form header strip */}
      <motion.div
        className="flex items-center justify-between border-b border-border bg-accent px-5 py-3"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-surface">
          New Roast Order
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-surface/60">
          -- FORM
        </span>
      </motion.div>

      <div className="p-5">
        {/* Row 1: Client + Bean */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Client / Order Name
            </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="e.g. KNDZ, Wedding Favors..."
              className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground transition-all duration-200 placeholder:text-muted/50"
              style={{ borderRadius: "var(--radius)" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Bean Origin
            </label>
            <select
              value={beanId}
              onChange={(e) => setBeanId(e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground transition-all duration-200"
              style={{ borderRadius: "var(--radius)" }}
            >
              <option value="">Select bean...</option>
              {BEAN_CATALOG.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.stockKg}kg)
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        {/* Row 2: Target Weight + Roast Level + Machine */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Target Roasted Weight
            </label>
            <div className="flex gap-0">
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                placeholder="e.g. 2000"
                className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground transition-all duration-200 placeholder:text-muted/50"
                style={{ borderRadius: "var(--radius) 0 0 var(--radius)" }}
              />
              <div className="flex flex-shrink-0 border border-l-0 border-border">
                {(["g", "kg"] as const).map((u) => (
                  <motion.button
                    key={u}
                    onClick={() => setUnit(u)}
                    whileTap={{ scale: 0.9 }}
                    className={`px-3 py-2.5 font-mono text-[11px] uppercase transition-colors ${
                      unit === u
                        ? "bg-accent text-surface"
                        : "bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    {u}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Roast Level
            </label>
            <select
              value={roastLevel}
              onChange={(e) => setRoastLevel(e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground transition-all duration-200"
              style={{ borderRadius: "var(--radius)" }}
            >
              {ROAST_LEVELS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label} ({(l.loss * 100).toFixed(0)}% loss)
                </option>
              ))}
            </select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              Machine
            </label>
            <select
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground transition-all duration-200"
              style={{ borderRadius: "var(--radius)" }}
            >
              <option value="">Select machine...</option>
              {MACHINES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.brand} {m.model} ({m.tag})
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        {/* Row 3: Channel */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            Sales Channel
          </label>
          <div className="flex gap-0">
            {CHANNELS.map((ch) => (
              <motion.button
                key={ch.id}
                onClick={() => setChannel(ch.id)}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Calculation preview */}
        <AnimatePresence>
          {grams > 0 && machine && (
            <motion.div
              className="mb-5 border border-border bg-background p-4"
              initial={{ height: 0, opacity: 0, overflow: "hidden" }}
              animate={{ height: "auto", opacity: 1, overflow: "visible" }}
              exit={{ height: 0, opacity: 0, overflow: "hidden" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                -- CALCULATION PREVIEW
              </div>
              <div className="stagger-fade-in grid grid-cols-2 gap-3 md:grid-cols-4">
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={addRipple}
            className="btn-interactive relative overflow-hidden bg-accent px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-surface"
            style={{ borderRadius: "var(--radius)" }}
          >
            <span className="relative z-10">Save to Log</span>
            {ripples.map((r) => (
              <Ripple key={r.id} x={r.x} y={r.y} />
            ))}
          </button>
          <button
            className="btn-interactive border border-foreground bg-surface px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-foreground hover:bg-foreground hover:text-surface"
            style={{ borderRadius: "var(--radius)" }}
          >
            Reset Form
          </button>
        </motion.div>
      </div>
    </div>
  );
}
