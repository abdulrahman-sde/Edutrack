"use client";

import { CalendarIcon, UsersIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useMyClasses } from "../hooks/use-teacher-data";
import { useAuth } from "@/hooks/use-auth";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type ScheduleEntry = {
  classId: string;
  className: string;
  section: string;
  subject: string;
  studentCount: number;
  startTime?: string;
  endTime?: string;
};

export function TeacherTimetable() {
  const { data: classes, loading } = useMyClasses();
  const { user } = useAuth();

  if (loading || !classes) {
    return (
      <Card className="p-4">
        <LoadingRows rows={8} />
      </Card>
    );
  }

  if (classes.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground">
        No classes assigned yet.
      </Card>
    );
  }

  const schedule: Record<number, ScheduleEntry[]> = { 0: [], 1: [], 2: [], 3: [], 4: [] };
  const unscheduled: ScheduleEntry[] = [];

  for (const c of classes) {
    for (const st of c.subjectTeachers) {
      if (st.teacherId !== user?.id) continue;
      const entry: ScheduleEntry = {
        classId: c.id,
        className: c.name,
        section: c.section,
        subject: st.subject,
        studentCount: c.studentCount,
        startTime: st.startTime ?? undefined,
        endTime: st.endTime ?? undefined,
      };
      if (st.dayOfWeek !== undefined && st.dayOfWeek !== null) {
        schedule[st.dayOfWeek].push(entry);
      } else {
        unscheduled.push(entry);
      }
    }
  }

  for (const day of Object.values(schedule)) {
    day.sort((a, b) => {
      if (!a.startTime) return 1;
      if (!b.startTime) return -1;
      return a.startTime.localeCompare(b.startTime);
    });
  }

  const hasSchedule = Object.values(schedule).some((d) => d.length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="size-5" />
          Weekly Timetable
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasSchedule && unscheduled.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">
            No classes assigned yet.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-5">
          {DAYS.map((dayName, dayIndex) => (
            <div key={dayName}>
              <h3 className="mb-2 text-center text-sm font-semibold text-muted-foreground">
                {dayName}
              </h3>
              <div className="space-y-2">
                {schedule[dayIndex].length === 0 && (
                  <p className="text-center text-xs text-muted-foreground/60 py-4">—</p>
                )}
                {schedule[dayIndex].map((entry) => (
                  <div
                    key={`${entry.classId}-${entry.subject}-${entry.startTime ?? "unsched"}`}
                    className="rounded-lg border bg-secondary/20 p-3"
                  >
                    <p className="text-sm font-medium">
                      {entry.className} · {entry.section}
                    </p>
                    <Badge variant="muted" className="mt-1.5 text-[10px]">
                      {entry.subject}
                    </Badge>
                    {entry.startTime && entry.endTime && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {entry.startTime} – {entry.endTime}
                      </p>
                    )}
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <UsersIcon className="size-3" />
                      {entry.studentCount} student{entry.studentCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {unscheduled.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
              Unscheduled
            </h3>
            <div className="flex flex-wrap gap-2">
              {unscheduled.map((entry) => (
                <div
                  key={`${entry.classId}-${entry.subject}-${entry.startTime ?? "unsched"}`}
                  className="rounded-lg border border-dashed bg-secondary/10 p-2"
                >
                  <p className="text-xs font-medium">
                    {entry.className} · {entry.section}
                  </p>
                  <Badge variant="muted" className="mt-1 text-[10px]">
                    {entry.subject}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
