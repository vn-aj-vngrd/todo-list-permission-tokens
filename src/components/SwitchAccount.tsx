import {
  ArrowLeftIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAppStore } from "~/store";
import OutsideClickHandler from "react-outside-click-handler";

const roles = [
  {
    type: "Guest",
    description: "Guests can only view tasks",
  },
  {
    type: "User",
    description: "Users can create and edit tasks",
  },
  {
    type: "Admin",
    description: "Admins can create, edit, and delete tasks",
  },
];

const SwitchAccount = () => {
  const { account, setAccountType, handleShowSwitchAccount } = useAppStore();
  const [isShowRoleInfo, setIsShowRoleInfo] = useState([false, false, false]);

  useEffect(() => {
    setIsShowRoleInfo([false, false, false]);
  }, [account]);

  const handleShowRoleInfo = (i: number) => {
    const newIsShowRoleInfo = [...isShowRoleInfo];
    newIsShowRoleInfo[i] = !newIsShowRoleInfo[i];
    setIsShowRoleInfo(newIsShowRoleInfo);
  };

  return (
    <div className="h-[586px] max-w-xs flex-1 rounded-lg border border-[#333] bg-[#0E1117]">
      <OutsideClickHandler
        onOutsideClick={() => {
          handleShowSwitchAccount(false);
        }}
      >
        <div className="flex items-center justify-between rounded-t-lg border-b border-[#333] bg-[#161B22] py-4 px-4">
          <button
            className="cursor-pointer"
            onClick={() => handleShowSwitchAccount(false)}
          >
            <ArrowLeftIcon className="h-5 w-5 fill-white" />
          </button>
          <h3 className="font-bold">Switch Account</h3>
        </div>
        <div className="space-y-4 py-4 px-4">
          {roles?.map((role, i) => (
            <div
              key={i}
              className={`relative w-full flex-col items-center space-y-1 rounded-md border border-[#333] px-4 py-2  ${
                account?.accountType === role.type
                  ? "bg-[#1F2937]"
                  : "bg-[#161B22] hover:bg-[#1F2937]"
              }`}
            >
              <div className="flex items-center justify-center">
                <button
                  className="flex-1 text-start"
                  disabled={account?.accountType === role.type}
                  onClick={() => {
                    setAccountType(role.type);
                    handleShowSwitchAccount(false);
                  }}
                >
                  <h3>{role.type}</h3>
                </button>

                <button
                  onClick={() => handleShowRoleInfo(i)}
                  className="absolute right-4 cursor-pointer"
                >
                  {isShowRoleInfo[i] ? (
                    <XCircleIcon className="h-5 w-5 fill-white" />
                  ) : (
                    <InformationCircleIcon className="h-5 w-5 fill-white" />
                  )}
                </button>
              </div>
              {isShowRoleInfo[i] && (
                <div>
                  <p className="text-xs text-[#A3A3A3]">{role.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default SwitchAccount;
