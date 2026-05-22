import { exams } from "@/lib/mock/data";
import { delay } from "./_mock";
import type { Exam, ExamTerm } from "@/types/marks";

export function getExams(): Promise<Exam[]> {
  return delay(exams);
}

export type CreateExamInput = {
  title: string;
  term: ExamTerm;
  classIds: string[];
  startDate: string;
  endDate: string;
};

export function createExam(input: CreateExamInput): Promise<Exam> {
  const created: Exam = {
    id: `ex-${Date.now()}`,
    title: input.title,
    term: input.term,
    classIds: input.classIds,
    startDate: input.startDate,
    endDate: input.endDate,
  };
  exams.push(created);
  return delay(created);
}
