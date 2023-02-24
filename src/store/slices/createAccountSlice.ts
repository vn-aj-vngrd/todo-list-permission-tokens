import { type StateCreator } from "zustand";

export interface AccountSlice {
  account: {
    accountType: string;
  };
  setAccountType: (accountType: string) => void;
  isShowSwitchAccount: boolean;
  handleShowSwitchAccount: (b: boolean) => void;
}

export const createAccountSlice: StateCreator<AccountSlice> = (set) => ({
  account: {
    accountType: "User",
  },
  setAccountType: (accountType) => {
    set((state) => ({
      account: {
        ...state.account,
        accountType,
      },
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
