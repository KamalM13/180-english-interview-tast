import { Todo } from "@/types/todo";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  toDos: string[] | Todo[];
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
