import Link from "next/link";
import { LoginCard } from "./_components/login-card";
import { Logo } from "@/components/templates/orbit/ui/logo";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_50%_0%,--theme(--color-foreground/.08),transparent)]"
      />
      <Link href="/" className="absolute top-6 left-6">
        <Logo />
      </Link>
      <LoginCard />
    </div>
  );
}
