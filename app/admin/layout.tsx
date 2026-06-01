"use client";

import { usePathname } from "next/navigation";
import { useAdminSession } from "./_hooks/use-admin-session";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import type { NavItem } from "@/components/layout/dashboard-nav";

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: "overview" },
  { label: "Teachers", href: "/admin/teachers", icon: "teachers" },
  { label: "Students", href: "/admin/students", icon: "students" },
  { label: "Classes", href: "/admin/classes", icon: "classes" },
  { label: "Timetable", href: "/admin/timetable", icon: "timetable" },
  { label: "Exams", href: "/admin/exams", icon: "exams" },
  { label: "Reports", href: "/admin/reports", icon: "reports" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const skipSession = pathname === "/admin/signup";
  const { ready, session } = useAdminSession({ skip: skipSession });
  const userName = session?.name ?? "Admin User";
  const userEmail = session?.email ?? "admin@edutrack.pk";
  const schoolName = session?.institutionName ?? "Administration";

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (pathname === "/admin/signup") {
    return <>{children}</>;
  }

  return (
      <DashboardShell
        items={navItems}
        roleLabel="Admin workspace"
        title={schoolName}
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
