"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useClasses } from "../hooks/use-admin-data";

export function ClassOverview() {
  const { data: classes, loading } = useClasses();
  const max = classes ? Math.max(...classes.map((c) => c.studentCount), 1) : 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment by class</CardTitle>
      </CardHeader>
      <CardContent>
        {loading || !classes ? (
          <LoadingRows rows={4} />
        ) : (
          <div className="flex h-72 w-full items-end justify-start gap-6">
            {classes.map((c) => (
              <div
                key={c.id}
                className="flex h-full w-full max-w-28 flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-sm font-semibold tabular-nums">{c.studentCount}</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-primary transition-[height] duration-500 ease-[var(--ease-out)]"
                    style={{ height: `${(c.studentCount / max) * 100}%` }}
                  />
                </div>
                <span className="text-center text-xs text-muted-foreground">
                  {c.name} · {c.section}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
