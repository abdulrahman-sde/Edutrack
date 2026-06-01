"use client";

import { useState } from "react";
import { PageIntro } from "@/components/shared/page-intro";
import { StudentsTable } from "../_components/students-table";
import { NewStudentDialog } from "../_components/new-student-dialog";

export default function AdminStudentsPage() {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <>
      <PageIntro
        title="Students"
        description="Enrolled students across all classes and sections."
        action={
          <NewStudentDialog onCreated={() => setReloadKey((k) => k + 1)} />
        }
      />
      <StudentsTable reloadKey={reloadKey} />
    </>
  );
}
