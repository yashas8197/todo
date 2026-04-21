export type TaskStatus = "todo" | "done";

export type Task = {
   id: String,
   title: String,
   status: TaskStatus,
   createdAt: Date;
}