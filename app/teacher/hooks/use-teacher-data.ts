"use client";

import { API_BASE, apiClient } from "@/lib/api-client";
import { useAsync } from "@/hooks/use-async";
import type { ClassSection } from "@/types/class";
import type { Student } from "@/types/student";
import type { AttendanceRecord, AttendanceSummary } from "@/types/attendance";
import type { Assessment, AssessmentType } from "@/types/marks";
import type { Resource } from "@/types/assignment";
import type { StudentReport } from "@/types/report";

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

export type CreateAssessmentInput = {
  classId: string;
  subject: string;
  type: AssessmentType;
  title: string;
  totalMarks: number;
};

export function useMyClasses() {
  return useAsync(
    () => fetchJson<ClassSection[]>(`${API_BASE}/classes?scope=teacher`, { headers: authHeaders() }),
    [],
  );
}

export function useClassStudents(classId: string | undefined) {
  return useAsync(
    () =>
      classId
        ? fetchJson<Student[]>(`${API_BASE}/students?classId=${classId}`, {
            headers: authHeaders(),
          })
        : Promise.resolve([]),
    [classId],
  );
}

export function useAttendanceRecords(classId: string | undefined, subject: string) {
  return useAsync(
    () => {
      if (!classId || !subject) return Promise.resolve([]);
      const today = new Date().toISOString().split("T")[0];
      return fetchJson<AttendanceRecord[]>(
        `${API_BASE}/classes/${classId}/attendance?subject=${encodeURIComponent(subject)}&date=${today}`,
        { headers: authHeaders() },
      );
    },
    [classId, subject],
  );
}

export function useAttendanceSummary(classId: string | undefined) {
  return useAsync(
    () =>
      classId
        ? fetchJson<AttendanceSummary[]>(
            `${API_BASE}/classes/${classId}/attendance/summary`,
            { headers: authHeaders() },
          )
        : Promise.resolve([]),
    [classId],
  );
}

export function useAssessments(classId: string | undefined, reloadKey = 0) {
  return useAsync(
    () =>
      classId
        ? fetchJson<Assessment[]>(`${API_BASE}/classes/${classId}/assessments`, {
            headers: authHeaders(),
          })
        : Promise.resolve([]),
    [classId, reloadKey],
  );
}

export function useCreateAssessment() {
  return (input: CreateAssessmentInput) =>
    fetchJson<Assessment>(`${API_BASE}/classes/${input.classId}/assessments`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(input),
    });
}

export function useSaveMarks() {
  return async (classId: string, assessmentId: string, entries: { studentId: string; obtained: number }[]) =>
    fetchJson<Assessment>(`${API_BASE}/classes/${classId}/assessments/${assessmentId}/marks`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ entries }),
    });
}

export function useMyResources(key: number = 0) {
  return useAsync(
    () => apiClient<Resource[]>("/resources"),
    [key],
  );
}

export function useUploadResource() {
  const token = typeof window !== "undefined" ? localStorage.getItem("edutrack_token") : null;
  return async (formData: FormData) => {
    const res = await fetch(`${API_BASE}/resources`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Upload failed");
    return json.data as Resource;
  };
}

export function useDeleteResource() {
  return (id: string) =>
    apiClient<void>(`/resources/${id}`, { method: "DELETE" });
}

export function useClassReports(classId: string | undefined) {
  return useAsync(
    () =>
      classId
        ? fetchJson<StudentReport[]>(`${API_BASE}/reports?classId=${classId}`, {
            headers: authHeaders(),
          })
        : Promise.resolve([]),
    [classId],
  );
}
