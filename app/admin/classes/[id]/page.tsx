"use client";

import { use, useState } from "react";
import { ArrowLeftIcon, GraduationCapIcon, UsersIcon, BookOpenIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/shared/stat-card";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useClass } from "../../hooks/use-admin-data";
import type { ClassSection } from "@/types/class";

export default function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: classData, loading } = useClass(id);

  if (loading || !classData) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-24 animate-pulse rounded-lg bg-muted/50" />
        </div>
        <Card className="p-4">
          <LoadingRows rows={5} />
        </Card>
      </div>
    );
  }

  return <ClassDetailForm key={id} classData={classData} />;
}

function ClassDetailForm({ classData }: { classData: ClassSection }) {
  const [name, setName] = useState(classData.name);
  const [section, setSection] = useState(classData.section);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/classes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
        Back to classes
      </Link>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {classData.name} · {classData.section}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Class details and settings.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Students enrolled"
          value={String(classData.studentCount)}
          icon={UsersIcon}
        />
        <StatCard
          label="Subjects offered"
          value={String(classData.subjectTeachers.length)}
          icon={GraduationCapIcon}
        />
        <StatCard
          label="Teachers assigned"
          value={String(
            new Set(classData.subjectTeachers.map((st) => st.teacherId)).size,
          )}
          icon={BookOpenIcon}
        />
      </div>

      <div className="max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Class Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class-name">Name</Label>
                <Input
                  id="class-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Grade 10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class-section">Section</Label>
                <Input
                  id="class-section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  placeholder="e.g. A"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Timetable Management</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage subjects, teachers, and the weekly schedule.
            </p>
          </div>
          <Link href="/admin/timetable">
            <Button variant="default" size="sm" className="cursor-pointer gap-1">
              <CalendarIcon className="size-3.5" />
              Manage Timetable
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
