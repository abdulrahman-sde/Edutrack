import { students, classes, assessments, attendanceSessions, gradeFor } from "@/lib/mock/data";
import { delay } from "./_mock";
import type { StudentReport, SubjectPerformance, InstitutionStat } from "@/types/report";

function buildReport(studentId: string): StudentReport {
  const student = students.find((s) => s.id === studentId)!;

  const subjectMap = new Map<string, { sumPct: number; count: number }>();
  for (const a of assessments.filter((x) => x.classId === student.classId)) {
    const entry = a.entries.find((e) => e.studentId === studentId);
    if (!entry) continue;
    const pct = (entry.obtained / entry.total) * 100;
    const cur = subjectMap.get(a.subject) ?? { sumPct: 0, count: 0 };
    subjectMap.set(a.subject, { sumPct: cur.sumPct + pct, count: cur.count + 1 });
  }

  const subjects: SubjectPerformance[] = [...subjectMap.entries()].map(
    ([subject, { sumPct, count }]) => {
      const avg = Math.round(sumPct / count);
      return { subject, averagePercentage: avg, grade: gradeFor(avg) };
    },
  );

  const overallPercentage = subjects.length
    ? Math.round(subjects.reduce((a, b) => a + b.averagePercentage, 0) / subjects.length)
    : 0;

  const sessions = attendanceSessions.filter((s) => s.classId === student.classId);
  let attended = 0;
  for (const session of sessions) {
    const rec = session.records.find((r) => r.studentId === studentId);
    if (rec && (rec.status === "present" || rec.status === "late")) attended++;
  }
  const attendancePercentage = sessions.length
    ? Math.round((attended / sessions.length) * 100)
    : 0;

  return {
    studentId,
    studentName: student.name,
    classId: student.classId,
    attendancePercentage,
    overallPercentage,
    overallGrade: gradeFor(overallPercentage),
    subjects,
  };
}

export function getStudentReports(classId?: string): Promise<StudentReport[]> {
  const pool = classId ? students.filter((s) => s.classId === classId) : students;
  return delay(pool.map((s) => buildReport(s.id)));
}

export function getInstitutionStats(): Promise<InstitutionStat[]> {
  const reports = students.map((s) => buildReport(s.id));
  const avgPerf = Math.round(
    reports.reduce((a, b) => a + b.overallPercentage, 0) / reports.length,
  );
  const avgAtt = Math.round(
    reports.reduce((a, b) => a + b.attendancePercentage, 0) / reports.length,
  );
  const passRate = Math.round(
    (reports.filter((r) => r.overallPercentage >= 50).length / reports.length) * 100,
  );

  const stats: InstitutionStat[] = [
    { label: "Avg. performance", value: `${avgPerf}%`, delta: 4, trend: "up" },
    { label: "Avg. attendance", value: `${avgAtt}%`, delta: 2, trend: "up" },
    { label: "Pass rate", value: `${passRate}%`, delta: 1, trend: "up" },
    { label: "Active classes", value: String(classes.length), delta: 0, trend: "up" },
  ];
  return delay(stats);
}
