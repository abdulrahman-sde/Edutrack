import type { Teacher } from "@/types/user";
import type { Student } from "@/types/student";
import type { ClassSection } from "@/types/class";
import type { AttendanceSession } from "@/types/attendance";
import type { Assessment, Grade } from "@/types/marks";
import type { Resource } from "@/types/assignment";

export const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Urdu",
  "Islamiyat",
  "Computer Science",
];

export const classes: ClassSection[] = [
  { id: "c1", name: "Class 9", section: "A", classTeacherId: "t1", subjects: ["Mathematics", "Physics", "Chemistry", "English"], studentCount: 6 },
  { id: "c2", name: "Class 9", section: "B", classTeacherId: "t2", subjects: ["Mathematics", "Biology", "Urdu", "English"], studentCount: 5 },
  { id: "c3", name: "Class 10", section: "A", classTeacherId: "t3", subjects: ["Mathematics", "Physics", "Computer Science", "Islamiyat"], studentCount: 5 },
  { id: "c4", name: "Class 10", section: "B", classTeacherId: "t1", subjects: ["Chemistry", "Biology", "English", "Urdu"], studentCount: 4 },
];

export const teachers: Teacher[] = [
  { id: "t1", name: "Ayesha Khan", email: "ayesha.khan@edutrack.pk", role: "teacher", subjects: ["Mathematics", "Chemistry"], classIds: ["c1", "c4"], phone: "+92 300 1234567", joinedAt: "2022-08-14", avatarUrl: "https://i.pravatar.cc/150?img=47" },
  { id: "t2", name: "Bilal Ahmed", email: "bilal.ahmed@edutrack.pk", role: "teacher", subjects: ["Biology", "Urdu"], classIds: ["c2"], phone: "+92 301 2345678", joinedAt: "2021-03-02", avatarUrl: "https://i.pravatar.cc/150?img=12" },
  { id: "t3", name: "Sana Malik", email: "sana.malik@edutrack.pk", role: "teacher", subjects: ["Physics", "Computer Science"], classIds: ["c3"], phone: "+92 302 3456789", joinedAt: "2023-01-20", avatarUrl: "https://i.pravatar.cc/150?img=32" },
  { id: "t4", name: "Imran Raza", email: "imran.raza@edutrack.pk", role: "teacher", subjects: ["English", "Islamiyat"], classIds: [], phone: "+92 303 4567890", joinedAt: "2020-09-10", avatarUrl: "https://i.pravatar.cc/150?img=68" },
];

