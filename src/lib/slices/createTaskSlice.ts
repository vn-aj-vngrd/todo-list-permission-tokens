import { type StateCreator } from "zustand";
import { tasksData } from "~/data";

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  createdDate: string;
  completedDate: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

export interface TaskSlice {
  tasks: Task[];
  getUserTasks: () => Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  softDeleteTask: (id: string) => void;
  hardDeleteTask: (id: string) => void;
  restoreTask: (id: string) => void;
  isShowEditTask: boolean;
  handleShowEditTask: (b: boolean) => void;
  taskEdit: Task | null;
  handleTaskEdit: (task: Task) => void;
}

export const createTaskSlice: StateCreator<TaskSlice> = (set) => ({
  tasks: tasksData,
  getUserTasks: () => {
    return tasksData.filter((t) => !t.isDeleted);
  },
  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task],
    }));
  },
  updateTask: (task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    }));
  },
  softDeleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, isDeleted: true } : t
      ),
    }));
  },
  hardDeleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
  },
  restoreTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, isDeleted: false } : t
      ),
    }));
  },
  isShowEditTask: false,
  handleShowEditTask: (b) => {
    set((state) => ({
      ...state,
      isShowEditTask: b,
    }));
  },
  taskEdit: null,
  handleTaskEdit: (task) => {
    set((state) => ({
      ...state,
      taskEdit: task,
    }));
  },
});
