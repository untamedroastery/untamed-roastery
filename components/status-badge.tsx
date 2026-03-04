import { cn } from "@/lib/utils";

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

  return (
    <span
      className={cn(
        "inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]",
        styles[status] || "border-border text-muted"
      )}
      style={{ borderRadius: "var(--radius)" }}
    >
      {status.replace("-", " ")}
    </span>
  );
}
