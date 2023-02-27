import { create } from "zustand";
import { type AuthSlice, createAuthSlice } from "./slices/createAuthSlice";
import { type TaskSlice, createTaskSlice } from "./slices/createTaskSlice";
import { createJSONStorage, persist } from "zustand/middleware";

type StoreState = AuthSlice & TaskSlice;

export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...createAuthSlice(set, get, api),
      ...createTaskSlice(set, get, api),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => localStorage),
      // partialize: (state) => ({ user: state.user }),
    }
  )
);
