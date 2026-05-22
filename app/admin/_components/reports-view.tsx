"use client";

import { useState } from "react";
import { TrendingUpIcon, CalendarCheckIcon, AwardIcon, LayersIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { GradeBadge } from "@/components/shared/grade-badge";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useStudentReports, useInstitutionStats, useClasses } from "../hooks/use-admin-data";

const STAT_ICONS = [TrendingUpIcon, CalendarCheckIcon, AwardIcon, LayersIcon];

export function ReportsView() {
  const [classFilter, setClassFilter] = useState("all");
  const { data: stats } = useInstitutionStats();
  const { data: classes } = useClasses();
  const { data: reports, loading } = useStudentReports(classFilter);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {(stats ?? []).map((s, i) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            delta={s.delta}
            trend={s.trend}
            icon={STAT_ICONS[i % STAT_ICONS.length]}
          />
        ))}
      </div>

      <Select value={classFilter} onValueChange={setClassFilter}>
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Filter by class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All classes</SelectItem>
          {classes?.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name} · {c.section}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
                <TableHead className="w-40">Overall</TableHead>
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={r.overallPercentage} className="w-24" />
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
