"use client";

import { useEffect, useState } from "react";
import { ClassPicker } from "./class-picker";
import { AttendanceGrid } from "./attendance-grid";
import { useMyClasses } from "../hooks/use-teacher-data";

export function AttendanceSection() {
  const { data: classes } = useMyClasses();
  const [classId, setClassId] = useState<string>();

  useEffect(() => {
    if (classes?.length && !classId) setClassId(classes[0].id);
  }, [classes, classId]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Class</span>
        <ClassPicker classes={classes} value={classId} onChange={setClassId} />
        <span className="ml-auto text-sm text-muted-foreground">Today · 2026-05-22</span>
      </div>
      <AttendanceGrid classId={classId} />
    </div>
  );
}
