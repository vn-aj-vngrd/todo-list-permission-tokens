import { useAppStore } from "../store";

const TaskHeader = () => {
  const { user, handleShowSwitchAccount, handleShowEditTask } = useAppStore();

  return (
    <div className="flex items-center justify-between rounded-t-lg border-b border-[#333] bg-[#161B22] py-4 px-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold md:text-4xl">My Tasks</h1>
        <h3 className="text-xs md:text-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h3>
      </div>
      <div className="flex-col space-y-1">
        <div className="flex items-center justify-center space-x-4">
          <span className="flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-3.5 w-3.5 animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
          <p className="text-sm font-bold md:text-xl">{user?.accountType}</p>
        </div>
        <button
          className="flex cursor-pointer text-xs md:text-sm"
          onClick={() => {
            handleShowEditTask(false);
            handleShowSwitchAccount(true);
          }}
        >
          Switch Account
        </button>
      </div>
    </div>
  );
};

export default TaskHeader;
