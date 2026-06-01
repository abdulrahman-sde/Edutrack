"use client";

import { useAsync } from "@/hooks/use-async";
import { API_BASE } from "@/lib/api-client";
import type { Exam, ExamTerm } from "@/types/marks";
import type { InstitutionStat, StudentReport } from "@/types/report";
import type { Teacher } from "@/types/user";
import type { Student } from "@/types/student";
import type { ClassSection } from "@/types/class";
import type { Subject } from "@/types/subject";

const TOKEN_KEY = "edutrack_token";

function authHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Request failed");
  return json.data as T;
}

export type CreateExamInput = {
  title: string;
  term: ExamTerm;
  classIds: string[];
  startDate: string;
  endDate: string;
};

export function useTeachers(reloadKey = 0) {
  return useAsync(() => fetchJson<Teacher[]>(`${API_BASE}/teachers`, { headers: authHeaders() }), [reloadKey]);
}

export function useStudents(reloadKey = 0) {
  return useAsync(() => fetchJson<Student[]>(`${API_BASE}/students`, { headers: authHeaders() }), [reloadKey]);
}

export function useCreateStudent() {
  return async (input: Record<string, unknown>) =>
    fetchJson<Student>(`${API_BASE}/students`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(input),
    });
}

export function useStudentsByClass(classId: string | undefined) {
  const query = classId ? `?classId=${classId}` : "";
  return useAsync(
    () =>
      classId
        ? fetchJson<Student[]>(`${API_BASE}/students${query}`, { headers: authHeaders() })
        : Promise.resolve(undefined),
    [classId],
  );
}

export function useClasses(reloadKey = 0) {
  return useAsync(() => fetchJson<ClassSection[]>(`${API_BASE}/classes`, { headers: authHeaders() }), [reloadKey]);
}

export function useStudentReports(classId?: string) {
  const query = classId && classId !== "all" ? `?classId=${classId}` : "";
  return useAsync(
    () => fetchJson<StudentReport[]>(`${API_BASE}/reports${query}`, { headers: authHeaders() }),
    [classId],
  );
}

export function useInstitutionStats() {
  return useAsync(
    () => fetchJson<InstitutionStat[]>(`${API_BASE}/reports/stats`, { headers: authHeaders() }),
    [],
  );
}

export function useExams(reloadKey = 0) {
  return useAsync(() => fetchJson<Exam[]>(`${API_BASE}/exams`, { headers: authHeaders() }), [reloadKey]);
}

export function useCreateExam() {
  return (input: CreateExamInput) =>
    fetchJson<Exam>(`${API_BASE}/exams`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(input),
    });
}

export function useCreateTeacher() {
  return async (input: Record<string, unknown>) =>
    fetchJson<Teacher>(`${API_BASE}/teachers`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(input),
    });
}

export function useClass(id: string | undefined) {
  return useAsync(
    () =>
      id
        ? fetchJson<ClassSection>(`${API_BASE}/classes/${id}`, { headers: authHeaders() })
        : Promise.resolve(undefined),
    [id],
  );
}

export function useSubjects() {
  return useAsync(() => fetchJson<Subject[]>(`${API_BASE}/subjects`, { headers: authHeaders() }), []);
}

export function useTeacher(id: string | undefined) {
  return useAsync(
    () =>
      id
        ? fetchJson<Teacher>(`${API_BASE}/teachers/${id}`, { headers: authHeaders() })
        : Promise.resolve(undefined),
    [id],
  );
}

export function useUpdateClass() {
  return async (id: string, input: Record<string, unknown>) =>
    fetchJson<ClassSection>(`${API_BASE}/classes/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(input),
    });
}

export function useUpdateTeacher() {
  return async (id: string, input: Record<string, unknown>) =>
    fetchJson<Teacher>(`${API_BASE}/teachers/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(input),
    });
}

export function useStudent(id: string | undefined) {
  return useAsync(
    () =>
      id
        ? fetchJson<Student>(`${API_BASE}/students/${id}`, { headers: authHeaders() })
        : Promise.resolve(undefined),
    [id],
  );
}

export function useUpdateStudent() {
  return async (id: string, input: Record<string, unknown>) =>
    fetchJson<Student>(`${API_BASE}/students/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(input),
    });
}
