import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useStore } from "~/lib";
import { type User } from "~/lib/slices/createAuthSlice";
import { verifyPermission } from "~/utils";
import moment from "moment";

type FormValues = {
  title: string;
  description: string;
  dueDate: string;
};

type Props = {
  user: User;
};

const AddTask = ({ user }: Props) => {
  const { addTask, tasks } = useStore();
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();

  useEffect(() => {
    reset({
      title: "",
      description: "",
      dueDate: "",
    });
  }, [reset, tasks]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    addTask({
      id: (tasks.length + 1).toString(),
      title: data.title,
      description: "",
      dueDate: data.dueDate,
      createdDate: moment().format("YYYY-MM-DD"),
      completedDate: "",
      isCompleted: false,
      isDeleted: false,
    });
  };

  if (!verifyPermission(user?.permissionToken, "TASK_CREATE")) return null;

  return (
    <div className="absolute bottom-0 z-30 w-full rounded-b-lg bg-[#0E1117]">
      <div className=" px-4 pb-4">
        <div className="w-full flex-1 items-center rounded-md border border-[#333] bg-[#161B22] px-4 py-3">
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
            <button type="submit" disabled={watch("title") === ""}>
              <PlusCircleIcon
                className={`mr-3 h-7 w-7 ${
                  watch("title") === "" ? "fill-[#999]" : "fill-white"
                }`}
              />
            </button>

            <div className="flex-1">
              <input
                {...register("title")}
                autoComplete="off"
                className="w-full text-sm md:text-base"
                placeholder="Add a task"
              />
            </div>

            <input
              {...register("dueDate")}
              autoComplete="off"
              type="date"
              className="ml-3"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
