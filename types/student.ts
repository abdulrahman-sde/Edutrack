export type Gender = "male" | "female" | "other";

export type Student = {
  id: string;
  admissionNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: string;
  guardianName: string | null;
  guardianPhone: string | null;
  address: string | null;
  isActive: boolean;
  classId: string | null;
  className: string | null;
  rollNumber: number | null;
  enrolledAt: string | null;
};
