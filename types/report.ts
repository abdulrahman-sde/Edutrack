export type SubjectPerformance = {
  subject: string;
  averagePercentage: number;
  grade: string;
};

export type StudentReport = {
  studentId: string;
  studentName: string;
  classId: string;
  attendancePercentage: number;
  overallPercentage: number;
  overallGrade: string;
  subjects: SubjectPerformance[];
};

export type InstitutionStat = {
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down";
};
