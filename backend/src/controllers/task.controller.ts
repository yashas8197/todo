import { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";
import { TaskStatus } from "../types/task.types.js";

const VALID_STATUSES: TaskStatus[] = ["todo", "done"];

export const TaskController = {
  getAll: (_req: Request, res: Response) => {
    res.json(TaskService.getAll());
  },

  create: (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Title is required and must be a non-empty string" });
    }
    const task = TaskService.create(title);
    res.status(201).json(task);
  },

  updateStatus: (req: Request, res: Response) => {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}` });
    }
    const task = TaskService.updateStatus(req.params.id as string, status);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  },

  delete: (req: Request, res: Response) => {
    const deleted = TaskService.delete(req.params.id as string);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.status(204).send();
  },
};