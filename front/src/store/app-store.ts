import { create } from "zustand";
import { AppModeSlice, createAppModeSlice } from "./app-mode-slice";

type AppStore = AppModeSlice;

export const useAppStore = create<AppStore>()((...a) => ({
  ...createAppModeSlice(...a),
}));
