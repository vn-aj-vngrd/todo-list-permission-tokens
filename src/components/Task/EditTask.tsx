import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { type Resolver, useForm, type SubmitHandler } from "react-hook-form";
import { useStore } from "~/lib";
import OutsideClickHandler from "react-outside-click-handler";

type FormValues = {
  title: string;
  description: string;
  dueDate: string;
};

const resolver: Resolver<FormValues> = (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const EditTask = () => {
  const { handleShowEditTask, taskEdit, updateTask, isShowEditTask } =
    useStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: taskEdit?.title || "",
      description: taskEdit?.description || "",
      dueDate: taskEdit?.dueDate || "",
    },
    resolver,
  });

  useEffect(() => {
    reset({
      title: taskEdit?.title || "",
      description: taskEdit?.description || "",
      dueDate: taskEdit?.dueDate || "",
    });
  }, [reset, taskEdit]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateTask({
      id: taskEdit?.id as string,
      description: data.description,
      title: data.title,
      dueDate: data.dueDate,
      createdDate: taskEdit?.createdDate || "",
      completedDate: "",
      isCompleted: taskEdit?.isCompleted || false,
      isDeleted: taskEdit?.isCompleted || false,
    });
    handleShowEditTask(false);
  };

  return (
    <div
      className={`relative h-[626px] rounded-lg border border-[#333] bg-[#0E1117] transition-all duration-500 ease-in-out ${
        isShowEditTask ? "max-w-sm flex-1" : "max-w-0 opacity-0"
      }`}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          handleShowEditTask(false);
        }}
      >
        <div
          className={`transition-all duration-[50ms] ease-in-out ${
            isShowEditTask ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center space-x-4 rounded-t-lg border-b border-[#333] bg-[#161B22] py-4 px-4 transition-all duration-100">
            <button
              className="cursor-pointer"
              onClick={() => handleShowEditTask(false)}
            >
              <ArrowLeftIcon className="h-5 w-5 fill-white" />
            </button>
            <h3 className="font-bold">Edit Task</h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 py-4 px-4"
          >
            <div className="flex flex-col space-y-2">
              <label className="text-[#999]">Title</label>
              <input
                {...register("title")}
                autoComplete="off"
                className="block w-full rounded-md border border-[#333] bg-[#161B22] px-2 py-1.5 text-white"
              />
              {errors?.title && (
                <p className="text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[#999]">Date</label>

              <input
                {...register("dueDate")}
                type="date"
                autoComplete="off"
                className="block w-full rounded-md border border-[#333] bg-[#161B22] px-2 py-1.5 text-white"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[#999]">Description</label>
              <input
                {...register("description")}
                autoComplete="off"
                className="block w-full rounded-md border border-[#333] bg-[#161B22] px-2 py-1.5 text-white"
              />
            </div>

            <div className="absolute bottom-4 w-full">
              <button
                className="flex w-[90%] items-center justify-center rounded-md border border-[#333] bg-[#161B22] px-4 py-3.5 hover:border-white hover:bg-[#1F2937]"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default EditTask;
