import { PageIntro } from "@/components/shared/page-intro";
import { ResourcesManager } from "../_components/resources-manager";

export default function TeacherAssignmentsPage() {
  return (
    <>
      <PageIntro
        title="Assignments & materials"
        description="Share assignments and learning materials with your classes."
      />
      <ResourcesManager />
    </>
  );
}
