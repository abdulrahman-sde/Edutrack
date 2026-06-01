"use client";

import { use, useState } from "react";
import {
  ArrowLeftIcon,
  SaveIcon,
  GraduationCapIcon,
  UsersIcon,
  LayersIcon,
  CheckCircleIcon,
  CalendarIcon,
  XIcon,
  PencilIcon,
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StatCard } from "@/components/shared/stat-card";
import { LoadingRows } from "@/components/shared/loading-rows";
import { cn } from "@/lib/utils";
import {
  useTeacher,
  useClasses,
  useUpdateTeacher,
} from "../../hooks/use-admin-data";
import type { Teacher } from "@/types/user";
import type { ClassSection } from "@/types/class";

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TeacherForm({
  teacher,
  classes,
}: {
  teacher: Teacher;
  classes: ClassSection[] | undefined;
}) {
  const updateTeacher = useUpdateTeacher();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(teacher.name);
  const [phone, setPhone] = useState(teacher.phone);
  const [classIds, setClassIds] = useState<string[]>(teacher.classIds);
  const [error, setError] = useState<string | null>(null);

  const hasChanges =
    name !== teacher.name ||
    phone !== teacher.phone ||
    classIds.sort().join(",") !== teacher.classIds.sort().join(",");

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      await updateTeacher(teacher.id, {
        name: name.trim(),
        phone: phone.trim() || null,
        subjects: teacher.subjects,
        classIds,
      });

      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: unknown) {
      setSaving(false);
      setError(err instanceof Error ? err.message : "Failed to update teacher");
    }
  }

  const assignedClasses = (classes ?? []).filter((c) => classIds.includes(c.id));

  return (
    <div className="space-y-6">
      <Link
        href="/admin/teachers"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
        Back to teachers
      </Link>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <XIcon className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400 animate-in fade-in slide-in-from-top-1">
          <CheckCircleIcon className="size-4 shrink-0" />
          <span>Changes saved successfully</span>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 rounded-xl">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`}
              alt={name}
            />
            <AvatarFallback className="rounded-xl text-lg font-semibold">
              {initials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <PencilIcon className="size-3.5 text-muted-foreground shrink-0" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-8 w-64 text-lg font-semibold tracking-tight px-2"
                disabled={saving}
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="truncate">{teacher.email}</span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <CalendarIcon className="size-3" />
                Joined {formatDate(teacher.joinedAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PencilIcon className="size-3 text-muted-foreground shrink-0" />
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="h-7 w-48 text-sm px-2"
                disabled={saving}
              />
            </div>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="cursor-pointer shrink-0"
        >
          <SaveIcon data-icon="inline-start" />
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Subjects" value={String(teacher.subjects.length)} icon={GraduationCapIcon} />
        <StatCard label="Classes" value={String(classIds.length)} icon={LayersIcon} />
        <StatCard label="Students" value="—" icon={UsersIcon} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Class Assignments</CardTitle>
          {classes && classes.length > 0 && (
            <p className="text-xs text-muted-foreground font-normal mt-0.5">
              {classIds.length} of {classes.length} classes assigned
            </p>
          )}
        </CardHeader>
        <CardContent>
          {assignedClasses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No classes assigned</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {assignedClasses.map((c) => {
                const teacherSubjects = c.subjectTeachers.filter(
                  (st) => st.teacherId === teacher.id,
                );
                return (
                  <div key={c.id} className="rounded-xl border px-4 py-3 text-sm">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="truncate font-medium">{c.name}</span>
                      <span className="text-muted-foreground shrink-0">·</span>
                      <span className="shrink-0 text-muted-foreground">{c.section}</span>
                    </div>
                    {teacherSubjects.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {teacherSubjects.map((st) => (
                          <Badge key={st.subject} variant="muted" className="text-[10px] px-1.5 py-0">
                            {st.subject}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function TeacherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: teacher, loading } = useTeacher(id);
  const { data: classes } = useClasses();

  if (loading || !teacher) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-24 animate-pulse rounded-lg bg-muted/50" />
        </div>
        <Card className="p-4"><LoadingRows rows={5} /></Card>
      </div>
    );
  }

  return <TeacherForm teacher={teacher} classes={classes} />;
}
