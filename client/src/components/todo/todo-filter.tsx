import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TodoFilterProps {
  currentFilter: "all" | "pending" | "in-progress" | "completed";
  onFilterChange: (
    filter: "all" | "pending" | "in-progress" | "completed"
  ) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function TodoFilter({
  currentFilter,
  onFilterChange,
  handleFormSubmit,
}: TodoFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Search tasks..."
          className="w-full h-9"
        />
      </form>
      <Button
        variant="ghost"
        className={cn(
          "justify-start px-2 h-9",
          currentFilter === "all" && "bg-muted font-medium"
        )}
        onClick={() => onFilterChange("all")}
      >
        All tasks
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "justify-start px-2 h-9",
          currentFilter === "pending" && "bg-muted font-medium"
        )}
        onClick={() => onFilterChange("pending")}
      >
        Pending tasks
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "justify-start px-2 h-9",
          currentFilter === "in-progress" && "bg-muted font-medium"
        )}
        onClick={() => onFilterChange("in-progress")}
      >
        In progress
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "justify-start px-2 h-9",
          currentFilter === "completed" && "bg-muted font-medium"
        )}
        onClick={() => onFilterChange("completed")}
      >
        Completed tasks
      </Button>
    </div>
  );
}
