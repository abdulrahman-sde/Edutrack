"use client";

import Link from "next/link";
import { UsersIcon, ArrowRightIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useMyClasses } from "../hooks/use-teacher-data";

export function MyClasses() {
  const { data: classes, loading } = useMyClasses();

  if (loading || !classes) {
    return (
      <Card className="p-4">
        <LoadingRows rows={2} />
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {classes.map((c) => (
        <Card key={c.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {c.name} · {c.section}
              <Badge variant="secondary" className="gap-1">
                <UsersIcon /> {c.studentCount}
              </Badge>
            </CardTitle>
            <CardDescription>{c.subjects.length} subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-1">
              {c.subjects.map((s) => (
                <Badge key={s} variant="muted">
                  {s}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/teacher/attendance">
                  Attendance <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/teacher/marks">Marks</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
