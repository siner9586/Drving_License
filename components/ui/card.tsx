import { cn } from "@/lib/utils";

export function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("rounded-lg border border-slate-200 bg-white p-5 shadow-sm", className)}>{children}</div>;
}

export function StatCard({
  label,
  value,
  helper,
  className
}: {
  label: string;
  value: string;
  helper?: string;
  className?: string;
}) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-slate-950">{value}</div>
      {helper ? <div className="mt-1 text-xs text-slate-500">{helper}</div> : null}
    </Card>
  );
}
