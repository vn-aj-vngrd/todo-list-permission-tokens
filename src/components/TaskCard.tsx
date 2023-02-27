import {
  ArrowPathIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useAppStore } from "~/lib";
import { type User } from "~/lib/slices/createAuthSlice";
import { type Task } from "~/lib/slices/createTaskSlice";
import { verifyPermission } from "~/utils";

type Props = {
  task: Task;
  user: User;
};

const TaskCard = ({ task, user }: Props) => {
  const {
    handleShowEditTask,
    updateTask,
    deleteTask,
    restoreTask,
    handleTaskEdit,
  } = useAppStore();

  const [showDescription, setShowDescription] = useState(false);

  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="flex-col items-center  rounded-md border border-[#333] bg-[#1F2937] px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {task.isCompleted ? (
            <button
              onClick={() => {
                updateTask({ ...task, isCompleted: false });
              }}
              disabled={!verifyPermission(user?.permissionToken, "TASK_UPDATE")}
            >
              <CheckCircleIcon className="h-5 w-5 cursor-pointer rounded-full border border-[#999]" />
            </button>
          ) : (
            <button
              onClick={() => {
                updateTask({ ...task, isCompleted: true });
              }}
              disabled={!verifyPermission(user?.permissionToken, "TASK_UPDATE")}
              className="h-5 w-5 rounded-full border border-[#999] bg-transparent"
            />
          )}

          <div className="flex-col items-center">
            {task.isCompleted ? (
              <del className="text-base md:text-lg">{task.title}</del>
            ) : (
              <p className="text-base md:text-lg">{task.title}</p>
            )}

            <div className="flex flex-row items-center space-x-2">
              {task.date && (
                <CalendarIcon
                  className={`h-3 w-3 ${
                    new Date(task.date) < new Date()
                      ? "fill-red-600"
                      : "fill-[#999]"
                  }`}
                />
              )}

              <p className="text-xs text-[#999]">{task.date}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {verifyPermission(user?.permissionToken, "TASK_UPDATE") && (
            <button
              onClick={() => {
                handleTaskEdit(task);
                handleShowEditTask(true);
              }}
            >
              <PencilSquareIcon className="h-4 w-4 fill-white" />
            </button>
          )}

          {task.isDeleted ? (
            <>
              {verifyPermission(user?.permissionToken, "TASK_RESTORE") && (
                <button
                  onClick={() => {
                    restoreTask(task.id);
                  }}
                >
                  <ArrowPathIcon className="h-4 w-4 fill-white" />
                </button>
              )}
            </>
          ) : (
            <>
              {verifyPermission(user?.permissionToken, "TASK_DELETE") && (
                <button
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                >
                  <TrashIcon className="h-4 w-4 fill-white" />
                </button>
              )}
            </>
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
