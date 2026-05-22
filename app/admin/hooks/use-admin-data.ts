"use client";

import { useAsync } from "@/hooks/use-async";
import { getTeachers } from "@/dal/teachers.dal";
import { getStudents } from "@/dal/students.dal";
import { getClasses } from "@/dal/classes.dal";
import { getStudentReports, getInstitutionStats } from "@/dal/reports.dal";
import { getExams, createExam, type CreateExamInput } from "@/dal/exams.dal";

export function useTeachers() {
  return useAsync(() => getTeachers(), []);
}

export function useStudents() {
  return useAsync(() => getStudents(), []);
}

export function useClasses() {
  return useAsync(() => getClasses(), []);
}

export function useStudentReports(classId?: string) {
  return useAsync(() => getStudentReports(classId === "all" ? undefined : classId), [classId]);
}

export function useInstitutionStats() {
  return useAsync(() => getInstitutionStats(), []);
}

export function useExams(reloadKey = 0) {
  return useAsync(() => getExams(), [reloadKey]);
}

export function useCreateExam() {
  return (input: CreateExamInput) => createExam(input);
}
