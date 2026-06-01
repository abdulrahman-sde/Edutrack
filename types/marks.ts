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
  examId?: string;
  examTitle?: string;
};

export type ExamTerm = "midterm" | "final" | "monthly" | "pre-board";

// Institution-wide exam created by an admin, spanning one or more classes.
export type Exam = {
  id: string;
  title: string;
  term: ExamTerm;
  classIds: string[];
  startDate: string;
  endDate: string;
};
