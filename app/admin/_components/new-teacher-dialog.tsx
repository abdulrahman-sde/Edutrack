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
import { useClasses, useCreateTeacher } from "../hooks/use-admin-data";

export function NewTeacherDialog({ onCreated }: { onCreated: () => void }) {
  const createTeacher = useCreateTeacher();
  const { data: classes } = useClasses();

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [subjectsRaw, setSubjectsRaw] = useState("");
  const [classIds, setClassIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const valid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 8;

  function toggleClass(id: string) {
    setClassIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  async function handleCreate() {
    if (!valid) return;
    setSaving(true);
    setError(null);

    const subjects = subjectsRaw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      await createTeacher({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        subjects,
        classIds,
      });

      // Reset and close dialog
      setSaving(false);
      setOpen(false);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setSubjectsRaw("");
      setClassIds([]);
      
      onCreated();
    } catch (err: unknown) {
      setSaving(false);
      setError(err instanceof Error ? err.message : "Failed to create teacher account");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusIcon data-icon="inline-start" /> Add teacher
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
          <DialogDescription>
            Create an institutional account for a new faculty member. They will be able to log in immediately using these credentials.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacher-name">Full Name</Label>
              <Input
                id="teacher-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Prof. Noman"
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher-phone">Phone Number</Label>
              <Input
                id="teacher-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0300-1234567"
                disabled={saving}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher-email">Email Address</Label>
            <Input
              id="teacher-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. noman@edutrack.pk"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher-password">Password (min. 8 characters)</Label>
            <Input
              id="teacher-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher-subjects">Subjects (comma-separated)</Label>
            <Input
              id="teacher-subjects"
              value={subjectsRaw}
              onChange={(e) => setSubjectsRaw(e.target.value)}
              placeholder="e.g. English, Computer Science"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <Label>Class Assignments</Label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto border border-border rounded-xl p-2.5 bg-background/50">
              {classes && classes.length > 0 ? (
                classes.map((c) => (
                  <label
                    key={c.id}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs bg-background/40 hover:bg-secondary/40 transition-colors"
                  >
                    <Checkbox
                      checked={classIds.includes(c.id)}
                      onCheckedChange={() => toggleClass(c.id)}
                      disabled={saving}
                    />
                    <span className="truncate">{c.name} · {c.section}</span>
                  </label>
                ))
              ) : (
                <span className="text-xs text-muted-foreground col-span-2 text-center py-2">
                  No classes available.
                </span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={saving}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={!valid || saving} className="cursor-pointer">
            {saving ? "Creating…" : "Create Teacher"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
