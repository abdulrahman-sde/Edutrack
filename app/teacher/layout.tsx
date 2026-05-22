import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { NavItem } from "@/components/layout/dashboard-nav";
import { teachers } from "@/lib/mock/data";

const navItems: NavItem[] = [
  { label: "Overview", href: "/teacher", icon: "overview" },
  { label: "Attendance", href: "/teacher/attendance", icon: "attendance" },
  { label: "Marks & Grading", href: "/teacher/marks", icon: "marks" },
  { label: "Assignments", href: "/teacher/assignments", icon: "assignments" },
  { label: "Reports", href: "/teacher/reports", icon: "performance" },
];

const me = teachers[0];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      items={navItems}
      roleLabel="Teacher workspace"
      title="My Classroom"
      user={{ name: me.name, email: me.email, avatarUrl: me.avatarUrl }}
    >
      {children}
    </DashboardShell>
  );
}
