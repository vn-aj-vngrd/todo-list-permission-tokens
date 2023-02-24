import { create } from "zustand";
import {
  type AccountSlice,
  createAccountSlice,
} from "./slices/createAccountSlice";
import { type TaskSlice, createTaskSlice } from "./slices/createTaskSlice";

type StoreState = AccountSlice & TaskSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAccountSlice(...a),
  ...createTaskSlice(...a),
}));
