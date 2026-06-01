"use client";

import { useState, useEffect, useReducer } from "react";
import { CheckIcon, XIcon, ClockIcon, PlaneIcon, SaveIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LoadingRows } from "@/components/shared/loading-rows";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { useClassStudents, useAttendanceRecords } from "../hooks/use-teacher-data";
import type { AttendanceStatus } from "@/types/attendance";

const OPTIONS: { value: AttendanceStatus; label: string; icon: typeof CheckIcon; active: string }[] = [
  { value: "present", label: "Present", icon: CheckIcon, active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
  { value: "absent", label: "Absent", icon: XIcon, active: "bg-destructive/20 text-destructive border-destructive/40" },
  { value: "late", label: "Late", icon: ClockIcon, active: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
  { value: "leave", label: "Leave", icon: PlaneIcon, active: "bg-sky-500/20 text-sky-400 border-sky-500/40" },
];

type MarksAction =
  | { type: "init"; records: Record<string, AttendanceStatus>; now: number }
  | { type: "set"; studentId: string; status: AttendanceStatus }
  | { type: "save"; now: number };

type MarksState = {
  marks: Record<string, AttendanceStatus>;
  lastSaved: number;
};

function marksReducer(state: MarksState, action: MarksAction): MarksState {
  switch (action.type) {
    case "init":
      return { marks: { ...action.records }, lastSaved: action.now };
    case "set":
      return { ...state, marks: { ...state.marks, [action.studentId]: action.status } };
    case "save":
      return { ...state, lastSaved: action.now };
  }
}

export function AttendanceGrid({ classId, subject }: { classId: string | undefined; subject: string }) {
  const { data: students, loading, error: loadError } = useClassStudents(classId);
  const { data: existingRecords } = useAttendanceRecords(classId, subject);
  const [{ marks, lastSaved }, dispatch] = useReducer(marksReducer, { marks: {} as Record<string, AttendanceStatus>, lastSaved: 0 });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (existingRecords && existingRecords.length > 0) {
      dispatch({
        type: "init",
        records: Object.fromEntries(
          existingRecords.map((r) => [r.studentId, r.status.toLowerCase() as AttendanceStatus]),
        ),
        now: Date.now(),
      });
    }
  }, [existingRecords]);

  if (loading) {
    return (
      <Card className="p-4">
        <LoadingRows rows={5} />
      </Card>
    );
  }

  if (loadError) {
    return (
      <Card className="rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-center text-sm text-destructive">
        Failed to load students. Please try again.
      </Card>
    );
  }

  if (!students || students.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground">
        No students enrolled in this class.
      </Card>
    );
  }

  const allMarked = students.every((s) => marks[s.id]);
  const markedCount = Object.keys(marks).length;

  const counts = OPTIONS.map((o) => ({
    ...o,
    count: Object.values(marks).filter((m) => m === o.value).length,
  }));

  async function handleSave() {
    if (!classId || !subject || !allMarked) return;
    setSaving(true);
    setSaveError(null);

    try {
      await apiClient(`/classes/${classId}/attendance`, {
        method: "POST",
        body: JSON.stringify({
          date: new Date().toISOString().split("T")[0],
          subject,
          records: Object.entries(marks).map(([studentId, status]) => ({
            studentId,
            status,
          })),
        }),
      });

      dispatch({ type: "save", now: Date.now() });
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Failed to save attendance");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {counts.map((c) => (
          <span key={c.value} className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className={cn("size-2 rounded-full", c.active.split(" ")[0])} />
            {c.label}: <span className="font-medium text-foreground">{c.count}</span>
          </span>
        ))}
        {!allMarked && (
          <span className="text-xs text-muted-foreground">
            {markedCount}/{students.length} marked
          </span>
        )}
        <span className="ml-auto self-center text-xs text-muted-foreground">
          {lastSaved > 0 ? `Last saved ${new Date(lastSaved).toLocaleTimeString()}` : null}
        </span>
        <Button
          onClick={handleSave}
          disabled={!allMarked || saving || !subject}
          title={!subject ? "No subject selected" : undefined}
        >
          <SaveIcon data-icon="inline-start" />
          {saving ? "Saving…" : "Save attendance"}
        </Button>
      </div>

      {!subject && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          Select a subject before saving attendance.
        </div>
      )}

      {saveError && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          {saveError}
        </div>
      )}

      <Card className="py-0">
        <CardContent className="divide-y divide-border/60 p-0">
          {students.map((s) => (
            <div key={s.id} className="flex items-center gap-3 px-4 py-3">
              <Avatar className="size-8">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(s.name)}`}
                  alt={s.name}
                />
                <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{s.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{s.admissionNumber}</p>
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
                        dispatch({ type: "set", studentId: s.id, status: o.value });
                        setSaveError(null);
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
