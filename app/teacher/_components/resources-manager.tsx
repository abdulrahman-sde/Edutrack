"use client";

import { useState, useRef } from "react";
import {
  FileTextIcon,
  PaperclipIcon,
  UploadCloudIcon,
  CalendarIcon,
  Trash2Icon,
  ExternalLinkIcon,
  FolderOpenIcon,
  BookOpenIcon,
  FileIcon,
  ChevronDownIcon,
  ChevronUpIcon,
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
import {
  useMyResources,
  useMyClasses,
  useUploadResource,
  useDeleteResource,
} from "../hooks/use-teacher-data";
import type { Resource, ResourceKind } from "@/types/assignment";

function groupByClass(resources: Resource[]) {
  const map = new Map<string, typeof resources[0][]>();
  for (const r of resources) {
    const key = r.classId;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }
  return Array.from(map.entries())
    .map(([classId, items]) => ({
      classId,
      className: items[0]!.className,
      classSection: items[0]!.classSection,
      resources: items,
    }))
    .sort((a, b) => a.className.localeCompare(b.className));
}

export function ResourcesManager() {
  const [reloadKey, setReloadKey] = useState(0);
  const [expanded, setExpanded] = useState(new Set<string>());
  const { data: resources, loading } = useMyResources(reloadKey);
  const { data: classes } = useMyClasses();
  const uploadResource = useUploadResource();
  const deleteResource = useDeleteResource();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState<ResourceKind>("assignment");
  const [dueDate, setDueDate] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const grouped = resources ? groupByClass(resources) : [];
  const toggleExpanded = (classId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(classId)) next.delete(classId);
      else next.add(classId);
      return next;
    });
  };

  const selectedClass = classes?.find((c) => c.id === selectedClassId);
  const availableSubjects = selectedClass
    ? [...new Set(selectedClass.subjectTeachers.map((st) => st.subject))]
    : [];

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setKind("assignment");
    setDueDate("");
    setSelectedClassId("");
    setSelectedSubject("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!title.trim() || !selectedClassId || !selectedSubject || !selectedFile) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("file", selectedFile);
      fd.append("title", title.trim());
      fd.append("type", kind);
      fd.append("classId", selectedClassId);
      fd.append("subject", selectedSubject);
      if (description.trim()) fd.append("description", description.trim());
      if (dueDate) fd.append("dueDate", dueDate);

      await uploadResource(fd);
      resetForm();
      setReloadKey((k) => k + 1);
    } catch (e) {
      console.error("Failed to upload resource", e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteResource(id);
      setReloadKey((k) => k + 1);
    } catch (e) {
      console.error("Failed to delete resource", e);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
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
            <Label>Class</Label>
            <Select value={selectedClassId} onValueChange={(v) => { setSelectedClassId(v); setSelectedSubject(""); }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classes?.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} - {c.section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
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
            <Label htmlFor="r-desc">Description</Label>
            <Input
              id="r-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>
          {kind === "assignment" && (
            <div className="space-y-1.5">
              <Label htmlFor="r-due">Due date</Label>
              <Input
                id="r-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="r-file">File</Label>
            <Input
              id="r-file"
              type="file"
              ref={fileInputRef}
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />
            {selectedFile && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <FileIcon className="size-3" /> {selectedFile.name}
              </p>
            )}
          </div>
          <Button
            onClick={handleUpload}
            className="w-full"
            disabled={submitting || !title.trim() || !selectedClassId || !selectedSubject || !selectedFile}
          >
            <UploadCloudIcon data-icon="inline-start" />
            {submitting ? "Uploading…" : "Upload"}
          </Button>
        </div>
      </Card>

      {loading ? (
        <Card className="p-4">
          <LoadingRows rows={5} />
        </Card>
      ) : grouped.length === 0 ? (
        <Card className="flex flex-col items-center gap-4 p-8 text-center">
          <FolderOpenIcon className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No resources shared yet.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {grouped.map((group) => {
            const isExpanded = expanded.has(group.classId);
            return (
              <section key={group.classId}>
                <button
                  onClick={() => toggleExpanded(group.classId)}
                  className="mb-3 flex w-full items-center gap-2 text-left"
                >
                  {isExpanded ? (
                    <ChevronUpIcon className="size-4 text-muted-foreground" />
                  ) : (
                    <ChevronDownIcon className="size-4 text-muted-foreground" />
                  )}
                  <BookOpenIcon className="size-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">
                    {group.className} - {group.classSection}
                  </h3>
                  <Badge variant="muted" className="ml-auto">
                    {group.resources.length} resource{group.resources.length !== 1 ? "s" : ""}
                  </Badge>
                </button>
                {isExpanded && (
                  <div className="space-y-2">
                    {group.resources.map((r) => (
                      <ResourceCard key={r.id} resource={r} onDelete={handleDelete} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ResourceCard({
  resource,
  onDelete,
}: {
  resource: Resource;
  onDelete: (id: string) => void;
}) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
          {resource.type === "assignment" ? (
            <PaperclipIcon className="size-4" />
          ) : (
            <FileTextIcon className="size-4" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium">{resource.title}</p>
            <Badge variant={resource.type === "assignment" ? "default" : "muted"}>
              {resource.type}
            </Badge>
          </div>
          {resource.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {resource.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {resource.fileName && <span className="font-mono">{resource.fileName}</span>}
            <span>· {resource.subject}</span>
            {resource.dueDate && (
              <span className="flex items-center gap-1">
                <CalendarIcon className="size-3" /> Due {resource.dueDate}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLinkIcon className="size-3" /> Open file
            </a>
            <span className="text-muted-foreground">
              · by {resource.uploaderName}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(resource.id)}
          title="Delete"
        >
          <Trash2Icon className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
