/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
import { type NextPage } from "next";
import Meta from "~/components/Meta";
import TaskCard from "~/components/TaskCard";
import TaskHeader from "~/components/TaskHeader";
import AddTask from "~/components/AddTask";
import SwitchAccount from "~/components/SwitchAccount";
import { useAppStore } from "~/store";
import EditTask from "~/components/EditTask";
import { verifyPermission } from "~/utils";
import { useState } from "react";

const categories = [
  {
    name: "All",
    color: "bg-white",
  },
  {
    name: "Pending",
    color: "bg-blue-500",
  },
  {
    name: "Completed",
    color: "bg-green-500",
  },
  {
    name: "Deleted",
    color: "bg-red-500",
  },
];

const Home: NextPage = () => {
  const { tasks, isShowEditTask, isShowSwitchAccount, user } = useAppStore();
  const [category, setCategory] = useState(categories[0]);

  return (
    <>
      <Meta />
      <main className="flex min-h-screen items-center justify-center space-x-2 px-4 md:px-0">
        <div
          className={`relative h-[626px] max-w-5xl flex-1 rounded-lg border border-[#333] bg-[#0E1117]
          ${isShowSwitchAccount || isShowEditTask ? "hidden md:block" : ""}
          `}
        >
          <TaskHeader />

          <div className="flex items-center justify-start px-4 pt-4">
            {categories
              .filter(
                (category) =>
                  category.name !== "Deleted" ||
                  verifyPermission(
                    user?.permissions as string[],
                    "TASK_VIEW_DELETED"
                  )
              )
              .map((_category, id) => (
                <button
                  onClick={() => setCategory(_category)}
                  key={id}
                  className="mr-5 flex items-center"
                >
                  <div
                    className={`mr-2 h-4 w-4 rounded-full ${
                      _category === category ? _category.color : "bg-[#999]"
                    } `}
                  />
                  <p className="text-xs md:text-sm">{_category.name}</p>
                </button>
              ))}
          </div>

          {verifyPermission(user?.permissions as string[], "TASK_READ") && (
            <div className="mt-4 flex h-[390px] flex-col space-y-4 overflow-auto px-4">
              {tasks
                ?.filter(
                  (task) =>
                    (category?.name === "All" && !task.isDeleted) ||
                    (category?.name === "Pending" &&
                      !task.isCompleted &&
                      !task.isDeleted) ||
                    (category?.name === "Completed" &&
                      task.isCompleted &&
                      !task.isDeleted) ||
                    (category?.name === "Deleted" && task.isDeleted)
                )
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          )}

          {verifyPermission(user?.permissions as string[], "TASK_CREATE") && (
            <AddTask />
          )}
        </div>

        {isShowSwitchAccount && <SwitchAccount />}
        {isShowEditTask && <EditTask />}
      </main>
    </>
  );
};

export default Home;
