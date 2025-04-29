import { ArrowLeft, ListTodo, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TodoForm from "@/components/todo/todo-form";
import TodoList from "@/components/todo/todo-list";
import TodoStats from "@/components/todo/todo-stats";
import TodoFilter from "@/components/todo/todo-filter";
import { Link } from "react-router";

import { useTodos } from "@/hooks/use-todo";

export default function TodoListPage() {
  const {
    filteredTodos,
    isLoading,

    filter,
    setFilter,
    handleSearchSubmit,

    addTodo,
    isAdding,

    toggleTodo,
    isTogglingTodo,

    deleteTodo,
    isDeleting,

    completedCount,
    totalCount,
  } = useTodos();
  return (
    <div className="flex items-center justify-center min-h-screen bg-background w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <ListTodo className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Todo List</h1>
            </div>
          </div>
          <div className="flex gap-4">
            <TodoStats completed={completedCount} total={totalCount} />
          </div>
        </div>

        <div className="flex gap-6 w-full justify-center">
          <Card className="w-[400px] h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Add Task
              </CardTitle>
              <CardDescription>Create a new task to your list</CardDescription>
            </CardHeader>
            <CardContent>
              <TodoForm onAddTodo={addTodo} isLoading={isAdding} />
            </CardContent>
          </Card>

          <Card className="h-fit w-[600px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your Tasks</CardTitle>
              <CardDescription>
                {filteredTodos.length}{" "}
                {filteredTodos.length === 1 ? "task" : "tasks"}{" "}
                {filter !== "all" ? `(${filter})` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-8 text-center">Loading tasks...</div>
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  isDeleting={isDeleting}
                  isToggling={isTogglingTodo}
                />
              )}
            </CardContent>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Filter Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TodoFilter
                currentFilter={filter}
                onFilterChange={setFilter}
                handleFormSubmit={handleSearchSubmit}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
