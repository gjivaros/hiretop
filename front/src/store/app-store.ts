import { create } from "zustand";
import { AccountSlice, createAccountSlice } from "./account-slice";
import { AppModeSlice, createAppModeSlice } from "./app-mode-slice";
import { MissionSlice, createMissionSlice } from "./mission-slice";

type AppStore = AppModeSlice & AccountSlice & MissionSlice;

export const useAppStore = create<AppStore>()((...a) => ({
  ...createAppModeSlice(...a),
  ...createAccountSlice(...a),
  ...createMissionSlice(...a),
}));
