import { PageIntro } from "@/components/shared/page-intro";
import { ClassReport } from "../_components/class-report";

export default function TeacherReportsPage() {
  return (
    <>
      <PageIntro
        title="Class performance"
        description="Per-subject averages, attendance, and overall grades for your class."
      />
      <ClassReport />
    </>
  );
}
