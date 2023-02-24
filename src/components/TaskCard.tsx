import {
  CheckCircleIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useAppStore } from "~/store";
import { type Task } from "~/store/slices/createTaskSlice";
import { verifyPermission } from "~/utils";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const {
    handleShowEditTask,
    handleShowSwitchAccount,
    updateTask,
    deleteTask,
    handleTaskEdit,
    user,
  } = useAppStore();

  const [showDescription, setShowDescription] = useState(false);

  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="flex-col items-center  rounded-md border border-[#333] bg-[#161B22] px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {task.isCompleted ? (
            <button
              onClick={() => {
                updateTask({ ...task, isCompleted: false });
              }}
              disabled={
                !verifyPermission(user?.permissions as string[], "TASK_UPDATE")
              }
            >
              <CheckCircleIcon className="h-5 w-5 cursor-pointer rounded-full border border-[#999]" />
            </button>
          ) : (
            <button
              onClick={() => {
                updateTask({ ...task, isCompleted: true });
              }}
              disabled={
                !verifyPermission(user?.permissions as string[], "TASK_UPDATE")
              }
              className="h-5 w-5 rounded-full border border-[#999] bg-transparent"
            />
          )}

          <div className="flex-col items-center">
            {task.isCompleted ? (
              <del className="text-lg">{task.title}</del>
            ) : (
              <p className="text-lg">{task.title}</p>
            )}

            <p className="text-xs text-[#999]">{task.date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {verifyPermission(user?.permissions as string[], "TASK_UPDATE") && (
            <button
              onClick={() => {
                handleTaskEdit(task);
                handleShowSwitchAccount(false);
                handleShowEditTask(true);
              }}
            >
              <PencilSquareIcon className="h-4 w-4 fill-white" />
            </button>
          )}

          {verifyPermission(user?.permissions as string[], "TASK_DELETE") && (
            <button
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              <TrashIcon className="h-4 w-4 fill-white" />
            </button>
          )}

          <button
            onClick={handleShowDescription}
            disabled={task.description === ""}
          >
            <ChevronDownIcon className="h-4 w-4 fill-white" />
          </button>
        </div>
      </div>

      {showDescription && (
        <div className="ml-9 mt-1">
          <h5 className="text-sm">{task.description}</h5>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
