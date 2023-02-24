export const taskData = [
  {
    id: "1",
    title: "Doctors Appointment",
    description: "Go to the doctors at 3pm",
    date: "2023-03-01",
    isCompleted: true,
  },
  {
    id: "2",
    title: "Meeting at School",
    description: "Go to school for a meeting",
    date: "",
    isCompleted: false,
  },

  {
    id: "3",
    title: "Food Shopping",
    description: "Go to the supermarket to buy food",
    date: "2023-03-01",
    isCompleted: false,
  },
];

export const accountData = [
  {
    id: "1",
    accountType: "Admin",
    description: "Admin can do everything",
    permissions: ["TASK_CREATE", "TASK_UPDATE", "TASK_DELETE", "TASK_READ"],
  },
  {
    id: "2",
    accountType: "User",
    description: "User can do everything except delete",
    permissions: ["TASK_CREATE", "TASK_UPDATE", "TASK_READ"],
  },
  {
    id: "3",
    accountType: "Guest",
    description: "Guest can only read",
    permissions: ["TASK_READ"],
  },
];
