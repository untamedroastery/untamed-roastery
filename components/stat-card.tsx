interface StatCardProps {
  value: string;
  label: string;
  description: string;
  suffix?: string;
}

export function StatCard({ value, label, description, suffix }: StatCardProps) {
  return (
    <div className="flex overflow-hidden border border-border bg-surface">
      {/* Orange left column */}
      <div className="relative flex w-24 flex-shrink-0 flex-col items-start justify-end bg-accent p-4">
        <div className="hatch-pattern absolute inset-x-0 top-0 h-8 opacity-60" />
        <span className="text-[36px] font-bold leading-none tracking-tight text-surface">
          {value}
        </span>
        {suffix && (
          <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground font-mono text-[10px] text-surface">
            {suffix}
          </span>
        )}
      </div>

      {/* Right content column */}
      <div className="flex flex-col justify-center p-4">
        <h3 className="text-lg font-bold leading-tight tracking-tight text-foreground">
          {label}
        </h3>
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}
