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
import { useClasses, useCreateStudent } from "../hooks/use-admin-data";
import type { Gender } from "@/types/student";

export function NewStudentDialog({ onCreated }: { onCreated: () => void }) {
  const createStudent = useCreateStudent();
  const { data: classes } = useClasses();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [address, setAddress] = useState("");
  const [classId, setClassId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const valid = firstName.trim().length > 0 && lastName.trim().length > 0 && dob.length > 0 && classId.length > 0;

  function reset() {
    setFirstName(""); setLastName(""); setDob(""); setGender("male");
    setGuardianName(""); setGuardianPhone(""); setAddress("");
    setClassId(""); setRollNumber(""); setError(null);
  }

  async function handleCreate() {
    if (!valid) return;
    setSaving(true);
    setError(null);
    try {
      await createStudent({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dob,
        gender,
        guardianName: guardianName.trim() || undefined,
        guardianPhone: guardianPhone.trim() || undefined,
        address: address.trim() || undefined,
        classId,
        rollNumber: rollNumber ? Number(rollNumber) : undefined,
      });
      setSaving(false);
      setOpen(false);
      reset();
      onCreated();
    } catch (err: unknown) {
      setSaving(false);
      setError(err instanceof Error ? err.message : "Failed to enroll student");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusIcon data-icon="inline-start" /> Enroll student
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Enroll New Student</DialogTitle>
          <DialogDescription>Register a new student and assign to a class.</DialogDescription>
        </DialogHeader>
        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-first-name">First Name</Label>
              <Input
                id="student-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Ahmed"
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-last-name">Last Name</Label>
              <Input
                id="student-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Khan"
                disabled={saving}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-dob">Date of Birth</Label>
              <Input
                id="student-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-gender">Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
                <SelectTrigger id="student-gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-guardian">Guardian Name</Label>
              <Input
                id="student-guardian"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="e.g. Muhammad Khan"
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-guardian-phone">Guardian Phone</Label>
              <Input
                id="student-guardian-phone"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="e.g. 0300-1234567"
                disabled={saving}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-address">Address</Label>
            <Input
              id="student-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. House 12, Street 5, Lahore"
              disabled={saving}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-class">Class</Label>
              <Select value={classId} onValueChange={setClassId}>
                <SelectTrigger id="student-class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes?.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} · {c.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-roll">Roll Number (optional)</Label>
              <Input
                id="student-roll"
                type="number"
                min={1}
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g. 1"
                disabled={saving}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={saving}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={!valid || saving} className="cursor-pointer">
            {saving ? "Enrolling\u2026" : "Enroll Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
