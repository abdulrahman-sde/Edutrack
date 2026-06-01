export type ResourceKind = "assignment" | "material";

export type Resource = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileName: string | null;
  dueDate: string | null;
  type: ResourceKind;
  classId: string;
  className: string;
  classSection: string;
  subject: string;
  uploaderId: string;
  uploaderName: string;
  createdAt: string;
  updatedAt: string;
};

export type GroupedResources = {
  classId: string;
  className: string;
  classSection: string;
  resources: Resource[];
};

export type CreateResourceInput = {
  title: string;
  description?: string;
  fileUrl: string;
  fileName?: string;
  dueDate?: string;
  type: ResourceKind;
  classId: string;
  subject: string;
};
