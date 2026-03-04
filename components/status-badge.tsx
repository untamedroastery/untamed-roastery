"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    pending: "border-amber-600 text-amber-700 bg-amber-50",
    "in-progress": "border-accent text-accent bg-accent/5",
    completed: "border-green-600 text-green-700 bg-green-50",
    delivered: "border-foreground text-foreground bg-foreground/5",
  };

  const isActive = status === "in-progress" || status === "pending";

  return (
    <motion.span
      className={cn(
        "inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]",
        isActive && "badge-pulse",
        styles[status] || "border-border text-muted"
      )}
      style={{ borderRadius: "var(--radius)" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {status.replace("-", " ")}
    </motion.span>
  );
}
