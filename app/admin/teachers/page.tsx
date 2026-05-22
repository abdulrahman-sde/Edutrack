import { PlusIcon } from "lucide-react";
import { PageIntro } from "@/components/shared/page-intro";
import { Button } from "@/components/ui/button";
import { TeachersTable } from "../_components/teachers-table";

export default function AdminTeachersPage() {
  return (
    <>
      <PageIntro
        title="Teachers"
        description="Manage faculty, their subjects, and class assignments."
        action={
          <Button>
            <PlusIcon data-icon="inline-start" /> Add teacher
          </Button>
        }
      />
      <TeachersTable />
    </>
  );
}
