import {
  ArrowRightIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { usersData } from "~/data";
import { useAppStore } from "~/lib";
import { type User } from "~/lib/slices/createAuthSlice";

const roles = [
  {
    accountType: "Guest",
    description: "Guest can only read tasks.",
    user: usersData[0],
  },
  {
    accountType: "User",
    description: "User can create, update and read tasks.",
    user: usersData[1],
  },

  {
    accountType: "Admin",
    description:
      "Admin can create, update, read, delete, read deleted and restore tasks.",
    user: usersData[2],
  },
];

const Login = () => {
  const [isShowInformation, setIsShowInformation] = useState(false);
  const { login } = useAppStore();

  const handleShowInformation = () => {
    setIsShowInformation(!isShowInformation);
  };

  return (
    <div className="flex h-full max-w-xl flex-1 flex-col items-center justify-center rounded-lg border border-[#333] md:h-[400px] md:flex-row">
      <div className="flex w-full flex-col justify-between rounded-t-lg border-b border-r-0 border-[#333] bg-[#161B22] p-4 md:h-full md:w-[35%] md:rounded-l-lg md:rounded-tr-none md:border-r md:border-b-0">
        <h3 className="text-2xl font-bold md:text-4xl">
          Sign in to your account.
        </h3>
        <h3 className="hidden items-center text-xl font-semibold md:flex">
          NextTask
          <span className="ml-2.5 flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-3.5 w-3.5 animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
        </h3>
      </div>
      <div className="flex h-full w-full flex-col justify-between rounded-b-lg bg-[#0E1117] p-4 md:w-[65%] md:rounded-r-lg md:rounded-bl-none">
        <div className="flex w-full flex-col space-y-4 pt-4 md:pt-0">
          {roles.map((role, key) => (
            <button
              onClick={() => login(role.user as User)}
              className="flex w-full flex-col rounded-md border border-[#333] bg-[#161B22] px-4 py-2 hover:bg-[#1F2937]"
              key={key}
            >
              <div className="flex w-full items-center justify-between">
                <p className="text-left">{role.accountType}</p>
                <ArrowRightIcon className="h-4 w-4" />
              </div>

              {isShowInformation && (
                <p className="mr-5 mt-1 text-left text-xs text-[#A3A3A3]">
                  {role.description}
                </p>
              )}
            </button>
          ))}
        </div>
        <div className="mt-10 flex justify-between md:mt-0 md:justify-end">
          <h3 className="flex items-center text-sm font-semibold md:hidden">
            NextTask
            <span className="ml-2.5 flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-3.5 w-3.5 animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
          </h3>
          {isShowInformation ? (
            <button onClick={handleShowInformation}>
              <XCircleIcon className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          ) : (
            <button onClick={handleShowInformation}>
              <InformationCircleIcon className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
