"use client";

import { UsersIcon, GraduationCapIcon, LayersIcon, BookOpenIcon } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { useTeachers, useStudents, useClasses } from "../hooks/use-admin-data";
import { SUBJECTS } from "@/lib/mock/data";

export function OverviewStats() {
  const { data: teachers } = useTeachers();
  const { data: students } = useStudents();
  const { data: classes } = useClasses();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Teachers"
        value={teachers ? String(teachers.length) : "—"}
        delta={8}
        trend="up"
        icon={UsersIcon}
      />
      <StatCard
        label="Students"
        value={students ? String(students.length) : "—"}
        delta={12}
        trend="up"
        icon={GraduationCapIcon}
      />
      <StatCard
        label="Classes"
        value={classes ? String(classes.length) : "—"}
        delta={0}
        trend="up"
        icon={LayersIcon}
      />
      <StatCard
        label="Subjects"
        value={String(SUBJECTS.length)}
        delta={3}
        trend="down"
        icon={BookOpenIcon}
      />
    </div>
  );
}
