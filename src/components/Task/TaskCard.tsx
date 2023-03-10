import {
  ArrowPathIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useStore } from "~/lib";
import { type User } from "~/lib/slices/createAuthSlice";
import { type Task } from "~/lib/slices/createTaskSlice";
import { verifyPermission } from "~/utils";
import moment from "moment";

type Props = {
  task: Task;
  user: User;
};

const TaskCard = ({ task, user }: Props) => {
  const {
    handleShowEditTask,
    updateTask,
    softDeleteTask,
    hardDeleteTask,
    restoreTask,
    handleTaskEdit,
  } = useStore();

  const [isShowDescription, setShowDescription] = useState(false);

  const handleShowDescription = () => {
    setShowDescription(!isShowDescription);
  };

  return (
    <div
      className="z-10 cursor-pointer flex-col items-center rounded-md border border-[#333] bg-[#1F2937] px-4 py-2 hover:border-[#999]"
      onClick={() => handleShowDescription()}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {task.isCompleted ? (
            <button
              onClick={(event) => {
                event.stopPropagation();
                updateTask({
                  ...task,
                  isCompleted: false,
                  completedDate: "",
                });
              }}
              disabled={!verifyPermission(user?.permissionToken, "TASK_UPDATE")}
            >
              <CheckCircleIcon className="h-5 w-5 cursor-pointer rounded-full border border-[#999] fill-green-500" />
            </button>
          ) : (
            <button
              onClick={(event) => {
                event.stopPropagation();
                updateTask({
                  ...task,
                  isCompleted: true,
                  completedDate: moment().format("YYYY-MM-DD"),
                });
              }}
              disabled={!verifyPermission(user?.permissionToken, "TASK_UPDATE")}
              className="h-5 w-5 rounded-full border border-[#999] bg-transparent hover:border-white"
            />
          )}

          <div className="flex-col items-center">
            {task.isCompleted ? (
              <del className="text-base md:text-lg">{task.title}</del>
            ) : (
              <p className="text-base md:text-lg">{task.title}</p>
            )}

            <div className="flex flex-row items-center space-x-1.5">
              {task.dueDate && (
                <CalendarIcon
                  className={`h-3 w-3 ${
                    new Date(task.dueDate) < new Date()
                      ? "fill-red-600"
                      : "fill-[#999]"
                  }`}
                />
              )}

              <p
                className={`text-[12px] text-[#999] ${
                  new Date(task.dueDate) < new Date()
                    ? "text-red-600"
                    : "text-[#999]"
                }`}
              >
                {task.dueDate && moment(task.dueDate).format("DD MMM YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {verifyPermission(user?.permissionToken, "TASK_UPDATE") && (
            <button
              onClick={(event) => {
                event.stopPropagation();
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
                  onClick={(event) => {
                    event.stopPropagation();
                    restoreTask(task.id);
                  }}
                >
                  <ArrowPathIcon className="h-4 w-4 fill-white" />
                </button>
              )}
              {verifyPermission(user?.permissionToken, "TASK_HARD_DELETE") && (
                <button
                  onClick={() => {
                    hardDeleteTask(task.id);
                  }}
                >
                  <TrashIcon className="h-4 w-4 fill-white" />
                </button>
              )}
            </>
          ) : (
            <>
              {verifyPermission(user?.permissionToken, "TASK_SOFT_DELETE") && (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    softDeleteTask(task.id);
                  }}
                >
                  <TrashIcon className="h-4 w-4 fill-white" />
                </button>
              )}
            </>
          )}

          {isShowDescription ? (
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleShowDescription();
              }}
              disabled={task.description === ""}
            >
              <ChevronUpIcon className="h-4 w-4 fill-white" />
            </button>
          ) : (
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleShowDescription();
              }}
              disabled={task.description === ""}
            >
              <ChevronDownIcon className="h-4 w-4 fill-white" />
            </button>
          )}
        </div>
      </div>

      <div
        className={`ml-9 mt-1 flex items-center justify-between transition-all duration-500 ease-in-out ${
          isShowDescription ? "max-h-96" : "max-h-0 opacity-0"
        }`}
      >
        <h5 className="text-sm">
          {task.description ? task.description : "No description available"}
        </h5>
        <p className="text-xs">
          {task.isCompleted ? (
            <span>
              Completed at {moment(task.completedDate).format("DD MMM YYYY")}
            </span>
          ) : (
            <span>
              Created at {moment(task.createdDate).format("DD MMM YYYY")}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
