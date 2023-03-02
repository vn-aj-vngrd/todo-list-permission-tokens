import AddTask from "~/components/Task/AddTask";
import EditTask from "~/components/Task/EditTask";
import { type User } from "~/lib/slices/createAuthSlice";
import { type Task } from "~/lib/slices/createTaskSlice";
import { type Category, type SortItem } from "~/pages";
import TaskBody from "./TaskBody";
import TaskHeader from "./TaskHeader";

type Props = {
  userData: User;
  tasks: Task[];
  category: Category;
  categories: Category[];
  sortItem: SortItem;
  sortItems: SortItem[];
  isShowSort: boolean;
  isShowEditTask: boolean;
  setCategory: (category: Category) => void;
  setShowSort: (show: boolean) => void;
  setSortItem: (sortItem: SortItem) => void;
};

const Tasks = ({
  userData,
  tasks,
  category,
  categories,
  sortItem,
  sortItems,
  isShowSort,
  isShowEditTask,
  setCategory,
  setShowSort,
  setSortItem,
}: Props) => {
  return (
    <>
      <div
        className={`relative h-[626px] max-w-5xl flex-1 rounded-lg border border-[#333] bg-[#0E1117] transition-all duration-500 ease-in-out ${
          isShowEditTask ? "hidden md:block" : ""
        }
          `}
      >
        <TaskHeader />
        <TaskBody
          userData={userData}
          tasks={tasks}
          category={category}
          categories={categories}
          sortItem={sortItem}
          sortItems={sortItems}
          isShowSort={isShowSort}
          setCategory={setCategory}
          setShowSort={setShowSort}
          setSortItem={setSortItem}
        />
        <AddTask user={userData} />
      </div>

      <EditTask />
    </>
  );
};

export default Tasks;
