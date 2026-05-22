import { cn } from "@/lib/utils";
import type React from "react";
import {
  ClipboardListIcon,
  ShieldCheckIcon,
  BarChart3Icon,
  BookOpenIcon,
  UploadCloudIcon,
  GlobeIcon,
} from "lucide-react";

export function FeatureSection() {
  return (
    <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6">
      {features.map((feature) => (
        <FeatureCard className={feature.className} key={feature.id}>
          {feature.children}
        </FeatureCard>
      ))}
    </div>
  );
}

function FeatureCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2.5rem] p-[0.375rem] border bg-background/5 ring-1 ring-foreground/5 shadow-sm inset-shadow-2xs",
        className,
      )}
    >
      <div className="relative h-full w-full rounded-[calc(2.5rem-0.375rem)] border border-foreground/10 bg-background pt-8 pb-6 px-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        {children}
      </div>
    </div>
  );
}

function FeatureIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="relative mx-auto flex size-16 items-center justify-center rounded-full border bg-background shadow-xs outline outline-border outline-offset-4">
      <div className="absolute inset-0 scale-120 bg-radial from-foreground/15 via-foreground/5 to-transparent blur-xl" />
      <Icon className="size-7 text-primary/80" />
    </div>
  );
}

function FeatureTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-medium text-foreground text-base tracking-tight leading-none", className)}
      {...props}
    />
  );
}

function FeatureDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-sm leading-relaxed max-w-[40ch]", className)} {...props} />
  );
}

function AttendanceFeature() {
  return (
    <>
      <FeatureIcon icon={ClipboardListIcon} />
      <div className="relative mt-8 space-y-1.5 text-center">
        <FeatureTitle>Attendance Tracking</FeatureTitle>
        <FeatureDescription>
          Mark and view daily attendance per class. Instant summaries for teachers and admins.
        </FeatureDescription>
      </div>
    </>
  );
}

function RbacFeature() {
  return (
    <>
      <FeatureIcon icon={ShieldCheckIcon} />
      <div className="relative mt-8 space-y-1.5 text-center">
        <FeatureTitle>Role-Based Access</FeatureTitle>
        <FeatureDescription>
          Admins control the institution. Teachers see only their own classes and subjects.
        </FeatureDescription>
      </div>
    </>
  );
}

function MarksFeature() {
  return (
    <>
      <div className="min-h-32">
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BarChart3Icon className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground">92.4%</div>
        </div>
        <GradeChartSvg className="translate-x-[5%] -rotate-2 scale-125 md:scale-150" />
      </div>
      <div className="relative z-10 mt-8 space-y-1.5 text-center">
        <FeatureTitle>Marks & Grading</FeatureTitle>
        <FeatureDescription>
          Enter exam scores, auto-calculate grades, and track student progress over time.
        </FeatureDescription>
      </div>
    </>
  );
}

function AssignmentsFeature() {
  return (
    <div className="grid h-full sm:grid-cols-2">
      <div className="relative z-10 space-y-6 py-6 ps-8 pe-2">
        <div className="flex size-8 items-center justify-center rounded-full border bg-card shadow-xs outline outline-border/80 outline-offset-2">
          <UploadCloudIcon className="size-3 text-primary/80" />
        </div>
        <div className="space-y-2">
          <FeatureTitle className="text-xl md:text-xl">
            Assignment Upload
          </FeatureTitle>
          <FeatureDescription>
            Teachers upload materials and assignments to Cloudinary. Students access them in one click.
          </FeatureDescription>
        </div>
      </div>
      <div className="mask-b-from-90% mask-r-from-90% relative aspect-video sm:aspect-auto">
        <div className="absolute -right-1 -bottom-1 aspect-video max-h-50 rounded-tl-3xl border border-foreground/10 bg-card p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] sm:max-h-42 md:aspect-square md:max-h-50 lg:aspect-16/12">
          <div className="aspect-video h-full overflow-hidden rounded-tl-[calc(1.5rem-4px)] border border-foreground/10 *:pointer-events-none *:size-full *:shrink-0 *:select-none object-cover">
            <img
              alt="Assignment upload interface"
              className="object-cover"
              height={360}
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
              width={640}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsFeature() {
  return (
    <div className="grid max-h-120 sm:grid-cols-2">
      <div className="space-y-6 pt-6 pb-4 pl-8 sm:pb-8">
        <div className="flex size-8 items-center justify-center rounded-full border bg-card shadow-xs outline outline-border/80 outline-offset-2">
          <BookOpenIcon className="size-3 text-primary/80" />
        </div>
        <div className="space-y-2">
          <FeatureTitle className="text-xl md:text-xl">
            Performance Reports
          </FeatureTitle>
          <FeatureDescription>
            Generate per-student and per-class reports. Export or share with parents instantly.
          </FeatureDescription>
        </div>
      </div>
      <div className="relative flex items-center justify-center p-6">
        <ReportPreviewSvg className="w-full max-w-[160px] opacity-80" />
      </div>
    </div>
  );
}

function GradeChartSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="none" viewBox="0 0 300 128" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        clipRule="evenodd"
        d="M3 123C3 123 30 95 55 88C80 81 90 80 90 80C90 80 105 80 118 80C131 80 128 63 137 63C146 63 147 92 155 92C163 92 173 78 185 80C197 82 218 92 225 92C232 92 238 63 246 63C254 63 268 94 274 92C280 90 289 60 297 60"
        fill="url(#grade-g1)"
        fillRule="evenodd"
      />
      <path
        className="text-primary"
        d="M3 121C3 121 30 93 55 87C80 81 90 81 90 81C90 81 105 81 118 81C131 81 128 64 137 64C146 64 147 92 155 92C163 92 173 78 185 81C197 83 218 92 225 92C232 92 238 64 246 64C254 64 268 94 274 92C280 90 289 61 297 61"
        stroke="currentColor"
        strokeWidth="1"
      />
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="grade-g1" x1="3" x2="3" y1="60" y2="123">
          <stop className="text-primary/20" stopColor="currentColor" />
          <stop className="text-background" offset="1" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ReportPreviewSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="2" width="116" height="146" rx="10" className="stroke-border" strokeWidth="1.5" />
      <rect x="12" y="16" width="60" height="6" rx="3" className="fill-foreground/20" />
      <rect x="12" y="28" width="40" height="4" rx="2" className="fill-muted-foreground/30" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="12" y={46 + i * 18} width="96" height="12" rx="4" className="fill-foreground/5" />
          <rect x="16" y={50 + i * 18} width="30" height="4" rx="2" className="fill-muted-foreground/40" />
          <rect x="70" y={50 + i * 18} width="18" height="4" rx="2" className="fill-primary/40" />
          <rect x="92" y={50 + i * 18} width="12" height="4" rx="2" className="fill-foreground/20" />
        </g>
      ))}
    </svg>
  );
}

const features = [
  {
    id: "attendance",
    children: <AttendanceFeature />,
    className: "md:col-span-2",
  },
  {
    id: "rbac",
    children: <RbacFeature />,
    className: "md:col-span-2",
  },
  {
    id: "marks",
    children: <MarksFeature />,
    className: "sm:col-span-2 md:col-span-2",
  },
  {
    id: "assignments",
    children: <AssignmentsFeature />,
    className: "sm:col-span-2 md:col-span-3 p-0",
  },
  {
    id: "reports",
    children: <ReportsFeature />,
    className: "sm:col-span-2 md:col-span-3 p-0",
  },
];
