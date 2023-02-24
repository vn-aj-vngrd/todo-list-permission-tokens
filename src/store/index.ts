import { create } from "zustand";
import { type AuthSlice, createAuthSlice } from "./slices/createAccountSlice";
import { type TaskSlice, createTaskSlice } from "./slices/createTaskSlice";

type StoreState = AuthSlice & TaskSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createTaskSlice(...a),
}));
