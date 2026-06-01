export type SubjectTeacher = {
  subject: string;
  teacherId: string;
  teacherName: string;
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
};

export type ClassSection = {
  id: string;
  name: string;
  section: string;
  subjectTeachers: SubjectTeacher[];
  studentCount: number;
};
