export type AttendanceStatus = "present" | "absent" | "late" | "leave";

export type AttendanceRecord = {
  studentId: string;
  status: AttendanceStatus;
};

export type AttendanceSummary = {
  studentId: string;
  present: number;
  absent: number;
  late: number;
  total: number;
  percentage: number;
};
