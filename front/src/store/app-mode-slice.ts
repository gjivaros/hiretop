import { strValOrUndef } from "@paroi/data-formatters-lib";
import { StateCreator } from "zustand";

const appModeKey = "HIRE_APP_MODE";
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
  mode:
    (strValOrUndef(localStorage.getItem(appModeKey)) as AppMode | undefined) ??
    "enterprise",

  setMode(mode) {
    localStorage.setItem(appModeKey, mode);
    set({ mode });
  },
});
