"use client";

import { useState } from "react";
import Link from "next/link";
import * as motion from "motion/react-client";
import { ShieldCheckIcon, GraduationCapIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Role = "admin" | "teacher";

export function LoginCard() {
  const [role, setRole] = useState<Role>("admin");
  const dest = role === "admin" ? "/admin" : "/teacher";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-sm rounded-[1.75rem] border border-border bg-card/60 p-2 shadow-2xl ring-1 ring-foreground/5 backdrop-blur"
    >
      <div className="rounded-[1.4rem] border border-foreground/10 bg-background/40 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
        <h1 className="text-xl font-medium tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to your EduTrack workspace.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {(["admin", "teacher"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-sm transition-all",
                role === r
                  ? "border-foreground/30 bg-secondary text-foreground"
                  : "border-border bg-background/40 text-muted-foreground hover:text-foreground",
              )}
            >
              {r === "admin" ? (
                <ShieldCheckIcon className="size-4" />
              ) : (
                <GraduationCapIcon className="size-4" />
              )}
              <span className="capitalize">{r}</span>
            </button>
          ))}
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={`${role}@edutrack.pk`}
              defaultValue={`${role}@edutrack.pk`}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" defaultValue="demo1234" />
          </div>

          <Button asChild className="w-full rounded-full" size="lg">
            <Link href={dest}>
              Continue as {role}
              <ArrowRightIcon data-icon="inline-end" className="ml-1 size-4" />
            </Link>
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Demo mode — any credentials work.
        </p>
      </div>
    </motion.div>
  );
}
