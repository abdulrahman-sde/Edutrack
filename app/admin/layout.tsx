import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { NavItem } from "@/components/layout/dashboard-nav";

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: "overview" },
  { label: "Teachers", href: "/admin/teachers", icon: "teachers" },
  { label: "Students", href: "/admin/students", icon: "students" },
  { label: "Classes", href: "/admin/classes", icon: "classes" },
  { label: "Reports", href: "/admin/reports", icon: "reports" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      items={navItems}
      roleLabel="Admin workspace"
      title="Administration"
      user={{
        name: "Noman Aslam",
        email: "admin@edutrack.pk",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
      }}
    >
      {children}
    </DashboardShell>
  );
}
