import { type NextPage } from "next";
import Meta from "~/components/Meta";
import TaskCard from "~/components/TaskCard";
import TaskHeader from "~/components/TaskHeader";
import AddTask from "~/components/AddTask";
import { useAppStore } from "~/store";
import EditTask from "~/components/EditTask";
import { verifyPermission } from "~/utils";
import { useEffect, useState } from "react";
import Login from "~/components/Login";
import { type User } from "~/store/slices/createAuthSlice";

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
  const { tasks, isShowEditTask, user } = useAppStore();
  const [category, setCategory] = useState(categories[0]);

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <>
      <Meta />

      {userData ? (
        <>
          <div
            className={`relative h-[626px] max-w-5xl flex-1 rounded-lg border border-[#333] bg-[#0E1117]
          ${isShowEditTask ? "hidden md:block" : ""}
          `}
          >
            <TaskHeader />

            <div className="flex items-center justify-start px-4 pt-4">
              {categories
                .filter(
                  (category) =>
                    category.name !== "Deleted" ||
                    verifyPermission(userData?.permissions, "TASK_VIEW_DELETED")
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

            {verifyPermission(userData?.permissions, "TASK_READ") && (
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
                    <TaskCard key={task.id} task={task} user={userData} />
                  ))}
              </div>
            )}

            {verifyPermission(userData?.permissions, "TASK_CREATE") && (
              <AddTask />
            )}
          </div>
          {isShowEditTask && <EditTask />}
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default Home;
