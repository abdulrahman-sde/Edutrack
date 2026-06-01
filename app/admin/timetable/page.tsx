"use client";

import { useState, useEffect } from "react";
import { PlusIcon, XIcon, SaveIcon, ClockIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LoadingRows } from "@/components/shared/loading-rows";
import {
  useClass,
  useClasses,
  useTeachers,
  useUpdateClass,
} from "../hooks/use-admin-data";

type Slot = {
  _id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

type SubjectEntry = {
  _id: string;
  subject: string;
  teacherId: string;
  slots: Slot[];
};

let idCounter = 1;
function newId() {
  return `id_${idCounter++}`;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

function groupSubjects(
  entries: { subject: string; teacherId: string; dayOfWeek?: number; startTime?: string; endTime?: string }[],
): SubjectEntry[] {
  const map = new Map<string, SubjectEntry>();
  for (const e of entries) {
    if (!map.has(e.subject)) {
      map.set(e.subject, { _id: newId(), subject: e.subject, teacherId: e.teacherId, slots: [] });
    }
    const entry = map.get(e.subject)!;
    if (!entry.teacherId) entry.teacherId = e.teacherId;
    if (e.dayOfWeek != null) {
      entry.slots.push({
        _id: newId(),
        dayOfWeek: e.dayOfWeek,
        startTime: e.startTime ?? "",
        endTime: e.endTime ?? "",
      });
    }
  }
  return [...map.values()];
}

function flatten(subjects: SubjectEntry[]): { subject: string; teacherId: string; dayOfWeek?: number; startTime?: string; endTime?: string }[] {
  const out: { subject: string; teacherId: string; dayOfWeek?: number; startTime?: string; endTime?: string }[] = [];
  for (const s of subjects) {
    if (!s.subject.trim() || !s.teacherId) continue;
    if (s.slots.length === 0) {
      out.push({ subject: s.subject, teacherId: s.teacherId });
    } else {
      for (const sl of s.slots) {
        out.push({ subject: s.subject, teacherId: s.teacherId, dayOfWeek: sl.dayOfWeek, startTime: sl.startTime, endTime: sl.endTime });
      }
    }
  }
  return out;
}

export default function TimetablePage() {
  const { data: allClasses } = useClasses();
  const { data: allTeachers } = useTeachers();

  const [classId, setClassId] = useState<string | null>(null);
  const { data: classData, loading: classLoading } = useClass(classId ?? undefined);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Timetable Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add subjects, assign teachers, and set the weekly schedule.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1 max-w-sm">
          <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Class</label>
          <Select value={classId ?? ""} onValueChange={(v) => setClassId(v)}>
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select a class…" />
            </SelectTrigger>
            <SelectContent>
              {allClasses?.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} · {c.section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!classId && (
        <div className="text-sm text-muted-foreground text-center py-16 border-2 border-dashed border-border rounded-xl">
          Select a class to manage its timetable.
        </div>
      )}

      {classLoading && <Card className="p-4"><LoadingRows rows={4} /></Card>}

      {classData && !classLoading && (
        <TimetableContent key={classId} classId={classId!} classData={classData} allTeachers={allTeachers ?? []} />
      )}
    </div>
  );
}

function TimetableContent({
  classId,
  classData,
  allTeachers,
}: {
  classId: string;
  classData: { name: string; section: string; subjectTeachers: { subject: string; teacherId: string; dayOfWeek?: number; startTime?: string; endTime?: string }[] };
  allTeachers: { id: string; name: string }[];
}) {
  const updateClass = useUpdateClass();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subjects, setSubjects] = useState<SubjectEntry[]>(() => groupSubjects(classData.subjectTeachers));
  const [newSubject, setNewSubject] = useState("");
  const [error, setError] = useState<string | null>(null);

  function addSubject() {
    const s = newSubject.trim();
    if (!s) return;
    if (subjects.some((x) => x.subject.toLowerCase() === s.toLowerCase())) {
      setError(`Subject "${s}" already exists.`);
      return;
    }
    setSubjects((prev) => [...prev, { _id: newId(), subject: s, teacherId: "", slots: [] }]);
    setNewSubject("");
    setError(null);
  }

  function removeSubject(id: string) {
    setSubjects((prev) => prev.filter((x) => x._id !== id));
  }

  function setSubjectTeacher(id: string, teacherId: string) {
    const existing = subjects.find((x) => x.teacherId === teacherId && x._id !== id);
    if (existing) {
      setError(`"${allTeachers?.find((t) => t.id === teacherId)?.name}" is already assigned to "${existing.subject}".`);
      return;
    }
    setError(null);
    setSubjects((prev) => prev.map((x) => (x._id === id ? { ...x, teacherId } : x)));
  }

  function addSlot(subjectId: string, dayOfWeek: number, startTime: string, endTime: string) {
    setSubjects((prev) =>
      prev.map((x) =>
        x._id === subjectId
          ? { ...x, slots: [...x.slots, { _id: newId(), dayOfWeek, startTime, endTime }] }
          : x,
      ),
    );
  }

  function removeSlot(subjectId: string, slotId: string) {
    setSubjects((prev) =>
      prev.map((x) =>
        x._id === subjectId ? { ...x, slots: x.slots.filter((s) => s._id !== slotId) } : x,
      ),
    );
  }

  function hasTeacherConflict(teacherId: string, skipSubject: string) {
    return subjects.some((x) => x.teacherId === teacherId && x.subject !== skipSubject);
  }

  const conflictError = subjects.some((x) =>
    x.teacherId ? subjects.some((o) => o.teacherId && o._id !== x._id && o.teacherId === x.teacherId && o.subject !== x.subject) : false,
  );

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await updateClass(classId, { subjectTeachers: flatten(subjects) });
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: unknown) {
      setSaving(false);
      setError(err instanceof Error ? err.message : "Failed to update timetable");
    }
  }

  const changed =
    JSON.stringify(flatten(subjects)) !==
    JSON.stringify(
      classData.subjectTeachers.map(({ subject, teacherId, dayOfWeek, startTime, endTime }) => ({
        subject,
        teacherId,
        dayOfWeek,
        startTime,
        endTime,
      })),
    );

  const tName = (id: string) => allTeachers?.find((t) => t.id === id)?.name ?? id;

  function to12(value: string) {
    const p = from24(value);
    if (!p) return value;
    return `${p.hour12}:${p.minute} ${p.ampm}`;
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving || !changed || conflictError} className="cursor-pointer h-9">
          <SaveIcon data-icon="inline-start" />
          {saving ? "Saving…" : saved ? "Saved!" : "Save"}
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{classData.name} · {classData.section} — Weekly Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          {subjects.every((s) => s.slots.length === 0) ? (
            <p className="text-sm text-muted-foreground text-center py-6 border-2 border-dashed border-border rounded-xl">
              No schedule set. Add subjects and assign day/time slots.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-1">
              <div className="grid grid-cols-5 gap-2 min-w-[480px] px-1">
                {DAY_LABELS.map((day, dayIndex) => {
                  const entries = subjects.flatMap((s) =>
                    s.slots.filter((sl) => sl.dayOfWeek === dayIndex).map((sl) => ({ subject: s.subject, teacherId: s.teacherId, ...sl })),
                  ).sort((a, b) => a.startTime.localeCompare(b.startTime));
                  return (
                    <div key={day}>
                      <div className="text-center text-xs font-semibold mb-1.5 rounded-md bg-muted py-1">{day}</div>
                      {entries.length === 0 ? (
                        <p className="text-[11px] text-muted-foreground text-center py-4">—</p>
                      ) : (
                        <div className="space-y-1">
                          {entries.map((e) => (
                            <div key={e._id} className="rounded-md border bg-card px-2 py-1.5 text-[11px] leading-tight space-y-0.5">
                              <p className="font-medium">{e.subject}</p>
                              <p className="text-muted-foreground truncate">{tName(e.teacherId)}</p>
                              <p className="text-muted-foreground">{to12(e.startTime)}–{to12(e.endTime)}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subjects</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add subjects, assign teachers, then schedule day/time slots for each subject.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSubject}
              onChange={(e) => {
                setNewSubject(e.target.value);
                if (error?.includes("already exists")) setError(null);
              }}
              placeholder="Subject name"
              className="h-9 text-sm max-w-xs"
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSubject(); } }}
            />
            <Button type="button" variant="default" onClick={addSubject} disabled={!newSubject.trim()} className="cursor-pointer h-9 gap-1 shrink-0">
              <PlusIcon className="size-4" /> Add
            </Button>
          </div>

          {subjects.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6 border-2 border-dashed border-border rounded-xl">
              No subjects yet. Add one above.
            </p>
          ) : (
            <div className="space-y-3">
              {subjects.map((s) => {
                return (
                  <div key={s._id} className="rounded-lg border border-border bg-card p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold">{s.subject}</h3>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeSubject(s._id)} className="size-7 cursor-pointer text-muted-foreground hover:text-foreground">
                        <XIcon className="size-3.5" />
                      </Button>
                    </div>

                    <div className="max-w-xs">
                      <Select value={s.teacherId} onValueChange={(v) => setSubjectTeacher(s._id, v)}>
                        <SelectTrigger className="w-full h-8 text-xs text-muted-foreground">
                          <SelectValue placeholder="Assign a teacher…" />
                        </SelectTrigger>
                        <SelectContent>
                          {allTeachers?.map((t) => {
                            const taken = hasTeacherConflict(t.id, s.subject);
                            return (
                              <SelectItem key={t.id} value={t.id} disabled={taken}>
                                {t.name}{taken ? " (taken)" : ""}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {s.slots.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {s.slots.map((sl) => (
                          <Badge key={sl._id} variant="secondary" className="gap-1 text-xs py-1 pr-1">
                            <ClockIcon className="size-3" />
                                {DAY_LABELS[sl.dayOfWeek]} {to12(sl.startTime)}–{to12(sl.endTime)}
                            <button
                              type="button"
                              onClick={() => removeSlot(s._id, sl._id)}
                              className="ml-0.5 hover:text-foreground text-muted-foreground cursor-pointer"
                            >
                              <XIcon className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    <ScheduleBuilder
                      subjectId={s._id}
                      onAdd={addSlot}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

function from24(value: string): { hour12: number; minute: string; ampm: "AM" | "PM" } | null {
  if (!value) return null;
  const [hh, mm] = value.split(":");
  const h = Number(hh);
  if (isNaN(h)) return null;
  return {
    hour12: h === 0 ? 12 : h > 12 ? h - 12 : h,
    minute: mm ?? "00",
    ampm: h < 12 ? "AM" : "PM",
  };
}

function ScheduleBuilder({
  subjectId,
  onAdd,
}: {
  subjectId: string;
  onAdd: (subjectId: string, dayOfWeek: number, startTime: string, endTime: string) => void;
}) {
  const [day, setDay] = useState<number | null>(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function handleAdd() {
    if (day == null || !start || !end) return;
    onAdd(subjectId, day, start, end);
    setDay(null);
    setStart("");
    setEnd("");
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Select value={day != null ? String(day) : ""} onValueChange={(v) => setDay(Number(v))}>
        <SelectTrigger className="w-[68px] h-7 text-xs">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
          {DAY_LABELS.map((d, i) => (
            <SelectItem key={d} value={String(i)}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="time"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="w-[100px] h-7 text-xs"
        placeholder="Start"
      />
      <span className="text-xs text-muted-foreground">–</span>
      <Input
        type="time"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="w-[100px] h-7 text-xs"
        placeholder="End"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleAdd}
        disabled={day == null || !start || !end}
        className="size-7 cursor-pointer"
      >
        <PlusIcon className="size-3.5" />
      </Button>
    </div>
  );
}
