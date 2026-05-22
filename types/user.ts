export type UserRole = "admin" | "teacher";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
};

export type Teacher = User & {
  role: "teacher";
  subjects: string[];
  classIds: string[];
  phone: string;
  joinedAt: string;
};
