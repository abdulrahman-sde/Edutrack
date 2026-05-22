import { teachers } from "@/lib/mock/data";
import { delay } from "./_mock";
import type { Teacher } from "@/types/user";

export function getTeachers(): Promise<Teacher[]> {
  return delay(teachers);
}

export function getTeacherById(id: string): Promise<Teacher | undefined> {
  return delay(teachers.find((t) => t.id === id));
}
