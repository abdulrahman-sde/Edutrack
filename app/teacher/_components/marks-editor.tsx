"use client";

import { useState, useMemo } from "react";
import {
  SaveIcon,
  CheckCircleIcon,
  XIcon,
  CalendarIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { GradeBadge } from "@/components/shared/grade-badge";
import { LoadingRows } from "@/components/shared/loading-rows";
import { gradeFor } from "@/lib/mock/data";
import { useAssessments, useClassStudents, useSaveMarks } from "../hooks/use-teacher-data";

const TYPE_CONFIG: Record<
  string,
  { label: string; variant: "secondary" | "outline" | "warning" | "destructive" }
> = {
  quiz: { label: "Quiz", variant: "secondary" },
  assignment: { label: "Assignment", variant: "outline" },
  midterm: { label: "Mid-Term", variant: "warning" },
  final: { label: "Final", variant: "destructive" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StudentAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary shrink-0">
      {initials}
    </div>
  );
}

export function MarksEditor({
  classId,
  reloadKey,
  onCreated,
}: {
  classId: string | undefined;
  reloadKey: number;
  onCreated: () => void;
}) {
  const { data: assessments, loading } = useAssessments(classId, reloadKey);
  const { data: students } = useClassStudents(classId);
  const saveMarks = useSaveMarks();
  const [overrides, setOverrides] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string>();
  const [typeFilter, setTypeFilter] = useState("all");

  const handleTypeChange = (v: string) => {
    setTypeFilter(v);
    setSelectedId(undefined);
  };

  const scores = useMemo(() => {
    const init: Record<string, number> = {};
    if (assessments) {
      for (const a of assessments) {
        for (const e of a.entries) init[`${a.id}:${e.studentId}`] = e.obtained;
      }
    }
    return { ...init, ...overrides };
  }, [assessments, overrides]);

  const visibleAssessments = useMemo(() => {
    if (!assessments) return [];
    if (typeFilter === "all") return assessments;
    return assessments.filter((a) => a.type === typeFilter);
  }, [assessments, typeFilter]);

  const selectedAssessment = useMemo(() => {
    if (!visibleAssessments.length) return undefined;
    if (selectedId && visibleAssessments.find((a) => a.id === selectedId))
      return visibleAssessments.find((a) => a.id === selectedId);
    return visibleAssessments[0];
  }, [visibleAssessments, selectedId]);

  if (loading || !assessments || !students) {
    return (
      <Card className="p-4">
        <LoadingRows rows={5} />
      </Card>
    );
  }

  if (!assessments.length) {
    return (
      <Card className="flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-sm text-muted-foreground">No exams scheduled for this class yet.</p>
      </Card>
    );
  }

  const hasChanges = Object.keys(overrides).length > 0;

  async function handleSave() {
    if (!classId || !hasChanges) return;
    setSaving(true);
    setSaveError(null);

    const grouped: Record<string, { studentId: string; obtained: number }[]> = {};
    for (const [key, obtained] of Object.entries(overrides)) {
      const [assessmentId, studentId] = key.split(":");
      if (!grouped[assessmentId]) grouped[assessmentId] = [];
      grouped[assessmentId].push({ studentId: studentId!, obtained });
    }

    try {
      await Promise.all(
        Object.entries(grouped).map(([assessmentId, entries]) =>
          saveMarks(classId, assessmentId, entries),
        ),
      );

      setOverrides({});
      setLastSaved(Date.now());
      onCreated();
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Failed to save marks");
    } finally {
      setSaving(false);
    }
  }

  // ── Empty filtered state ──
  if (!visibleAssessments.length) {
    return (
      <div className="space-y-3">
        <div className="sticky top-0 z-10 -mx-1 rounded-xl bg-background px-1 pb-3 pt-1">
          <Tabs value={typeFilter} onValueChange={handleTypeChange}>
            <TabsList className="overflow-x-auto flex-nowrap">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="midterm">Mid-Term</TabsTrigger>
              <TabsTrigger value="final">Final</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Card className="p-8 text-center text-sm text-muted-foreground">
          No {typeFilter === "all" ? "" : TYPE_CONFIG[typeFilter]?.label.toLowerCase() + " "}
          exams for this class.
        </Card>
      </div>
    );
  }

  const a = selectedAssessment!;
  const cfg = TYPE_CONFIG[a.type];

  return (
    <div className="space-y-3">
      {/* ── Sticky toolbar ── */}
      <div className="sticky top-0 z-10 -mx-1 rounded-xl bg-background px-1 pb-3 pt-1 space-y-2">
        {/* Row 1: Type tabs */}
        <Tabs value={typeFilter} onValueChange={handleTypeChange}>
          <TabsList className="overflow-x-auto flex-nowrap">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="midterm">Mid-Term</TabsTrigger>
            <TabsTrigger value="final">Final</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Row 2: Assessment selector + Save */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-1 min-w-0">
            <Select
              value={selectedId ?? a.id}
              onValueChange={(v) => {
                setSelectedId(v);
                setOverrides({});
                setSaveError(null);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  <span className="truncate">
                    {a.subject} · {TYPE_CONFIG[a.type].label} · {a.title}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {visibleAssessments.map((as) => (
                  <SelectItem key={as.id} value={as.id}>
                    <span className="truncate">
                      {as.subject} · {TYPE_CONFIG[as.type].label} · {as.title}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSave} disabled={!hasChanges || saving}>
            <SaveIcon data-icon="inline-start" />
            {saving ? "Saving…" : "Save"}
            {hasChanges && !saving && (
              <span className="ml-0.5 text-xs opacity-70">({hasChanges})</span>
            )}
          </Button>
        </div>

        {/* Status messages */}
        {saveError && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <XIcon className="size-4 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}
        {!hasChanges && lastSaved > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
            <CheckCircleIcon className="size-4 shrink-0" />
            <span>Saved</span>
            <span className="text-xs opacity-60">
              — {new Date(lastSaved).toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>

      {/* ── Assessment info bar ── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border bg-muted/30 px-4 py-2.5 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground">{a.subject}</span>
          <span className="text-muted-foreground/50">·</span>
          <Badge variant={cfg.variant} className="px-2">
            {cfg.label}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <CalendarIcon className="size-3.5" />
          {formatDate(a.date)}
        </div>
        <div className="text-muted-foreground">
          Total: <span className="font-medium text-foreground">{a.totalMarks}</span>
        </div>
        <div className="text-muted-foreground">
          Students: <span className="font-medium text-foreground">{students.length}</span>
        </div>
      </div>

      {/* ── Marks table ── */}
      <Card className="py-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">#</TableHead>
              <TableHead>Student</TableHead>
              <TableHead className="w-44">Marks (/{a.totalMarks})</TableHead>
              <TableHead className="w-16 text-center">%</TableHead>
              <TableHead className="w-20">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((s, i) => {
              const key = `${a.id}:${s.id}`;
              const obtained = scores[key] ?? 0;
              const pct = Math.round((obtained / a.totalMarks) * 100);
              return (
                <TableRow key={s.id}>
                  <TableCell className="text-center text-xs text-muted-foreground">
                    {i + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <StudentAvatar name={s.name} />
                      <span className="font-medium truncate">{s.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      max={a.totalMarks}
                      value={obtained}
                      onChange={(e) => {
                        const v = Math.max(
                          0,
                          Math.min(a.totalMarks, Number(e.target.value)),
                        );
                        setOverrides((m) => ({ ...m, [key]: v }));
                        setSaveError(null);
                      }}
                      className="h-8 w-28"
                    />
                  </TableCell>
                  <TableCell className="text-center tabular-nums text-muted-foreground">
                    {pct}%
                  </TableCell>
                  <TableCell>
                    <GradeBadge grade={gradeFor(pct)} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
