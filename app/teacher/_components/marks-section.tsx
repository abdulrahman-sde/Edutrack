"use client";

import { useState } from "react";
import { BookOpen, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ClassPicker } from "./class-picker";
import { MarksEditor } from "./marks-editor";
import { useMyClasses } from "../hooks/use-teacher-data";

export function MarksSection() {
  const { data: classes } = useMyClasses();
  const [classId, setClassId] = useState<string>();
  const [reloadKey, setReloadKey] = useState(0);
  const resolvedClassId = classId ?? classes?.[0]?.id;
  const selectedClass = classes?.find((c) => c.id === resolvedClassId);
  const subjects = [...new Set(selectedClass?.subjectTeachers.map((st) => st.subject) ?? [])];

  return (
    <div className="space-y-4">
      {/* Class info + picker */}
      <Card>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div>
              {selectedClass ? (
                <>
                  <h2 className="text-base font-semibold">
                    {selectedClass.name}
                    <span className="text-muted-foreground"> · {selectedClass.section}</span>
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="size-3.5" />
                      {subjects.length} {subjects.length === 1 ? "subject" : "subjects"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" />
                      {selectedClass.studentCount}{" "}
                      {selectedClass.studentCount === 1 ? "student" : "students"}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Select a class to view assessments</p>
              )}
            </div>
          </div>
          <ClassPicker classes={classes} value={classId} onChange={setClassId} />
        </div>
      </Card>

      <MarksEditor
        classId={resolvedClassId}
        reloadKey={reloadKey}
        onCreated={() => setReloadKey((k) => k + 1)}
      />
    </div>
  );
}
