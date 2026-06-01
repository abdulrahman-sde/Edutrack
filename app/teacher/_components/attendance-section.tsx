"use client";

import { useState } from "react";
import { ClassPicker } from "./class-picker";
import { SubjectPicker } from "./subject-picker";
import { AttendanceGrid } from "./attendance-grid";
import { useMyClasses } from "../hooks/use-teacher-data";

export function AttendanceSection() {
  const { data: classes, loading } = useMyClasses();
  const [classId, setClassId] = useState<string | undefined>();
  const resolvedClassId = classId ?? classes?.[0]?.id;
  const selectedClass = classes?.find((c) => c.id === resolvedClassId);
  const subjects = [...new Map(selectedClass?.subjectTeachers.map((st) => [st.subject, st]) ?? []).values()];
  const [subject, setSubject] = useState("");

  const validSubject = subjects.some((s) => s.subject === subject) ? subject : (subjects[0]?.subject ?? "");

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-sm text-muted-foreground">
        No classes assigned to you.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Class</span>
        <ClassPicker classes={classes} value={resolvedClassId} onChange={setClassId} />
        {subjects.length > 1 ? (
          <>
            <span className="text-sm text-muted-foreground">Subject</span>
            <SubjectPicker subjects={subjects} value={subject} onChange={setSubject} />
          </>
        ) : subjects.length === 1 ? (
          <span className="text-sm text-muted-foreground">
            Subject: <span className="font-medium text-foreground">{subjects[0].subject}</span>
          </span>
        ) : null}
        <span className="ml-auto text-sm text-muted-foreground">
          Today · {new Date().toISOString().split("T")[0]}
        </span>
      </div>
      {subjects.length === 0 && resolvedClassId ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-center text-sm text-destructive">
          No subject assigned to you in this class. Contact the admin to set up your subjects.
        </div>
      ) : null}
      <AttendanceGrid key={`${resolvedClassId}-${validSubject}`} classId={resolvedClassId} subject={validSubject} />
    </div>
  );
}
