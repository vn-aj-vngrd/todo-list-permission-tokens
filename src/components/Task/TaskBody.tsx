import TaskCard from "~/components/Task/TaskCard";
import Categories from "~/components/Options/Categories";
import { verifyPermission } from "~/utils";
import Sort from "~/components/Options/Sort";
import { type User } from "~/lib/slices/createAuthSlice";
import { type SortItem, type Category } from "~/pages/index";
import { type Task } from "~/lib/slices/createTaskSlice";

type Props = {
  userData: User;
  tasks: Task[];
  category: Category;
  categories: Category[];
  sortItem: SortItem;
  sortItems: SortItem[];
  isShowSort: boolean;
  setCategory: (category: Category) => void;
  setShowSort: (show: boolean) => void;
  setSortItem: (sortItem: SortItem) => void;
};

const TaskBody = ({
  userData,
  tasks,
  category,
  categories,
  sortItem,
  sortItems,
  isShowSort,
  setCategory,
  setShowSort,
  setSortItem,
}: Props) => {
  return (
    <>
      <div className="flex items-center justify-between px-4 pt-4">
        <Categories
          userData={userData}
          category={category}
          categories={categories}
          setCategory={setCategory}
        />

        <Sort
          sortItem={sortItem}
          sortItems={sortItems}
          isShowSort={isShowSort}
          setShowSort={setShowSort}
          setSortItem={setSortItem}
        />
      </div>

      {verifyPermission(userData?.permissionToken, "TASK_READ") && (
        <div className="mt-4 flex max-h-[446px] flex-col space-y-4 overflow-auto px-4 pb-[63px]">
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
    </>
  );
};

export default TaskBody;
