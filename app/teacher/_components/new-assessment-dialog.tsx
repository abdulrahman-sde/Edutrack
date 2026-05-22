"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { AssessmentType } from "@/types/marks";
import { useCreateAssessment } from "../hooks/use-teacher-data";

const TYPES: { value: AssessmentType; label: string }[] = [
  { value: "quiz", label: "Quiz" },
  { value: "assignment", label: "Assignment" },
  { value: "midterm", label: "Mid-Term" },
  { value: "final", label: "Final" },
];

export function NewAssessmentDialog({
  classId,
  subjects,
  onCreated,
}: {
  classId: string;
  subjects: string[];
  onCreated: () => void;
}) {
  const createAssessment = useCreateAssessment();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(subjects[0] ?? "");
  const [type, setType] = useState<AssessmentType>("quiz");
  const [totalMarks, setTotalMarks] = useState(100);

  const valid = title.trim().length > 0 && subject.length > 0 && totalMarks > 0;

  async function handleCreate() {
    if (!valid) return;
    setSaving(true);
    await createAssessment({ classId, subject, type, title: title.trim(), totalMarks });
    setSaving(false);
    setOpen(false);
    setTitle("");
    setType("quiz");
    setTotalMarks(100);
    onCreated();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusIcon data-icon="inline-start" />
          New assessment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New assessment</DialogTitle>
          <DialogDescription>Add an exam, quiz, or assignment for this class.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="assessment-title">Title</Label>
            <Input
              id="assessment-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Algebra Quiz 3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as AssessmentType)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessment-total">Total marks</Label>
            <Input
              id="assessment-total"
              type="number"
              min={1}
              value={totalMarks}
              onChange={(e) => setTotalMarks(Math.max(1, Number(e.target.value)))}
              className="w-32"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={!valid || saving}>
            {saving ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
