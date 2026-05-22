import { students } from "@/lib/mock/data";
import { delay } from "./_mock";
import type { Student } from "@/types/student";

export function getStudents(): Promise<Student[]> {
  return delay(students);
}

export function getStudentsByClass(classId: string): Promise<Student[]> {
  return delay(students.filter((s) => s.classId === classId));
}

export function getStudentById(id: string): Promise<Student | undefined> {
  return delay(students.find((s) => s.id === id));
}
