"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { SubjectTeacher } from "@/types/class";

export function SubjectPicker({
  subjects,
  value,
  onChange,
}: {
  subjects: SubjectTeacher[];
  value: string;
  onChange: (subject: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {subjects.map((s) => (
          <SelectItem key={s.subject} value={s.subject}>
            {s.subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
