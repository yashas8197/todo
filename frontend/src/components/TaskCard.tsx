import type { Task, TaskStatus } from "../types/task";

interface TaskCardProps {
  task: Task;
  moveLabel: string;
  moveStatus: TaskStatus;
  onMove: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, moveLabel, moveStatus, onMove, onDelete }: TaskCardProps) {
  const isCompleted = task.status === "done";

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
      <span
        className={`text-sm flex-1 mr-2 break-words ${
          isCompleted ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {task.title}
      </span>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onMove(task.id, moveStatus)}
          className="text-xs text-indigo-600 hover:underline"
        >
          {moveLabel}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}