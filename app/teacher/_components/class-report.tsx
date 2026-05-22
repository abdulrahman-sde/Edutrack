"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { GradeBadge } from "@/components/shared/grade-badge";
import { LoadingRows } from "@/components/shared/loading-rows";
import { ClassPicker } from "./class-picker";
import { useMyClasses, useClassReports } from "../hooks/use-teacher-data";

export function ClassReport() {
  const { data: classes } = useMyClasses();
  const [classId, setClassId] = useState<string>();
  const { data: reports, loading } = useClassReports(classId);

  useEffect(() => {
    if (classes?.length && !classId) setClassId(classes[0].id);
  }, [classes, classId]);

  const subjects = reports?.[0]?.subjects.map((s) => s.subject) ?? [];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Class</span>
        <ClassPicker classes={classes} value={classId} onChange={setClassId} />
      </div>

      {loading || !reports ? (
        <Card className="p-4">
          <LoadingRows rows={6} />
        </Card>
      ) : (
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Attendance</TableHead>
                {subjects.map((s) => (
                  <TableHead key={s}>{s}</TableHead>
                ))}
                <TableHead className="w-32">Overall</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.studentId}>
                  <TableCell className="font-medium">{r.studentName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.attendancePercentage}%
                  </TableCell>
                  {subjects.map((subj) => {
                    const sp = r.subjects.find((x) => x.subject === subj);
                    return (
                      <TableCell key={subj} className="text-muted-foreground">
                        {sp ? `${sp.averagePercentage}%` : "—"}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={r.overallPercentage} className="w-16" />
                      <span className="text-xs text-muted-foreground">
                        {r.overallPercentage}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <GradeBadge grade={r.overallGrade} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
