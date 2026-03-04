interface SectionHeaderProps {
  label: string;
  action?: React.ReactNode;
}

export function SectionHeader({ label, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {"-- "}{label}
      </span>
      {action && <div>{action}</div>}
    </div>
  );
}
