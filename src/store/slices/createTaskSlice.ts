import { type StateCreator } from "zustand";
import { taskData } from "../../data";

interface Task {
  id: string;
  title: string;
  date: string;
  isCompleted: boolean;
}

export interface TaskSlice {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
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
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  updateTask: (task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
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
