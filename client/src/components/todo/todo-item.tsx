import type { Todo } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Trash2, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  isToggling?: boolean;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  isDeleting = false,
  isToggling = false,
}: TodoItemProps) {
  const priorityColors = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-primary/20 text-primary",
    high: "bg-destructive/20 text-destructive",
  };

  const statusColors = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "in-progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  const isCompleted = todo.status === "completed";

  const formattedDueDate = todo.dueDate
    ? format(new Date(todo.dueDate), "MMM d, yyyy")
    : "";

  const isPastDue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !isCompleted;

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "p-4 transition-all duration-200 hover:shadow-md",
          isCompleted && "bg-muted/50"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Checkbox
              id={`todo-${todo._id}`}
              checked={isCompleted}
              onCheckedChange={() => onToggle(todo._id)}
              className="mt-1 cursor-pointer"
              disabled={isToggling}
            />
            <div className="flex-1 min-w-0">
              <label
                htmlFor={`todo-${todo._id}`}
                className={cn(
                  "text-sm font-medium block",
                  isCompleted && "line-through text-muted-foreground"
                )}
              >
                {todo.title}
              </label>
              {todo.description && (
                <p
                  className={cn(
                    "text-xs text-muted-foreground mt-1 line-clamp-2",
                    isCompleted && "line-through"
                  )}
                >
                  {todo.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={cn("text-xs", priorityColors[todo.priority])}
                >
                  {todo.priority}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn("text-xs", statusColors[todo.status])}
                >
                  {todo.status.replace("-", " ")}
                </Badge>
                {formattedDueDate && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs flex items-center gap-1",
                          isPastDue && "bg-destructive/10 text-destructive"
                        )}
                      >
                        <Clock className="h-3 w-3" />
                        {formattedDueDate}
                        {isPastDue && <AlertCircle className="h-3 w-3 ml-1" />}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isPastDue ? "Past due date!" : "Due date"}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo._id)}
            aria-label="Delete todo"
            className="text-muted-foreground hover:text-destructive"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 text-rose-600" />
          </Button>
        </div>
      </Card>
    </TooltipProvider>
  );
}
