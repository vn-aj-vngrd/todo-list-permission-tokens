import { type StateCreator } from "zustand";
import { accountData } from "~/data";

export interface User {
  id: string;
  accountType: string;
  description: string;
  permissions: string[];
}

export interface AuthSlice {
  user: User | null;
  setUser: (user: User) => void;
  isShowSwitchAccount: boolean;
  handleShowSwitchAccount: (b: boolean) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: accountData[2] ? accountData[2] : null,
  setUser: (user) => {
    set(() => ({
      user,
    }));
  },
  isShowSwitchAccount: false,
  handleShowSwitchAccount: (b) => {
    set((state) => ({
      ...state,
      isShowSwitchAccount: b,
    }));
  },
});
