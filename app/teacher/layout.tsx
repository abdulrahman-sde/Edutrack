"use client";

import { useTeacherSession } from "./_hooks/use-teacher-session";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import type { NavItem } from "@/components/layout/dashboard-nav";

const navItems: NavItem[] = [
  { label: "Overview", href: "/teacher", icon: "overview" },
  { label: "Attendance", href: "/teacher/attendance", icon: "attendance" },
  { label: "Marks & Grading", href: "/teacher/marks", icon: "marks" },
  { label: "Assignments", href: "/teacher/assignments", icon: "assignments" },
  { label: "Timetable", href: "/teacher/timetable", icon: "timetable" },
  { label: "Reports", href: "/teacher/reports", icon: "performance" },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready, session } = useTeacherSession();
  const userName = session?.name ?? "Teacher User";
  const userEmail = session?.email ?? "teacher@edutrack.pk";

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
      <DashboardShell
        items={navItems}
        roleLabel="Teacher workspace"
        title="My Classroom"
        user={{
          name: userName,
          email: userEmail,
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}`,
        }}
      >
        <ErrorBoundary>{children}</ErrorBoundary>
      </DashboardShell>
  );
}
