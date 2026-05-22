import { PageIntro } from "@/components/shared/page-intro";
import { TeacherStats } from "./_components/teacher-stats";
import { MyClasses } from "./_components/my-classes";

export default function TeacherOverviewPage() {
  return (
    <>
      <PageIntro
        title="Welcome back, Ayesha"
        description="Your classes, attendance, and grading at a glance."
      />
      <div className="space-y-6">
        <TeacherStats />
        <MyClasses />
      </div>
    </>
  );
}
