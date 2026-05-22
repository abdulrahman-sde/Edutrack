export type AssessmentType = "quiz" | "assignment" | "midterm" | "final";

export type Grade = "A+" | "A" | "B" | "C" | "D" | "F";

export type MarkEntry = {
  studentId: string;
  obtained: number;
  total: number;
  grade: Grade;
};

export type Assessment = {
  id: string;
  classId: string;
  subject: string;
  type: AssessmentType;
  title: string;
  date: string;
  totalMarks: number;
  entries: MarkEntry[];
};
