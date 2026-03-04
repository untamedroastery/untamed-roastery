"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SAMPLE_ORDERS, fmtWeight, fmtTime, type OrderEntry } from "@/lib/data";
import { StatusBadge } from "./status-badge";

type SortKey = keyof OrderEntry;
type SortDir = "asc" | "desc";

export function DataTable() {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [clickedRow, setClickedRow] = useState<number | null>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function handleRowClick(id: number) {
    setClickedRow(id);
    setTimeout(() => setClickedRow(null), 400);
  }

  const sorted = [...SAMPLE_ORDERS].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const columns: { key: SortKey; label: string; align?: "right" }[] = [
    { key: "date", label: "DATE" },
    { key: "client", label: "CLIENT" },
    { key: "bean", label: "BEAN ORIGIN" },
    { key: "level", label: "LEVEL" },
    { key: "gramsTarget", label: "TARGET", align: "right" },
    { key: "greenNeeded", label: "GREEN", align: "right" },
    { key: "machine", label: "MACHINE" },
    { key: "rounds", label: "RNDS", align: "right" },
    { key: "totalTime", label: "TIME", align: "right" },
    { key: "costPerKg", label: "COST/KG", align: "right" },
    { key: "status", label: "STATUS" },
  ];

  return (
    <div className="overflow-x-auto border border-border bg-surface">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`
                  cursor-pointer whitespace-nowrap px-4 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent
                  ${col.align === "right" ? "text-right" : "text-left"}
                `}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  <AnimatePresence mode="wait">
                    {sortKey === col.key && (
                      <motion.span
                        key={sortDir}
                        initial={{ opacity: 0, y: sortDir === "asc" ? 4 : -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: sortDir === "asc" ? -4 : 4 }}
                        transition={{ duration: 0.15 }}
                      >
                        {sortDir === "asc" ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((order, index) => (
            <motion.tr
              key={order.id}
              onClick={() => handleRowClick(order.id)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className={`
                table-row-hover cursor-pointer border-b border-border last:border-b-0
                ${clickedRow === order.id ? "!bg-accent/[0.08]" : ""}
              `}
              style={{
                transition: clickedRow === order.id ? "background-color 0.1s ease" : undefined,
              }}
            >
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted">
                {order.date}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-foreground">
                {order.client}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">
                {order.bean}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground">
                {order.level}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs font-semibold text-foreground">
                {fmtWeight(order.gramsTarget)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs text-muted">
                {fmtWeight(order.greenNeeded)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">
                {order.machine}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs text-foreground">
                {order.rounds}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs text-muted">
                {fmtTime(order.totalTime)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs font-semibold text-foreground">
                ${order.costPerKg.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusBadge status={order.status} />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
