import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import type { NavItem } from "./dashboard-nav";

export function DashboardShell({
  items,
  roleLabel,
  title,
  user,
  children,
}: {
  items: NavItem[];
  roleLabel: string;
  title: string;
  user: { name: string; email: string; avatarUrl?: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={items} roleLabel={roleLabel} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} user={user} />
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
