import type { Task, TaskStatus } from "../types/task";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  moveLabel: string;
  moveStatus: TaskStatus;
  onMove: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function TaskColumn({
  title,
  tasks,
  moveLabel,
  moveStatus,
  onMove,
  onDelete,
}: TaskColumnProps) {
  return (
    <div className="flex-1">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {title}{" "}
        <span className="text-gray-400 font-normal">({tasks.length})</span>
      </h2>

      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            moveLabel={moveLabel}
            moveStatus={moveStatus}
            onMove={onMove}
            onDelete={onDelete}
          />
        ))}

        {tasks.length === 0 && (
          <p className="text-sm text-gray-400 italic">No tasks here.</p>
        )}
      </div>
    </div>
  );
}