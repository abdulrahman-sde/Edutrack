"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useStudents, useClasses } from "../hooks/use-admin-data";

export function StudentsTable({ reloadKey = 0 }: { reloadKey?: number }) {
  const { data: students, loading } = useStudents(reloadKey);
  const { data: classes } = useClasses();
  const [classFilter, setClassFilter] = useState<string>("all");

  const filtered =
    classFilter === "all"
      ? students
      : students?.filter((s) => s.classId === classFilter);

  return (
    <div className="space-y-4">
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

      {loading || !filtered ? (
        <Card className="p-4">
          <LoadingRows rows={6} />
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">
          No students enrolled yet.
        </Card>
      ) : (
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>GR No.</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {s.admissionNumber}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-7">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(s.name)}`}
                          alt={s.name}
                        />
                        <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <Link
                        href={`/admin/students/${s.id}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {s.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {s.className ?? <Badge variant="outline">Unassigned</Badge>}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {s.rollNumber ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{s.guardianName ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{s.guardianPhone ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
