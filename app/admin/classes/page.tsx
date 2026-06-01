"use client";

import { useState } from "react";
import { PageIntro } from "@/components/shared/page-intro";
import { ClassesGrid } from "../_components/classes-grid";
import { NewClassDialog } from "../_components/new-class-dialog";

export default function AdminClassesPage() {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <>
      <PageIntro
        title="Classes"
        description="Class sections, assigned teachers, and offered subjects."
        action={<NewClassDialog onCreated={() => setReloadKey((k) => k + 1)} />}
      />
      <ClassesGrid reloadKey={reloadKey} />
    </>
  );
}
