import { PlusIcon } from "lucide-react";
import { PageIntro } from "@/components/shared/page-intro";
import { Button } from "@/components/ui/button";
import { ClassesGrid } from "../_components/classes-grid";

export default function AdminClassesPage() {
  return (
    <>
      <PageIntro
        title="Classes"
        description="Class sections, assigned teachers, and offered subjects."
        action={
          <Button>
            <PlusIcon data-icon="inline-start" /> New class
          </Button>
        }
      />
      <ClassesGrid />
    </>
  );
}
