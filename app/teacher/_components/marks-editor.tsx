"use client";

import { useEffect, useState } from "react";
import { SaveIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { GradeBadge } from "@/components/shared/grade-badge";
import { LoadingRows } from "@/components/shared/loading-rows";
import { gradeFor } from "@/lib/mock/data";
import { useAssessments, useClassStudents } from "../hooks/use-teacher-data";

export function MarksEditor({ classId }: { classId: string | undefined }) {
  const { data: assessments, loading } = useAssessments(classId);
  const { data: students } = useClassStudents(classId);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (assessments) {
      const init: Record<string, number> = {};
      for (const a of assessments) {
        for (const e of a.entries) init[`${a.id}:${e.studentId}`] = e.obtained;
      }
      setScores(init);
      setSaved(false);
    }
  }, [assessments]);

  if (loading || !assessments || !students) {
    return (
      <Card className="p-4">
        <LoadingRows rows={5} />
      </Card>
    );
  }

  if (!assessments.length) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground">
        No assessments for this class yet.
      </Card>
    );
  }

  return (
    <Tabs defaultValue={assessments[0].id}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList>
          {assessments.map((a) => (
            <TabsTrigger key={a.id} value={a.id}>
              {a.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button onClick={() => setSaved(true)} variant={saved ? "secondary" : "default"}>
          <SaveIcon data-icon="inline-start" />
          {saved ? "Saved" : "Save marks"}
        </Button>
      </div>

      {assessments.map((a) => (
        <TabsContent key={a.id} value={a.id}>
          <Card className="py-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="w-40">
                    Marks (/{a.totalMarks})
                  </TableHead>
                  <TableHead>%</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s) => {
                  const key = `${a.id}:${s.id}`;
                  const obtained = scores[key] ?? 0;
                  const pct = Math.round((obtained / a.totalMarks) * 100);
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={a.totalMarks}
                          value={obtained}
                          onChange={(e) => {
                            const v = Math.max(0, Math.min(a.totalMarks, Number(e.target.value)));
                            setScores((m) => ({ ...m, [key]: v }));
                            setSaved(false);
                          }}
                          className="h-8 w-24"
                        />
                      </TableCell>
                      <TableCell className="text-muted-foreground">{pct}%</TableCell>
                      <TableCell>
                        <GradeBadge grade={gradeFor(pct)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
