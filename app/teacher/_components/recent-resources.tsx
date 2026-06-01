"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileTextIcon,
  PaperclipIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useMyResources } from "../hooks/use-teacher-data";

export function RecentResources() {
  const [open, setOpen] = useState(true);
  const { data: resources, loading } = useMyResources();

  const recent = resources?.slice(0, 5) ?? [];

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-muted-foreground hover:text-foreground"
          >
            {open ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
          </button>
          <CardTitle className="text-sm">Recent resources</CardTitle>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/teacher/assignments">
            View all <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardHeader>
      {open && (
        <CardContent>
          {loading ? (
            <LoadingRows rows={3} />
          ) : recent.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No resources shared yet.
            </p>
          ) : (
            <div className="space-y-2">
              {recent.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary">
                    {r.type === "assignment" ? (
                      <PaperclipIcon className="size-4" />
                    ) : (
                      <FileTextIcon className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.className} · {r.subject}
                      {r.dueDate && (
                        <>
                          {" "}· Due {r.dueDate}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="muted" className="text-[10px]">
                      {r.type}
                    </Badge>
                    <a
                      href={r.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-muted-foreground hover:text-primary"
                    >
                      <ExternalLinkIcon className="size-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
