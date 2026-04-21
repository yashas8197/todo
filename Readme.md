# Mini Kanban Task Manager

A full-stack Kanban-style task manager built with React + TypeScript on the frontend and Node.js + Express on the backend.

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, TypeScript, Tailwind CSS, Vite |
| Backend   | Node.js, Express 5, TypeScript, tsx     |
| HTTP      | REST API, fetch API                     |
| IDs       | nanoid                                  |

---

## Project Structure

```
root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTaskForm.tsx    # Input + submit button
│   │   │   ├── ErrorBanner.tsx   # Dismissable error display
│   │   │   ├── TaskCard.tsx      # Individual task row
│   │   │   └── TaskColumn.tsx    # To Do / Done column wrapper
│   │   ├── constants/
│   │   │   └── api.ts            # Base API URL (env-aware)
│   │   ├── services/
│   │   │   └── taskService.ts    # All API calls abstracted
│   │   ├── types/
│   │   │   └── task.ts           # Task and TaskStatus types
│   │   ├── App.tsx               # Root component, state management
│   │   └── main.tsx
│   ├── .env.local                # Local dev env variables
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   │   └── task.controller.ts
    │   ├── routes/
    │   │   └── task.routes.ts
    │   ├── services/
    │   │   └── task.service.ts
    │   ├── types/
    │   │   └── task.types.ts
    │   └── server.ts
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

---

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`

---

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`

> Make sure the backend is running before starting the frontend.

---

## API Reference

Base URL: `http://localhost:5000`

| Method   | Endpoint       | Description          | Body                        | Success |
|----------|----------------|----------------------|-----------------------------|---------|
| `GET`    | `/tasks`       | Fetch all tasks      | —                           | 200     |
| `POST`   | `/tasks`       | Create a new task    | `{ "title": "string" }`     | 201     |
| `PUT`    | `/tasks/:id`   | Update task status   | `{ "status": "todo"\|"done" }` | 200  |
| `DELETE` | `/tasks/:id`   | Delete a task        | —                           | 204     |

### Task Shape

```json
{
  "id": "V1StGXR8_Z5jdHi6B-myT",
  "title": "Buy groceries",
  "status": "todo",
  "createdAt": "2026-04-20T09:00:00.000Z"
}
```

### Error Responses

```json
{ "error": "Title is required and must be a non-empty string" }
```

| Code | Reason                              |
|------|-------------------------------------|
| 400  | Empty title or invalid status value |
| 404  | Task ID not found                   |

---

## Features

- **View Tasks** — All tasks fetched on load and grouped into To Do / Done columns
- **Add Task** — Input field with Enter key support; button disabled while submitting
- **Move Task** — Move any task between To Do ↔ Done with a single click
- **Delete Task** — Remove a task permanently from either column
- **Loading State** — Animated pulse shown while fetching tasks on initial load
- **Error Handling** — Errors on fetch, add, move, and delete are shown in a dismissable banner


## Design Decisions

- **Service layer (`taskService.ts`)** — All `fetch` calls are abstracted away from the component. `App.tsx` only calls service methods, keeping UI logic and API logic separate.
- **`useCallback` on mutations** — `addTask`, `moveTask`, and `deleteTask` are wrapped in `useCallback` to avoid unnecessary re-renders when passed as props to child components.
- **`isSubmitting` state** — Tracks in-flight POST requests to disable the form and prevent duplicate task creation.
- **Component split** — `TaskCard`, `TaskColumn`, `AddTaskForm`, and `ErrorBanner` are each single-responsibility components with typed props.

---

## Scripts

### Backend

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start with nodemon + tsx |

### Frontend

| Command         | Description                   |
|-----------------|-------------------------------|
| `npm run dev`   | Start Vite dev server         |
| `npm run build` | Production build              |