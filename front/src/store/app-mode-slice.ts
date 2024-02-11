import { StateCreator } from "zustand";

export type AppMode = "applicant" | "enterprise";

export interface AppModeSlice {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

export const createAppModeSlice: StateCreator<
  AppModeSlice,
  [],
  [],
  AppModeSlice
> = (set) => ({
  mode: "enterprise",
  setMode(mode) {
    set({ mode });
  },
});
