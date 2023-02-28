import { type NextPage } from "next";
import Meta from "~/components/Meta";
import TaskCard from "~/components/TaskCard";
import TaskHeader from "~/components/TaskHeader";
import AddTask from "~/components/AddTask";
import { useStore } from "~/lib";
import EditTask from "~/components/EditTask";
import { verifyPermission } from "~/utils";
import { useEffect, useState } from "react";
import Login from "~/components/Login";
import { type User } from "~/lib/slices/createAuthSlice";
import {
  ArrowsUpDownIcon,
  CalendarIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import OutsideClickHandler from "react-outside-click-handler";

const categories = [
  {
    name: "All",
    color: "bg-white",
  },
  {
    name: "Pending",
    color: "bg-yellow-500",
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

const sortItems = [
  {
    name: "Due Date",
    value: "due",
    icon: <CalendarIcon className="mr-2 h-4 w-4" />,
  },
  {
    name: "Created Date",
    value: "creation",
    icon: <PlusIcon className="mr-2 h-4 w-4" />,
  },
  {
    name: "Title",
    value: "title",
    icon: <ArrowsUpDownIcon className="mr-2 h-4 w-4" />,
  },
];

const Home: NextPage = () => {
  const { tasks, isShowEditTask, user } = useStore();
  const [category, setCategory] = useState(categories[0]);
  const [userData, setUserData] = useState<User | null>(null);
  const [sortItem, setSortItem] = useState(sortItems[0]);
  const [isShowSort, setShowSort] = useState(false);

  useEffect(() => {
    setUserData(user);
    setCategory(categories[0]);
    setSortItem(sortItems[0]);
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

            <div>
              <div className="flex items-center justify-between px-4 pt-4">
                <div className="flex">
                  {categories
                    .filter(
                      (category) =>
                        category.name !== "Deleted" ||
                        verifyPermission(
                          userData?.permissionToken,
                          "TASK_READ_DELETED"
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
                            _category === category
                              ? _category.color
                              : "bg-[#999]"
                          } `}
                        />
                        <p className="text-xs md:text-sm">{_category.name}</p>
                      </button>
                    ))}
                </div>
                <div>
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setShowSort(false);
                    }}
                  >
                    <button>
                      <ChevronUpDownIcon
                        onClick={() => setShowSort(!isShowSort)}
                        className="h-5 w-5 fill-white"
                      />
                    </button>
                    {isShowSort && (
                      <div className="absolute right-5 flex flex-col space-y-2 rounded-md border border-[#333] bg-[#0E1117] p-3">
                        {sortItems.map((item, id) => (
                          <button
                            key={id}
                            onClick={() => {
                              setSortItem(item);
                              setShowSort(false);
                            }}
                            className={`flex items-center rounded-md border border-[#333] bg-[#161B22] px-2 py-2 text-start text-xs hover:border-[#999] ${
                              sortItem === item ? "bg-[#1F2937]" : ""
                            }`}
                          >
                            {item.icon}
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </OutsideClickHandler>
                </div>
              </div>

              {verifyPermission(userData?.permissionToken, "TASK_READ") && (
                <div className="mt-4 flex max-h-[455px] flex-col space-y-4 overflow-auto px-4 pb-[65px]">
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
                    .sort((a, b) => {
                      if (sortItem?.value === "due") {
                        return a.dueDate.localeCompare(b.dueDate);
                      } else if (sortItem?.value === "creation") {
                        return a.createdDate.localeCompare(b.createdDate);
                      } else if (sortItem?.value === "title") {
                        return a.title.localeCompare(b.title);
                      } else return 0;
                    })
                    .map((task) => (
                      <TaskCard key={task.id} task={task} user={userData} />
                    ))}
                </div>
              )}

              <AddTask user={userData} />
            </div>
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
