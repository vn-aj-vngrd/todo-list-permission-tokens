export const tasksData = [
  {
    id: "1",
    title: "Doctors Appointment",
    description: "Go to the doctors at 3pm",
    date: "2023-03-01",
    isCompleted: true,
    isDeleted: false,
  },
  {
    id: "2",
    title: "Meeting at School",
    description: "Go to school for a meeting",
    date: "",
    isCompleted: false,
    isDeleted: false,
  },
  {
    id: "3",
    title: "Food Shopping",
    description: "Go to the supermarket to buy food",
    date: "2023-03-01",
    isCompleted: false,
    isDeleted: false,
  },
  {
    id: "4",
    title: "Lunch with John",
    description: "Meet John at the restaurant",
    date: "2023-03-01",
    isCompleted: false,
    isDeleted: false,
  },
  {
    id: "5",
    title: "Dentist Appointment",
    description: "Go to the dentist at 3pm",
    date: "2023-03-01",
    isCompleted: true,
    isDeleted: true,
  },
];

export const usersData = [
  {
    role: "Guest",
    permissions: {
      TASK_CREATE: false,
      TASK_READ: true,
      TASK_UPDATE: false,
      TASK_DELETE: false,
      TASK_VIEW_DELETED: false,
      TASK_RESTORE: false,
    },
  },
  {
    role: "User",
    permissions: {
      TASK_CREATE: true,
      TASK_READ: true,
      TASK_UPDATE: true,
      TASK_DELETE: true,
      TASK_VIEW_DELETED: false,
      TASK_RESTORE: false,
    },
  },
  {
    role: "Admin",
    permissions: {
      TASK_CREATE: true,
      TASK_READ: true,
      TASK_UPDATE: true,
      TASK_DELETE: true,
      TASK_VIEW_DELETED: true,
      TASK_RESTORE: true,
    },
  },
];
