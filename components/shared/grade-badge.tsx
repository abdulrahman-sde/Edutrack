import { Badge } from "@/components/ui/badge";

export function GradeBadge({ grade }: { grade: string }) {
  const variant =
    grade === "A+" || grade === "A"
      ? "success"
      : grade === "F"
        ? "destructive"
        : grade === "D"
          ? "warning"
          : "secondary";
  return <Badge variant={variant}>{grade}</Badge>;
}
