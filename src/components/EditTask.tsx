import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { type Resolver, useForm, type SubmitHandler } from "react-hook-form";
import { useAppStore } from "~/store";
import OutsideClickHandler from "react-outside-click-handler";

type FormValues = {
  title: string;
  date: string;
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
  const { handleShowEditTask, taskEdit, updateTask } = useAppStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: taskEdit?.title || "",
    },
    resolver,
  });

  useEffect(() => {
    reset({
      title: taskEdit?.title || "",
      date: taskEdit?.date || "",
    });
  }, [reset, taskEdit]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateTask({
      id: taskEdit?.id || "0",
      title: data.title,
      date: data.date,
      isCompleted: taskEdit?.isCompleted || false,
    });
    handleShowEditTask(false);
    console.log(data);
  };

  return (
    <div className="relative h-[586px] max-w-xs flex-1 rounded-lg border border-[#333] bg-[#0E1117]">
      <OutsideClickHandler
        onOutsideClick={() => {
          handleShowEditTask(false);
        }}
      >
        <div className="flex items-center justify-between rounded-t-lg border-b border-[#333] bg-[#161B22] py-4 px-4">
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
              className="rounded-md border border-[#333] bg-[#161B22] px-2 py-1.5 text-white"
            />
            {errors?.title && <p className="text-sm">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[#999]">Date</label>

            <input
              type="date"
              {...register("date")}
              className="rounded-md border border-[#333] bg-[#161B22] px-2 py-1.5 text-white"
            />
          </div>

          <div className="absolute bottom-4 w-full">
            <div className="flex w-[90%] items-center justify-center rounded-md border border-[#333] bg-[#161B22] px-4 py-3">
              <button type="submit">Save Changes</button>
            </div>
          </div>
        </form>
      </OutsideClickHandler>
    </div>
  );
};

export default EditTask;
