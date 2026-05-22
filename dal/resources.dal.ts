import { resources } from "@/lib/mock/data";
import { delay } from "./_mock";
import type { Resource } from "@/types/assignment";

export function getResources(): Promise<Resource[]> {
  return delay(resources);
}

export function getResourcesForClass(classId: string): Promise<Resource[]> {
  return delay(resources.filter((r) => r.classId === classId));
}
