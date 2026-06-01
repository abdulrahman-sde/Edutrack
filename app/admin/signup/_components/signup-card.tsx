"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";
import {
  ShieldAlertIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupCard() {
  const router = useRouter();
  const { registerAdmin } = useAuth();

  const [name, setName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !name.trim() ||
      !institutionName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      await registerAdmin({ email, name, password, institutionName });
      router.push("/admin");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during signup.",
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
      className="w-full max-w-md rounded-[1.75rem] border border-border bg-card/60 p-2 shadow-2xl ring-1 ring-foreground/5 backdrop-blur"
    >
      <div className="rounded-[1.4rem] border border-foreground/10 bg-background/40 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
        <h1 className="text-xl font-medium tracking-tight">
          Create Admin Workspace
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Register the primary administrative account for your school.
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 flex gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
          >
            <ShieldAlertIcon className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Noman Aslam"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="institutionName">Institution Name</Label>
            <Input
              id="institutionName"
              type="text"
              placeholder="Beaconhouse School System"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              disabled={loading}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@edutrack.pk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="pr-10 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full mt-2"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Creating account...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                Register Workspace
                <ArrowRightIcon className="size-4 ml-1" />
              </span>
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Already registered?{" "}
          <Link href="/login" className="underline hover:text-foreground">
            Sign in here
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
