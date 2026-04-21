import type { Task, TaskStatus } from "../types/task.js"
const API = "http://localhost:5000";

export const taskService = {
  getAll: (): Promise<Task[]> =>
    fetch(`${API}/tasks`).then(res => res.json()),

  create: (title: string): Promise<Task> =>
    fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).then(res => res.json()),

  updateStatus: (id: string, status: TaskStatus): Promise<Task> =>
    fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(res => res.json()),

  delete: (id: string): Promise<void> =>
    fetch(`${API}/tasks/${id}`, { method: "DELETE" }).then(() => {}),
};