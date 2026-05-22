import { attendanceSessions, students } from "@/lib/mock/data";
import { delay } from "./_mock";
import type { AttendanceSession, AttendanceSummary } from "@/types/attendance";

export function getAttendanceForClass(classId: string): Promise<AttendanceSession[]> {
  return delay(attendanceSessions.filter((a) => a.classId === classId));
}

export function getAttendanceSummary(classId: string): Promise<AttendanceSummary[]> {
  const sessions = attendanceSessions.filter((a) => a.classId === classId);
  const summary: AttendanceSummary[] = students
    .filter((s) => s.classId === classId)
    .map((s) => {
      let present = 0;
      let absent = 0;
      let late = 0;
      for (const session of sessions) {
        const rec = session.records.find((r) => r.studentId === s.id);
        if (!rec) continue;
        if (rec.status === "present") present++;
        else if (rec.status === "absent") absent++;
        else if (rec.status === "late") late++;
      }
      const total = sessions.length;
      const percentage = total ? Math.round(((present + late) / total) * 100) : 0;
      return { studentId: s.id, present, absent, late, total, percentage };
    });
  return delay(summary);
}
