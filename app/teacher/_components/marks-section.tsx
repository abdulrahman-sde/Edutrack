"use client";

import { useEffect, useState } from "react";
import { ClassPicker } from "./class-picker";
import { MarksEditor } from "./marks-editor";
import { useMyClasses } from "../hooks/use-teacher-data";

export function MarksSection() {
  const { data: classes } = useMyClasses();
  const [classId, setClassId] = useState<string>();
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (classes?.length && !classId) setClassId(classes[0].id);
  }, [classes, classId]);

  const subjects = classes?.find((c) => c.id === classId)?.subjects ?? [];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Class</span>
        <ClassPicker classes={classes} value={classId} onChange={setClassId} />
      </div>
      <MarksEditor
        classId={classId}
        subjects={subjects}
        reloadKey={reloadKey}
        onCreated={() => setReloadKey((k) => k + 1)}
      />
    </div>
  );
}
