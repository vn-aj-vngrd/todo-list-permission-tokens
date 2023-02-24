import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useAppStore } from "~/store";
import { verifyPermission } from "~/utils";

type Props = {
  task: {
    id: string;
    title: string;
    date: string;
    isCompleted: boolean;
  };
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

  return (
    <div className="flex items-center justify-between rounded-md border border-[#333] bg-[#161B22] px-4 py-2 ">
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
      </div>
    </div>
  );
};

export default TaskCard;
