/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
import { type NextPage } from "next";
import Meta from "~/components/Meta";
import TaskCard from "~/components/TaskCard";
import TaskHeader from "~/components/TaskHeader";
import AddTask from "~/components/AddTask";
import SwitchAccount from "~/components/SwitchAccount";
import { useAppStore } from "~/store";
import EditTask from "~/components/EditTask";

const Home: NextPage = () => {
  const { tasks, isShowEditTask, isShowSwitchAccount } = useAppStore();

  return (
    <>
      <Meta />
      <main className="flex min-h-screen items-center justify-center space-x-2">
        <div className="relative h-[586px] max-w-5xl flex-1 rounded-lg border border-[#333] bg-[#0E1117]">
          <TaskHeader />

          <div className="flex h-[420px] flex-col space-y-4 overflow-auto px-4 py-4">
            {tasks
              ?.sort((a, b) => a.date.localeCompare(b.date))
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>

          <AddTask />
        </div>

        {isShowSwitchAccount && <SwitchAccount />}
        {isShowEditTask && <EditTask />}
      </main>
    </>
  );
};

export default Home;
