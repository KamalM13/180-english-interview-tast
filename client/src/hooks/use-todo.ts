import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import type { Todo } from "@/types/todo";
import { toast } from "sonner";

export interface TodoInput {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: Date;
}

export function useTodos() {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<
    "all" | "pending" | "in-progress" | "completed"
  >("all");
  const [search, setSearch] = useState<string>("");

  const { data: todos = [], isLoading } = useQuery<Todo[]>({
    queryKey: ["todos", search],
    queryFn: async () => {
      const response = await api.get("/todo", {
        params: {
          search,
        },
      });
      return response.data.data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      const todo = todos.find((t) => t._id === id);
      if (!todo) return;

      const newStatus = todo.status === "completed" ? "pending" : "completed";
      const response = await api.patch(`/todo/${id}/status`, {
        status: newStatus,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo status updated successfully!");
    },
    onError: (error) => {
      toast.error(
        `Failed to update todo status: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/todo/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully!");
    },
    onError: (error) => {
      toast.error(
        `Failed to delete todo: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newTodo: TodoInput) => {
      const todoToCreate = {
        ...newTodo,
        status: "pending",
      };
      const response = await api.post("/todo", todoToCreate);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo created successfully!");
    },
    onError: (error) => {
      toast.error(
        `Failed to create todo: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    },
  });

  const toggleTodo = (id: string) => {
    toggleMutation.mutate(id);
  };

  const deleteTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

  const addTodo = (newTodo: TodoInput) => {
    createMutation.mutate(newTodo);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search") as string;
    setSearch(searchValue);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  }, [search, queryClient]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
  });

  const completedCount = todos.filter(
    (todo) => todo.status === "completed"
  ).length;
  const totalCount = todos.length;

  return {
    // Todos with filtering
    filteredTodos,
    isLoading,

    // Filter and search state
    filter,
    setFilter,
    search,
    setSearch,
    handleSearchSubmit,

    // Mutations
    toggleTodo,
    isTogglingTodo: toggleMutation.isPending,
    toggleError: toggleMutation.error,

    deleteTodo,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,

    addTodo,
    isAdding: createMutation.isPending,
    addError: createMutation.error,

    // Statistics
    completedCount,
    totalCount,
  };
}
