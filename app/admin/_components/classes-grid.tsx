"use client";

import Link from "next/link";
import { UsersIcon, ArrowUpRightIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useClasses } from "../hooks/use-admin-data";
import type { SubjectTeacher } from "@/types/class";

function subjectCount(c: {
  subjectTeachers?: SubjectTeacher[];
  subjects?: string[];
}): number {
  const st = c.subjectTeachers ?? (c.subjects ?? []);
  return st.length;
}

export function ClassesGrid({ reloadKey = 0 }: { reloadKey?: number }) {
  const { data: classes, loading } = useClasses(reloadKey);

  if (loading || !classes) {
    return (
      <Card className="p-4">
        <LoadingRows rows={4} />
      </Card>
    );
  }

  if (classes.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground">
        No classes added yet.
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {classes.map((c) => {
        const count = subjectCount(c);
        return (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{c.name} · {c.section}</span>
                <Badge variant="secondary" className="gap-1 shrink-0">
                  <UsersIcon /> {c.studentCount}
                </Badge>
              </CardTitle>
              <CardDescription>
                {count} subject{count !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm" className="w-full cursor-pointer">
                <Link href={`/admin/classes/${c.id}`}>
                  View Details <ArrowUpRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
