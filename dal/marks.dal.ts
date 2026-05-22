import { assessments } from "@/lib/mock/data";
import { delay } from "./_mock";
import type { Assessment, AssessmentType } from "@/types/marks";

export function getAssessmentsForClass(classId: string): Promise<Assessment[]> {
  return delay(assessments.filter((a) => a.classId === classId));
}

export function getAllAssessments(): Promise<Assessment[]> {
  return delay(assessments);
}

export type CreateAssessmentInput = {
  classId: string;
  subject: string;
  type: AssessmentType;
  title: string;
  totalMarks: number;
};

export function createAssessment(input: CreateAssessmentInput): Promise<Assessment> {
  const created: Assessment = {
    id: `as-${input.classId}-${Date.now()}`,
    classId: input.classId,
    subject: input.subject,
    type: input.type,
    title: input.title,
    date: new Date().toISOString().slice(0, 10),
    totalMarks: input.totalMarks,
    entries: [],
  };
  assessments.push(created);
  return delay(created);
}
