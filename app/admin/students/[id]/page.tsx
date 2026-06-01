"use client";

import { use, useState } from "react";
import {
  ArrowLeftIcon,
  SaveIcon,
  CheckCircleIcon,
  CalendarIcon,
  ShieldCheckIcon,
  XIcon,
  PencilIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LoadingRows } from "@/components/shared/loading-rows";
import { cn } from "@/lib/utils";
import { useStudent, useUpdateStudent, useClasses } from "../../hooks/use-admin-data";
import type { Gender } from "@/types/student";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

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

function StudentForm({ id }: { id: string }) {
  const { data: student, loading } = useStudent(id);
  const updateStudent = useUpdateStudent();
  const { data: classes } = useClasses();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [initialised, setInitialised] = useState(false);

  if (loading || !student) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-24 animate-pulse rounded-lg bg-muted/50" />
        </div>
        <Card className="p-4"><LoadingRows rows={6} /></Card>
      </div>
    );
  }

  if (!initialised) {
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setDob(student.dob);
    setGender(student.gender as Gender);
    setGuardianName(student.guardianName ?? "");
    setGuardianPhone(student.guardianPhone ?? "");
    setAddress(student.address ?? "");
    setIsActive(student.isActive);
    setInitialised(true);
  }

  const hasChanges =
    firstName !== student.firstName ||
    lastName !== student.lastName ||
    dob !== student.dob ||
    gender !== student.gender ||
    guardianName !== (student.guardianName ?? "") ||
    guardianPhone !== (student.guardianPhone ?? "") ||
    address !== (student.address ?? "") ||
    isActive !== student.isActive;

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      await updateStudent(id, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dob,
        gender,
        guardianName: guardianName.trim() || undefined,
        guardianPhone: guardianPhone.trim() || undefined,
        address: address.trim() || undefined,
        isActive,
      });

      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: unknown) {
      setSaving(false);
      setError(err instanceof Error ? err.message : "Failed to update student");
    }
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/students"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
        Back to students
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
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firstName + " " + lastName)}`}
              alt={`${firstName} ${lastName}`}
            />
            <AvatarFallback className="rounded-xl text-lg font-semibold">
              {initials(`${firstName} ${lastName}`)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <PencilIcon className="size-3.5 text-muted-foreground shrink-0" />
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-8 w-36 text-lg font-semibold tracking-tight px-2"
                disabled={saving}
              />
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-8 w-36 text-lg font-semibold tracking-tight px-2"
                disabled={saving}
              />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="font-mono text-xs">{student.admissionNumber}</span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <CalendarIcon className="size-3" />
                DOB {formatDate(dob)}
              </span>
              {student.className && (
                <>
                  <span className="hidden sm:inline" aria-hidden="true">·</span>
                  <span>{student.className}</span>
                </>
              )}
              {student.rollNumber && (
                <>
                  <span className="hidden sm:inline" aria-hidden="true">·</span>
                  <span>Roll #{student.rollNumber}</span>
                </>
              )}
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <UserIcon className="size-4" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Select
                  value={gender}
                  onValueChange={(v) => setGender(v as Gender)}
                  disabled={saving}
                >
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
            <div className="flex items-center gap-3 pt-1">
              <Label htmlFor="student-active" className="text-sm font-normal cursor-pointer">
                Active enrollment
              </Label>
              <button
                id="student-active"
                type="button"
                role="switch"
                aria-checked={isActive}
                onClick={() => setIsActive(!isActive)}
                disabled={saving}
                className={cn(
                  "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
                  isActive ? "bg-emerald-500" : "bg-muted",
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none block size-3.5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                    isActive ? "translate-x-4" : "translate-x-0.5",
                  )}
                />
              </button>
              <Badge variant={isActive ? "default" : "outline"} className="text-[10px]">
                {isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheckIcon className="size-4" />
              Guardian & Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <StudentForm id={id} />;
}
