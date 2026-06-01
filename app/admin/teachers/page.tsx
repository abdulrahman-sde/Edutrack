"use client";

import { useState } from "react";
import { PageIntro } from "@/components/shared/page-intro";
import { TeachersTable } from "../_components/teachers-table";
import { NewTeacherDialog } from "../_components/new-teacher-dialog";

export default function AdminTeachersPage() {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <>
      <PageIntro
        title="Teachers"
        description="Manage faculty, their subjects, and class assignments."
        action={
          <NewTeacherDialog onCreated={() => setReloadKey((k) => k + 1)} />
        }
      />
      <TeachersTable reloadKey={reloadKey} />
    </>
  );
}
