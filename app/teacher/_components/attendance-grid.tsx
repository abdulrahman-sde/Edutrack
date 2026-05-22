"use client";

import { useEffect, useState } from "react";
import { CheckIcon, XIcon, ClockIcon, PlaneIcon, SaveIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LoadingRows } from "@/components/shared/loading-rows";
import { cn } from "@/lib/utils";
import { useClassStudents } from "../hooks/use-teacher-data";
import type { AttendanceStatus } from "@/types/attendance";

const OPTIONS: { value: AttendanceStatus; label: string; icon: typeof CheckIcon; active: string }[] = [
  { value: "present", label: "Present", icon: CheckIcon, active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
  { value: "absent", label: "Absent", icon: XIcon, active: "bg-destructive/20 text-destructive border-destructive/40" },
  { value: "late", label: "Late", icon: ClockIcon, active: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
  { value: "leave", label: "Leave", icon: PlaneIcon, active: "bg-sky-500/20 text-sky-400 border-sky-500/40" },
];

export function AttendanceGrid({ classId }: { classId: string | undefined }) {
  const { data: students, loading } = useClassStudents(classId);
  const [marks, setMarks] = useState<Record<string, AttendanceStatus>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (students) {
      setMarks(Object.fromEntries(students.map((s) => [s.id, "present" as const])));
      setSaved(false);
    }
  }, [students]);

  if (loading || !students) {
    return (
      <Card className="p-4">
        <LoadingRows rows={5} />
      </Card>
    );
  }

  const counts = OPTIONS.map((o) => ({
    ...o,
    count: Object.values(marks).filter((m) => m === o.value).length,
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {counts.map((c) => (
          <span key={c.value} className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className={cn("size-2 rounded-full", c.active.split(" ")[0])} />
            {c.label}: <span className="font-medium text-foreground">{c.count}</span>
          </span>
        ))}
        <Button
          className="ml-auto"
          onClick={() => setSaved(true)}
          variant={saved ? "secondary" : "default"}
        >
          <SaveIcon data-icon="inline-start" />
          {saved ? "Saved" : "Save attendance"}
        </Button>
      </div>

      <Card className="py-0">
        <CardContent className="divide-y divide-border/60 p-0">
          {students.map((s) => (
            <div key={s.id} className="flex items-center gap-3 px-4 py-3">
              <Avatar className="size-8">
                <AvatarImage src={s.avatarUrl} alt={s.name} />
                <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{s.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{s.rollNo}</p>
              </div>
              <div className="flex gap-1.5">
                {OPTIONS.map((o) => {
                  const active = marks[s.id] === o.value;
                  const Icon = o.icon;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => {
                        setMarks((m) => ({ ...m, [s.id]: o.value }));
                        setSaved(false);
                      }}
                      title={o.label}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg border transition-all active:scale-95",
                        active
                          ? o.active
                          : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/60",
                      )}
                    >
                      <Icon className="size-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
