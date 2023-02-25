import { type StateCreator } from "zustand";
import { taskData } from "../../data";

export interface Task {
  id: string;
  title: string;
  date: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

export interface TaskSlice {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  restoreTask: (id: string) => void;
  isShowEditTask: boolean;
  handleShowEditTask: (b: boolean) => void;
  taskEdit: Task | null;
  handleTaskEdit: (task: Task) => void;
}

export const createTaskSlice: StateCreator<TaskSlice> = (set) => ({
  tasks: taskData,
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
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, isDeleted: true } : t
      ),
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
