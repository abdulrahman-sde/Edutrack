"use client";

import { useAsync } from "@/hooks/use-async";
import { getClassesForTeacher } from "@/dal/classes.dal";
import { getStudentsByClass } from "@/dal/students.dal";
import { getAttendanceSummary } from "@/dal/attendance.dal";
import { getAssessmentsForClass } from "@/dal/marks.dal";
import { getResources } from "@/dal/resources.dal";
import { getStudentReports } from "@/dal/reports.dal";

export function useMyClasses() {
  return useAsync(() => getClassesForTeacher(), []);
}

export function useClassStudents(classId: string | undefined) {
  return useAsync(
    () => (classId ? getStudentsByClass(classId) : Promise.resolve([])),
    [classId],
  );
}

export function useAttendanceSummary(classId: string | undefined) {
  return useAsync(
    () => (classId ? getAttendanceSummary(classId) : Promise.resolve([])),
    [classId],
  );
}

export function useAssessments(classId: string | undefined) {
  return useAsync(
    () => (classId ? getAssessmentsForClass(classId) : Promise.resolve([])),
    [classId],
  );
}

export function useMyResources() {
  return useAsync(() => getResources(), []);
}

export function useClassReports(classId: string | undefined) {
  return useAsync(
    () => (classId ? getStudentReports(classId) : Promise.resolve([])),
    [classId],
  );
}
