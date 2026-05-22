export type ResourceKind = "assignment" | "material";

export type Resource = {
  id: string;
  kind: ResourceKind;
  title: string;
  description: string;
  classId: string;
  subject: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  dueDate?: string;
};
