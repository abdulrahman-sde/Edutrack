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
import { apiClient } from "@/lib/api-client";

export function NewClassDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState<string | null>(null);

  const valid = name.trim().length > 0 && section.trim().length > 0;

  async function handleCreate() {
    if (!valid) return;
    setSaving(true);
    setError(null);

    try {
      await apiClient("/classes", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          section: section.trim(),
          capacity: capacity ? Number(capacity) : undefined,
        }),
      });

      setSaving(false);
      setOpen(false);
      setName("");
      setSection("");
      setCapacity("");
      onCreated();
    } catch (err: unknown) {
      setSaving(false);
      setError(err instanceof Error ? err.message : "Failed to create class");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusIcon data-icon="inline-start" /> New class
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>
            Create a new class section.
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
              <Label htmlFor="class-name">Class Name</Label>
              <Input
                id="class-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Grade 10"
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class-section">Section</Label>
              <Input
                id="class-section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="e.g. A"
                disabled={saving}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class-capacity">Capacity (optional)</Label>
            <Input
              id="class-capacity"
              type="number"
              min={1}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="e.g. 40"
              disabled={saving}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={saving}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={!valid || saving} className="cursor-pointer">
            {saving ? "Creating…" : "Create Class"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
