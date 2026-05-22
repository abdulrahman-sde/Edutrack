"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
          <div className="space-y-4">
            {classes.map((c) => (
              <div key={c.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {c.name} · {c.section}
                  </span>
                  <span className="text-muted-foreground">{c.studentCount} students</span>
                </div>
                <Progress value={(c.studentCount / max) * 100} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
