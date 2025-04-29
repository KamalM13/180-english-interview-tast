import { User } from "@/types/user";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: Date;
  userId: string | User;
  createdAt?: Date;
  updatedAt?: Date;
}
