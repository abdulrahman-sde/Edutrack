import { PageIntro } from "@/components/shared/page-intro";
import { ExamsView } from "./_components/exams-view";

export default function AdminExamsPage() {
  return (
    <>
      <PageIntro
        title="Exams"
        description="Schedule institution-wide exams across classes — teachers enter marks per subject."
      />
      <ExamsView />
    </>
  );
}