export const students: Student[] = [
  { id: "s1", rollNo: "9A-01", name: "Hamza Tariq", classId: "c1", guardianName: "Tariq Mahmood", phone: "+92 311 1111111", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=51" },
  { id: "s2", rollNo: "9A-02", name: "Fatima Noor", classId: "c1", guardianName: "Noor Hassan", phone: "+92 311 2222222", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=45" },
  { id: "s3", rollNo: "9A-03", name: "Usman Ali", classId: "c1", guardianName: "Ali Akbar", phone: "+92 311 3333333", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=15" },
  { id: "s4", rollNo: "9A-04", name: "Zainab Shah", classId: "c1", guardianName: "Shah Nawaz", phone: "+92 311 4444444", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=20" },
  { id: "s5", rollNo: "9A-05", name: "Ahmed Raza", classId: "c1", guardianName: "Raza Hussain", phone: "+92 311 5555555", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=33" },
  { id: "s6", rollNo: "9A-06", name: "Maryam Bibi", classId: "c1", guardianName: "Abdul Sattar", phone: "+92 311 6666666", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=49" },
  { id: "s7", rollNo: "9B-01", name: "Bilal Hussain", classId: "c2", guardianName: "Hussain Shah", phone: "+92 312 1111111", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=53" },
  { id: "s8", rollNo: "9B-02", name: "Ayesha Siddiqui", classId: "c2", guardianName: "Siddiq Ahmed", phone: "+92 312 2222222", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=44" },
  { id: "s9", rollNo: "9B-03", name: "Hassan Javed", classId: "c2", guardianName: "Javed Iqbal", phone: "+92 312 3333333", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=8" },
  { id: "s10", rollNo: "9B-04", name: "Sara Khan", classId: "c2", guardianName: "Khan Zaman", phone: "+92 312 4444444", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=24" },
  { id: "s11", rollNo: "9B-05", name: "Omar Farooq", classId: "c2", guardianName: "Farooq Azam", phone: "+92 312 5555555", enrolledAt: "2024-04-01", avatarUrl: "https://i.pravatar.cc/150?img=59" },
  { id: "s12", rollNo: "10A-01", name: "Ali Hamza", classId: "c3", guardianName: "Hamza Sheikh", phone: "+92 313 1111111", enrolledAt: "2023-04-01", avatarUrl: "https://i.pravatar.cc/150?img=11" },
  { id: "s13", rollNo: "10A-02", name: "Iqra Aslam", classId: "c3", guardianName: "Aslam Pervez", phone: "+92 313 2222222", enrolledAt: "2023-04-01", avatarUrl: "https://i.pravatar.cc/150?img=26" },
  { id: "s14", rollNo: "10A-03", name: "Faizan Sheikh", classId: "c3", guardianName: "Sheikh Rashid", phone: "+92 313 3333333", enrolledAt: "2023-04-01", avatarUrl: "https://i.pravatar.cc/150?img=13" },
  { id: "s15", rollNo: "10A-04", name: "Hira Batool", classId: "c3", guardianName: "Batool Zaidi", phone: "+92 313 4444444", enrolledAt: "2023-04-01", avatarUrl: "https://i.pravatar.cc/150?img=29" },
  { id: "s16", rollNo: "10A-05", name: "Saad Anwar", classId: "c3", guardianName: "Anwar Ali", phone: "+92 313 5555555", enrolledAt: "2023-04-01", avatarUrl: "https://i.pravatar.cc/150?img=60" },
  { id: "s17", rollNo: "10B-01", name: "Nimra Yousaf", classId: "c4", guardianName: "Yousaf Khan", phone: "+92 314 1111111", enrolledAt: "2023-04-01", avatarUrl: "https://i.pravatar.cc/150?img=41" },
  { id: "s18", rollNo: "10B-02", name: "Talha Munir", classId: "c4", guardianName: "Munir Ahmed", phone: "+92 314 2222222", enrolledAt: "2023-04-01", avatarUrl: "https://i.pravatar.cc/150?img=14" },
  { id: "s19", rollNo: "10B-03", name: "Rabia Aslam", classId: "c4", guardianName: "Aslam Baig", phone: "+92 314 3333333", enrolledAt: "2023-04-01", avatarUrl: "https://i.pravatar.cc/150?img=36" },
  { id: "s20", rollNo: "10B-04", name: "Daniyal Khan", classId: "c4", guardianName: "Khan Bahadur", phone: "+92 314 4444444", enrolledAt: "2023-04-01", avatarUrl: "https://i.pravatar.cc/150?img=58" },
];

function gradeFor(pct: number): Grade {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}

export { gradeFor };

const recentDates = ["2026-05-18", "2026-05-19", "2026-05-20", "2026-05-21", "2026-05-22"];

export const attendanceSessions: AttendanceSession[] = recentDates.flatMap((date, di) =>
  classes.map((c, ci) => ({
    id: `att-${c.id}-${date}`,
    classId: c.id,
    subject: c.subjects[0],
    date,
    records: students
      .filter((s) => s.classId === c.id)
      .map((s, si) => {
        const seed = (di + ci + si) % 7;
        const status = seed === 0 ? "absent" : seed === 5 ? "late" : seed === 6 ? "leave" : "present";
        return { studentId: s.id, status } as const;
      }),
  })),
);

export const assessments: Assessment[] = classes.flatMap((c, ci) =>
  c.subjects.slice(0, 2).map((subject, si) => {
    const total = 100;
    return {
      id: `as-${c.id}-${si}`,
      classId: c.id,
      subject,
      type: si === 0 ? "midterm" : "quiz",
      title: si === 0 ? `${subject} Mid-Term` : `${subject} Quiz 2`,
      date: recentDates[(ci + si) % recentDates.length],
      totalMarks: total,
      entries: students
        .filter((s) => s.classId === c.id)
        .map((s, idx) => {
          const obtained = 55 + ((ci * 7 + si * 11 + idx * 13) % 43);
          const pct = (obtained / total) * 100;
          return { studentId: s.id, obtained, total, grade: gradeFor(pct) };
        }),
    } satisfies Assessment;
  }),
);

export const resources: Resource[] = [
  { id: "r1", kind: "assignment", title: "Algebra Problem Set 4", description: "Quadratic equations — solve all 20 problems.", classId: "c1", subject: "Mathematics", fileName: "algebra-set-4.pdf", fileUrl: "#", uploadedAt: "2026-05-20", dueDate: "2026-05-27" },
  { id: "r2", kind: "material", title: "Newton's Laws — Lecture Notes", description: "Chapter 3 summary with worked examples.", classId: "c1", subject: "Physics", fileName: "newtons-laws.pdf", fileUrl: "#", uploadedAt: "2026-05-18" },
  { id: "r3", kind: "assignment", title: "Cell Biology Worksheet", description: "Label the organelles and describe their function.", classId: "c2", subject: "Biology", fileName: "cell-biology.docx", fileUrl: "#", uploadedAt: "2026-05-19", dueDate: "2026-05-25" },
  { id: "r4", kind: "material", title: "Programming Basics Slides", description: "Intro to loops and conditionals in Python.", classId: "c3", subject: "Computer Science", fileName: "programming-basics.pptx", fileUrl: "#", uploadedAt: "2026-05-21" },
  { id: "r5", kind: "assignment", title: "Essay: My Country", description: "300-word descriptive essay.", classId: "c4", subject: "English", fileName: "essay-prompt.pdf", fileUrl: "#", uploadedAt: "2026-05-17", dueDate: "2026-05-24" },
];

// The signed-in teacher for the teacher-facing views (no auth → fixed identity).
export const CURRENT_TEACHER_ID = "t1";
