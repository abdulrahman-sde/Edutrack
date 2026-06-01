import {
  LayoutDashboardIcon,
  UsersIcon,
  GraduationCapIcon,
  LayersIcon,
  FileBarChartIcon,
  CalendarCheckIcon,
  ClipboardListIcon,
  FolderUpIcon,
  TrendingUpIcon,
  FileCheckIcon,
  CalendarIcon,
  type LucideIcon,
} from "lucide-react";

// Icons are referenced by name so nav config can cross the server→client
// boundary (functions cannot be serialized into Client Components).
export const NAV_ICONS = {
  overview: LayoutDashboardIcon,
  teachers: UsersIcon,
  students: GraduationCapIcon,
  classes: LayersIcon,
  reports: FileBarChartIcon,
  attendance: CalendarCheckIcon,
  marks: ClipboardListIcon,
  exams: FileCheckIcon,
  assignments: FolderUpIcon,
  performance: TrendingUpIcon,
  timetable: CalendarIcon,
} satisfies Record<string, LucideIcon>;

export type NavIconName = keyof typeof NAV_ICONS;

export type NavItem = {
  label: string;
  href: string;
  icon: NavIconName;
};
