"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { ExamTerm } from "@/types/marks";
import type { ClassSection } from "@/types/class";
import { useCreateExam } from "../../hooks/use-admin-data";

const TERMS: { value: ExamTerm; label: string }[] = [
  { value: "monthly", label: "Monthly Test" },
  { value: "midterm", label: "Mid-Term" },
  { value: "pre-board", label: "Pre-Board" },
  { value: "final", label: "Final" },
];

export function NewExamDialog({
  classes,
  onCreated,
}: {
  classes: ClassSection[];
  onCreated: () => void;
}) {
  const createExam = useCreateExam();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [term, setTerm] = useState<ExamTerm>("midterm");
  const [classIds, setClassIds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const valid =
    title.trim().length > 0 &&
    classIds.length > 0 &&
    startDate.length > 0 &&
    endDate.length > 0 &&
    endDate >= startDate;

  function toggleClass(id: string) {
    setClassIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  async function handleCreate() {
    if (!valid) return;
    setSaving(true);
    setError(null);
    try {
      await createExam({ title: title.trim(), term, classIds, startDate, endDate });
      setSaving(false);
      setOpen(false);
      setTitle("");
      setTerm("midterm");
      setClassIds([]);
      setStartDate("");
      setEndDate("");
      onCreated();
    } catch (err: unknown) {
      setSaving(false);
      setError(err instanceof Error ? err.message : "Failed to create exam");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon data-icon="inline-start" /> New exam
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New institution exam</DialogTitle>
          <DialogDescription>
            Schedule an exam across one or more classes. Teachers enter marks per subject.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="exam-title">Title</Label>
            <Input
              id="exam-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Final Examination 2026"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <Label>Term</Label>
            <Select value={term} onValueChange={(v) => setTerm(v as ExamTerm)} disabled={saving}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TERMS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exam-start">Start date</Label>
                <Input
                  id="exam-start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={saving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exam-end">End date</Label>
                <Input
                  id="exam-end"
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={saving}
                />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Classes</Label>
            <div className="grid grid-cols-2 gap-2">
              {classes.map((c) => (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                >
                  <Checkbox
                    checked={classIds.includes(c.id)}
                    onCheckedChange={() => toggleClass(c.id)}
                    disabled={saving}
                  />
                  {c.name} · {c.section}
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={saving}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={!valid || saving}>
            {saving ? "Creating…" : "Create exam"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
