import { useState, useEffect, useCallback } from "react";
import type { Task, TaskStatus } from "./types/task";
import { taskService } from "./services/taskService";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskColumn } from "./components/TaskColumn";
import { ErrorBanner } from "./components/ErrorBanner";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    taskService
      .getAll()
      .then(setTasks)
      .catch(() => setError("Failed to load tasks. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  const addTask = useCallback(async (title: string) => {
    setIsSubmitting(true);
    try {
      const task = await taskService.create(title);
      setTasks((prev) => [task, ...prev]);
    } catch {
      setError("Failed to add task.");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const moveTask = useCallback(async (id: string, status: TaskStatus) => {
    try {
      const updated = await taskService.updateStatus(id, status);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError("Failed to update task.");
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete task.");
    }
  }, []);

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const doneTasks = tasks.filter((t) => t.status === "done");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400 animate-pulse">Loading tasks…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Task Board</h1>

      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      <AddTaskForm onAdd={addTask} isSubmitting={isSubmitting} />

      <div className="flex gap-6 mt-8">
        <TaskColumn
          title="To Do"
          tasks={todoTasks}
          moveLabel="Mark Done"
          moveStatus="done"
          onMove={moveTask}
          onDelete={deleteTask}
        />
        <TaskColumn
          title="Done"
          tasks={doneTasks}
          moveLabel="Undo"
          moveStatus="todo"
          onMove={moveTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}