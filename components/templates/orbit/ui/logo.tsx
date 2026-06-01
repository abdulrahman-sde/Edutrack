import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("text-foreground h-5 w-auto", className)}
      viewBox="0 0 130 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="EduTrack"
    >
      {/* Icon: graduation cap inside rounded square */}
      <rect x="0.75" y="0.75" width="26.5" height="26.5" rx="5.25" stroke="currentColor" strokeWidth="1.5" />
      {/* Cap base */}
      <path d="M5 14l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Cap tassel stem */}
      <path d="M23 14v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* Stage line */}
      <path d="M10 16.5v3c0 1.1 1.8 2 4 2s4-.9 4-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Wordmark: EduTrack */}
      {/* E */}
      <path d="M33 8h7M33 8v12M33 14h6M33 20h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {/* d */}
      <path d="M47 8v13M47 16.5a3.5 3.5 0 1 0-3.5 3.5 3.5 3.5 0 0 0 3.5-3.5z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      {/* u */}
      <path d="M52 13v5.5a2.5 2.5 0 0 0 5 0V13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      {/* T */}
      <path d="M61 8h7M64.5 8v13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      {/* r */}
      <path d="M72 13v8M72 16a3 3 0 0 1 3-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      {/* a */}
      <path d="M83 13c-2 0-3.5 1.57-3.5 3.5S81 20 83 20h3v-3.5c0-1.93-1.34-3.5-3-3.5z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M86 13v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      {/* c */}
      <path d="M96 15a3.5 3.5 0 1 0 0 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      {/* k */}
      <path d="M102 8v13M102 15.5l4-2.5M102 15.5l4.5 5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};


