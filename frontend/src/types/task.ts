export type TaskStatus = "todo" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}