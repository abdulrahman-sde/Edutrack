"use client";

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
import { Badge } from "@/components/ui/badge";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useTeachers, useClasses } from "../hooks/use-admin-data";

export function TeachersTable() {
  const { data: teachers, loading } = useTeachers();
  const { data: classes } = useClasses();

  const classLabel = (id: string) => {
    const c = classes?.find((x) => x.id === id);
    return c ? `${c.name}·${c.section}` : id;
  };

  if (loading || !teachers) {
    return (
      <Card className="p-4">
        <LoadingRows rows={4} />
      </Card>
    );
  }

  return (
    <Card className="py-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead>Classes</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((t) => (
            <TableRow key={t.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={t.avatarUrl} alt={t.name} />
                    <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {t.subjects.map((s) => (
                    <Badge key={s} variant="muted">
                      {s}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {t.classIds.length ? (
                  <div className="flex flex-wrap gap-1">
                    {t.classIds.map((id) => (
                      <Badge key={id} variant="outline">
                        {classLabel(id)}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">Unassigned</span>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">{t.phone}</TableCell>
              <TableCell className="text-muted-foreground">{t.joinedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
