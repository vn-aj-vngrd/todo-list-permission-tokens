import { type NextPage } from "next";
import Meta from "~/components/Common/Meta";

import TaskHeader from "~/sections/TaskHeader";
import AddTask from "~/components/Task/AddTask";
import { useStore } from "~/lib";
import EditTask from "~/components/Task/EditTask";

import { useEffect, useState } from "react";
import Login from "~/sections/Login";
import { type User } from "~/lib/slices/createAuthSlice";
import {
  ArrowsUpDownIcon,
  CalendarIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

import TaskBody from "~/sections/TaskBody";

export type Category = {
  name: string;
  color: string;
};

export type SortItem = {
  name: string;
  value: string;
  icon: JSX.Element;
};

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
            className={`relative h-[626px] max-w-5xl flex-1 rounded-lg border border-[#333] bg-[#0E1117] transition-all duration-500 ease-in-out ${
              isShowEditTask ? "hidden md:block" : ""
            }
          `}
          >
            <TaskHeader />
            <TaskBody
              categories={categories}
              userData={userData}
              tasks={tasks}
              category={category as Category}
              setCategory={setCategory}
              sortItems={sortItems}
              setShowSort={setShowSort}
              isShowSort={isShowSort}
              setSortItem={setSortItem}
              sortItem={sortItem as SortItem}
            />
            <AddTask user={userData} />
          </div>

          <EditTask />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
