import { nanoid } from "nanoid";
import { Task, TaskStatus } from "../types/task.types.js";

let tasks: Task[] = [];

export const TaskService = {
  getAll: (): Task[] => tasks,

  getById: (id: string): Task | undefined =>
    tasks.find((t) => t.id === id),

  create: (title: string): Task => {
    const task: Task = {
      id: nanoid(),
      title: title.trim(),
      status: "todo",
      createdAt: new Date(),
    };
    tasks.push(task);
    return task;
  },

  updateStatus: (id: string, status: TaskStatus): Task | null => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    task.status = status;
    return task;
  },

  delete: (id: string): boolean => {
    const before = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    return tasks.length < before;
  },
};