import { type User } from "~/lib/slices/createAuthSlice";
import { type Category } from "~/pages";
import { verifyPermission } from "~/utils";

type Props = {
  userData: User;
  category: Category;
  categories: Category[];
  setCategory: (category: Category) => void;
};

const Categories = ({ userData, category, categories, setCategory }: Props) => {
  return (
    <div className="flex">
      {categories
        .filter(
          (category) =>
            category.name !== "Deleted" ||
            verifyPermission(userData?.permissionToken, "TASK_READ_DELETED")
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
  );
};

export default Categories;
