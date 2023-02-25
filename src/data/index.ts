export const taskData = [
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

export const accountData = [
  {
    id: "1",
    accountType: "Admin",
    description:
      "Admin can create, update, read, delete, read deleted and restore tasks.",
    permissions: [
      "TASK_CREATE",
      "TASK_READ",
      "TASK_UPDATE",
      "TASK_DELETE",
      "TASK_VIEW_DELETED",
      "TASK_RESTORE",
    ],
  },
  {
    id: "2",
    accountType: "User",
    description: "User can create, update and read tasks.",
    permissions: ["TASK_CREATE", "TASK_UPDATE", "TASK_READ"],
  },
  {
    id: "3",
    accountType: "Guest",
    description: "Guest can only read tasks.",
    permissions: ["TASK_READ"],
  },
];
