"use client";

import { XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/templates/orbit/ui/logo";
import { NAV_ICONS, type NavItem } from "./dashboard-nav";
import { Button } from "@/components/ui/button";

export function Sidebar({
  items,
  roleLabel,
  mobileOpen,
  onMobileClose,
}: {
  items: NavItem[];
  roleLabel: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();

  const nav = (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = NAV_ICONS[item.icon];
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onMobileClose}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <Icon
              className={cn(
                "size-4 shrink-0 transition-colors",
                active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-card/40 px-3 py-5 md:flex">
        <Link href="/" className="mb-1 flex items-center px-2">
          <Logo />
        </Link>
        <p className="mb-6 px-2 text-xs text-muted-foreground">{roleLabel}</p>

        {nav}

        <div className="mt-auto rounded-xl border border-border bg-background/60 p-3">
          <p className="text-xs font-medium">Demo mode</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Mock data — no backend connected.
          </p>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="fixed inset-y-0 left-0 flex w-60 flex-col border-r border-border bg-background px-3 py-5">
            <div className="flex items-center justify-between mb-1 px-2">
              <Link href="/" onClick={onMobileClose}>
                <Logo />
              </Link>
              <Button variant="ghost" size="icon" onClick={onMobileClose}>
                <XIcon className="size-4" />
              </Button>
            </div>
            <p className="mb-6 px-2 text-xs text-muted-foreground">{roleLabel}</p>

            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
