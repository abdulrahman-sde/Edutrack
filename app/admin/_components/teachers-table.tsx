"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useTeachers } from "../hooks/use-admin-data";

export function TeachersTable({ reloadKey = 0 }: { reloadKey?: number }) {
  const { data: teachers, loading } = useTeachers(reloadKey);

  if (loading || !teachers) {
    return (
      <Card className="p-4">
        <LoadingRows rows={4} />
      </Card>
    );
  }

  if (teachers.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground">
        No teachers added yet.
      </Card>
    );
  }

  return (
    <Card className="py-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-20" />
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
              <TableCell className="text-muted-foreground">{t.phone}</TableCell>
              <TableCell className="text-muted-foreground">{t.joinedAt}</TableCell>
              <TableCell>
                <Button asChild variant="ghost" size="sm" className="cursor-pointer">
                  <Link href={`/admin/teachers/${t.id}`}>
                    View <ArrowUpRightIcon className="size-3.5" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
