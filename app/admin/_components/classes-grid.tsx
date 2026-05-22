"use client";

import { UsersIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useClasses, useTeachers } from "../hooks/use-admin-data";

export function ClassesGrid() {
  const { data: classes, loading } = useClasses();
  const { data: teachers } = useTeachers();

  if (loading || !classes) {
    return (
      <Card className="p-4">
        <LoadingRows rows={4} />
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {classes.map((c) => {
        const teacher = teachers?.find((t) => t.id === c.classTeacherId);
        return (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {c.name} · {c.section}
                <Badge variant="secondary" className="gap-1">
                  <UsersIcon /> {c.studentCount}
                </Badge>
              </CardTitle>
              <CardDescription>Class teacher: {teacher?.name ?? "—"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {c.subjects.map((s) => (
                  <Badge key={s} variant="muted">
                    {s}
                  </Badge>
                ))}
              </div>
              {teacher && (
                <div className="flex items-center gap-2 border-t border-border/60 pt-3">
                  <Avatar className="size-7">
                    <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
                    <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{teacher.email}</span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
