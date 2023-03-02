import { type NextPage } from "next";
import Meta from "~/components/Common/Meta";
import { useStore } from "~/lib";
import { useEffect, useState } from "react";
import Login from "~/sections/Login";
import { type User } from "~/lib/slices/createAuthSlice";
import {
  ArrowsUpDownIcon,
  CalendarIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Tasks from "~/sections/Tasks";

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
        <Tasks
          userData={userData}
          tasks={tasks}
          category={category as Category}
          categories={categories}
          sortItem={sortItem as SortItem}
          sortItems={sortItems}
          isShowSort={isShowSort}
          isShowEditTask={isShowEditTask}
          setCategory={setCategory}
          setShowSort={setShowSort}
          setSortItem={setSortItem}
        />
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
