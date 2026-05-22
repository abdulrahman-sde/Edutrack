import { PlusIcon } from "lucide-react";
import { PageIntro } from "@/components/shared/page-intro";
import { Button } from "@/components/ui/button";
import { StudentsTable } from "../_components/students-table";

export default function AdminStudentsPage() {
  return (
    <>
      <PageIntro
        title="Students"
        description="Enrolled students across all classes and sections."
        action={
          <Button>
            <PlusIcon data-icon="inline-start" /> Enroll student
          </Button>
        }
      />
      <StudentsTable />
    </>
  );
}
