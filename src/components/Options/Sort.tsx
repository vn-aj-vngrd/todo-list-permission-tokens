import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import OutsideClickHandler from "react-outside-click-handler";
import { type SortItem } from "~/pages";

type Props = {
  sortItem: SortItem;
  sortItems: SortItem[];
  isShowSort: boolean;
  setShowSort: (show: boolean) => void;
  setSortItem: (sortItem: SortItem) => void;
};

const Sort = ({
  sortItem,
  sortItems,
  isShowSort,
  setShowSort,
  setSortItem,
}: Props) => {
  return (
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

        <div
          className={`duration-400 absolute right-4 flex flex-col space-y-2 rounded-md border border-[#333] bg-[#0E1117] p-3 transition-all ease-out ${
            isShowSort ? "z-20 max-h-96" : "z-0 max-h-0 opacity-0"
          }`}
        >
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
      </OutsideClickHandler>
    </div>
  );
};

export default Sort;
