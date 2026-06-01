import { GuestGuard } from "@/components/shared/guest-guard";
import Link from "next/link";
import { SignupCard } from "./_components/signup-card";
import { Logo } from "@/components/templates/orbit/ui/logo";

export default function AdminSignupPage() {
  return (
    <GuestGuard>
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
        {/* Background glow radial gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_50%_0%,--theme(--color-primary/.05),transparent)]"
        />
        <Link href="/" className="absolute top-6 left-6">
          <Logo />
        </Link>
        <SignupCard />
      </div>
    </GuestGuard>
  );
}
