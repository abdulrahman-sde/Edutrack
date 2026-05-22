"use client";

import { LayersIcon, UsersIcon, CalendarCheckIcon, FolderIcon } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { useMyClasses, useMyResources } from "../hooks/use-teacher-data";

export function TeacherStats() {
  const { data: classes } = useMyClasses();
  const { data: resources } = useMyResources();

  const studentTotal = classes?.reduce((a, c) => a + c.studentCount, 0);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="My classes" value={classes ? String(classes.length) : "—"} icon={LayersIcon} />
      <StatCard
        label="My students"
        value={studentTotal !== undefined ? String(studentTotal) : "—"}
        icon={UsersIcon}
      />
      <StatCard label="Sessions this week" value="20" delta={5} trend="up" icon={CalendarCheckIcon} />
      <StatCard
        label="Resources shared"
        value={resources ? String(resources.length) : "—"}
        icon={FolderIcon}
      />
    </div>
  );
}
