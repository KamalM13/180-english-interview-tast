import TodoItem from "@/components/todo/todo-item";
import { Todo } from "@/types/todo";
import { ClipboardList } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  isToggling?: boolean;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  isDeleting = false,
  isToggling = false,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
        <ClipboardList className="h-12 w-12 mb-2 text-muted-foreground/50" />
        <p className="text-center">No tasks found</p>
        <p className="text-sm text-center">Add a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          isDeleting={isDeleting}
          isToggling={isToggling}
        />
      ))}
    </div>
  );
}
