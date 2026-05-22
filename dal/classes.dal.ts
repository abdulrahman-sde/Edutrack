import { classes, CURRENT_TEACHER_ID } from "@/lib/mock/data";
import { delay } from "./_mock";
import type { ClassSection } from "@/types/class";

export function getClasses(): Promise<ClassSection[]> {
  return delay(classes);
}

export function getClassesForTeacher(teacherId: string = CURRENT_TEACHER_ID): Promise<ClassSection[]> {
  return delay(classes.filter((c) => c.classTeacherId === teacherId));
}

export function getClassById(id: string): Promise<ClassSection | undefined> {
  return delay(classes.find((c) => c.id === id));
}
