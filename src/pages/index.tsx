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
];

const Home: NextPage = () => {
  const { tasks, isShowEditTask, isShowSwitchAccount, user } = useAppStore();
  const [category, setCategory] = useState(categories[0]);

  const handleFilter = (category: string) => {
    if (category === "All") {
      return tasks;
    }

    if (category === "Pending") {
      return tasks?.filter((task) => !task.isCompleted);
    }

    if (category === "Completed") {
      return tasks?.filter((task) => task.isCompleted);
    }
  };

  return (
    <>
      <Meta />
      <main className="flex min-h-screen items-center justify-center space-x-2">
        <div className="relative h-[586px] max-w-5xl flex-1 rounded-lg border border-[#333] bg-[#0E1117]">
          <TaskHeader />

          <div className="flex items-center justify-start px-4 pt-4">
            {categories.map((_category, id) => (
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
                <p className="text-sm">{_category.name}</p>
              </button>
            ))}
          </div>

          {verifyPermission(user?.permissions as string[], "TASK_READ") && (
            <div className="flex h-[420px] flex-col space-y-4 overflow-auto px-4 py-4">
              {tasks
                ?.filter(
                  (task) =>
                    category?.name === "All" ||
                    (category?.name === "Pending" && !task.isCompleted) ||
                    (category?.name === "Completed" && task.isCompleted)
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
