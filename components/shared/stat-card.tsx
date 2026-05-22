import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: number;
  trend?: "up" | "down";
  icon: LucideIcon;
}) {
  return (
    <Card className="gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-foreground">
          <Icon className="size-4" />
        </span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-medium tracking-tight">{value}</span>
        {delta !== undefined && trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              trend === "up" ? "text-emerald-400" : "text-destructive",
            )}
          >
            {trend === "up" ? (
              <ArrowUpRightIcon className="size-3" />
            ) : (
              <ArrowDownRightIcon className="size-3" />
            )}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
    </Card>
  );
}
