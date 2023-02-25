import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppStore } from "~/store";

type FormValues = {
  title: string;
  description: string;
  date: string;
};

const AddTask = () => {
  const { addTask, tasks } = useAppStore();
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();

  useEffect(() => {
    reset({
      title: "",
      description: "",
      date: "",
    });
  }, [reset, tasks]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    addTask({
      id: (tasks.length + 1).toString(),
      title: data.title,
      description: "",
      date: data.date,
      isCompleted: false,
      isDeleted: false,
    });
  };

  return (
    <div className="absolute bottom-4 w-full px-4">
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

          <input {...register("date")} type="date" className="ml-3" />
        </form>
      </div>
    </div>
  );
};

export default AddTask;
