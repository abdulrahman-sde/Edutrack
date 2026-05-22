import { assessments } from "@/lib/mock/data";
import { delay } from "./_mock";
import type { Assessment } from "@/types/marks";

export function getAssessmentsForClass(classId: string): Promise<Assessment[]> {
  return delay(assessments.filter((a) => a.classId === classId));
}

export function getAllAssessments(): Promise<Assessment[]> {
  return delay(assessments);
}
