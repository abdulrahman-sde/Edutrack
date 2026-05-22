import { PageIntro } from "@/components/shared/page-intro";
import { MarksSection } from "../_components/marks-section";

export default function TeacherMarksPage() {
  return (
    <>
      <PageIntro
        title="Marks & grading"
        description="Enter marks per assessment — grades update automatically."
      />
      <MarksSection />
    </>
  );
}
