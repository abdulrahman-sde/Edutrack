"use client";

import { useState } from "react";
import { CalendarRangeIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useClasses, useExams } from "../../hooks/use-admin-data";
import { NewExamDialog } from "./new-exam-dialog";

const TERM_LABELS: Record<string, string> = {
  monthly: "Monthly",
  midterm: "Mid-Term",
  "pre-board": "Pre-Board",
  final: "Final",
};

function formatRange(start: string, end: string) {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const s = new Date(start).toLocaleDateString("en-GB", opts);
  const e = new Date(end).toLocaleDateString("en-GB", { ...opts, year: "numeric" });
  return `${s} – ${e}`;
}

export function ExamsView() {
  const [reloadKey, setReloadKey] = useState(0);
  const { data: exams, loading } = useExams(reloadKey);
  const { data: classes } = useClasses();

  if (loading || !exams || !classes) {
    return (
      <Card className="p-4">
        <LoadingRows rows={3} />
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <NewExamDialog classes={classes} onCreated={() => setReloadKey((k) => k + 1)} />
      </div>

      {exams.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">
          No institution exams scheduled yet.
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {exams.map((exam) => {
            const examClasses = classes.filter((c) => exam.classIds.includes(c.id));
            return (
              <Card key={exam.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    {exam.title}
                    <Badge variant="secondary">{TERM_LABELS[exam.term] ?? exam.term}</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <CalendarRangeIcon className="size-3.5" />
                    {formatRange(exam.startDate, exam.endDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {examClasses.map((c) => (
                      <Badge key={c.id} variant="muted">
                        {c.name} · {c.section}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
