"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { ClassSection } from "@/types/class";

export function ClassPicker({
  classes,
  value,
  onChange,
}: {
  classes: ClassSection[] | undefined;
  value: string | undefined;
  onChange: (id: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Select a class" />
      </SelectTrigger>
      <SelectContent>
        {classes?.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name} · {c.section}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
