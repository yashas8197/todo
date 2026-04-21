import { useState } from "react";

interface AddTaskFormProps {
  onAdd: (title: string) => Promise<void>;
  isSubmitting: boolean;
}

export function AddTaskForm({ onAdd, isSubmitting }: AddTaskFormProps) {
  const [title, setTitle] = useState("");

  async function handleSubmit() {
    const trimmed = title.trim();
    if (!trimmed || isSubmitting) return;
    await onAdd(trimmed);
    setTitle("");
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="What needs to be done?"
        disabled={isSubmitting}
        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !title.trim()}
        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg
                   hover:bg-indigo-700 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Adding…" : "Add"}
      </button>
    </div>
  );
}