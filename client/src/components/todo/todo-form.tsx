import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

interface TodoFormProps {
  onAddTodo: (newTodo: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate: Date;
  }) => void;
  isLoading?: boolean;
}

interface TodoInput {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: Date;
}

export default function TodoForm({
  onAddTodo,
  isLoading = false,
}: TodoFormProps) {
  const { register, handleSubmit, control } = useForm<TodoInput>();

  const onSubmit = handleSubmit((data) => {
    onAddTodo({
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="What needs to be done?"
          className="h-10"
          {...register("title", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Add details about this task..."
          rows={3}
          className="resize-none"
          {...register("description")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Controller
          name="priority"
          control={control}
          defaultValue="low"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) =>
                field.onChange(value as "low" | "medium" | "high")
              }
            >
              <SelectTrigger id="priority" className="h-10">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Controller
          name="dueDate"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dueDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-10",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => field.onChange(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      <Button type="submit" className="w-full h-10 mt-2" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Plus className="h-4 w-4 mr-2" />
        )}
        Add Task
      </Button>
    </form>
  );
}
