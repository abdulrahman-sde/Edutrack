"use client";

import { useState } from "react";
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
import { LoadingRows } from "@/components/shared/loading-rows";
import { useStudents, useClasses } from "../hooks/use-admin-data";

export function StudentsTable() {
  const { data: students, loading } = useStudents();
  const { data: classes } = useClasses();
  const [classFilter, setClassFilter] = useState<string>("all");

  const classLabel = (id: string) => {
    const c = classes?.find((x) => x.id === id);
    return c ? `${c.name} · ${c.section}` : id;
  };

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
      ) : (
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {s.rollNo}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-7">
                        <AvatarImage src={s.avatarUrl} alt={s.name} />
                        <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {classLabel(s.classId)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{s.guardianName}</TableCell>
                  <TableCell className="text-muted-foreground">{s.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
