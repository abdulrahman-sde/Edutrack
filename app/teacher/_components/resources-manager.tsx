"use client";

import { useEffect, useState } from "react";
import {
  FileTextIcon,
  PaperclipIcon,
  UploadCloudIcon,
  CalendarIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LoadingRows } from "@/components/shared/loading-rows";
import { useMyResources } from "../hooks/use-teacher-data";
import type { Resource, ResourceKind } from "@/types/assignment";

export function ResourcesManager() {
  const { data, loading } = useMyResources();
  const [items, setItems] = useState<Resource[]>([]);
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<ResourceKind>("assignment");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const add = () => {
    if (!title.trim()) return;
    const r: Resource = {
      id: `r-${Date.now()}`,
      kind,
      title: title.trim(),
      description: "Uploaded just now.",
      classId: "c1",
      subject: "Mathematics",
      fileName: fileName || "upload.pdf",
      fileUrl: "#",
      uploadedAt: "2026-05-22",
      dueDate: kind === "assignment" ? "2026-05-29" : undefined,
    };
    setItems((prev) => [r, ...prev]);
    setTitle("");
    setFileName("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <Card className="h-fit p-5">
        <h3 className="text-sm font-medium">Upload new</h3>
        <div className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label>Type</Label>
            <Select value={kind} onValueChange={(v) => setKind(v as ResourceKind)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="material">Material</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-title">Title</Label>
            <Input
              id="r-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Algebra Set 5"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-file">File name</Label>
            <Input
              id="r-file"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="worksheet.pdf"
            />
          </div>
          <Button onClick={add} className="w-full">
            <UploadCloudIcon data-icon="inline-start" /> Upload
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Mock upload — added to the list below.
          </p>
        </div>
      </Card>

      {loading ? (
        <Card className="p-4">
          <LoadingRows rows={5} />
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((r) => (
            <Card key={r.id}>
              <CardContent className="flex items-start gap-3 p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  {r.kind === "assignment" ? (
                    <PaperclipIcon className="size-4" />
                  ) : (
                    <FileTextIcon className="size-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <Badge variant={r.kind === "assignment" ? "default" : "muted"}>
                      {r.kind}
                    </Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {r.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-mono">{r.fileName}</span>
                    <span>· {r.subject}</span>
                    {r.dueDate && (
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="size-3" /> Due {r.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
