"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useTeachers } from "../hooks/use-admin-data";

export function RecentTeachers() {
  const { data: teachers, loading } = useTeachers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faculty</CardTitle>
      </CardHeader>
      <CardContent>
        {loading || !teachers ? (
          <LoadingRows rows={4} />
        ) : teachers.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No teachers yet.
          </p>
        ) : (
          <ul className="divide-y divide-border/60">
            {teachers.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <Avatar>
                  <AvatarImage src={t.avatarUrl} alt={t.name} />
                  <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.email}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
