"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";
import {
  ShieldCheckIcon,
  GraduationCapIcon,
  ArrowRightIcon,
  ShieldAlertIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Role = "admin" | "teacher";

export function LoginCard() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email: email.trim(), password, role });
      router.push(role === "admin" ? "/admin" : "/teacher");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid email, password, or workspace role.",
      );
    } finally {
      setLoading(false);
    }
  };

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
              onClick={() => {
                setRole(r);
                setError(null);
                setEmail("");
                setPassword("");
              }}
              disabled={loading}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-sm transition-all cursor-pointer",
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

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 flex gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-2.5 text-xs text-destructive"
          >
            <ShieldAlertIcon className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={`${role}@edutrack.pk`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                Continue as {role}
                <ArrowRightIcon data-icon="inline-end" className="ml-1 size-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-4 flex flex-col gap-2 text-center text-xs text-muted-foreground">
          {role === "admin" && (
            <span>
              New deployment?{" "}
              <Link href="/admin/signup" className="underline hover:text-foreground">
                Register Admin here
              </Link>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
