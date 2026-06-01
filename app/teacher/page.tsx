import { PageIntro } from "@/components/shared/page-intro";
import { TeacherStats } from "./_components/teacher-stats";

export default function TeacherOverviewPage() {
  return (
    <>
      <PageIntro
        title="Welcome back, Ayesha"
        description="Your classes, attendance, and grading at a glance."
      />
      <TeacherStats />
    </>
  );
}
