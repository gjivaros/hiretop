import { StateCreator } from "zustand";

export interface Mission {
  id: string;
  name: string;
  description: string;
  status: string;
  salary: Salary;
  localisation?: string;
  enterpriseId: string;
  createdAt: string;
  updatedAt: string;
  enterprise: {
    id: string;
    name: string;
    description: string;
  };

  applications: Application[];
}

export interface Application {
  id: string;
  missionId: string;
  applicantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Salary {
  min: number;
  max: number;
  type: string;
  currency: string;
}

export interface MissionSlice {
  missions: Mission[];
  setMissions: (missions: Mission[]) => void;
}

export const createMissionSlice: StateCreator<
  MissionSlice,
  [],
  [],
  MissionSlice
> = (set) => ({
  missions: [],
  setMissions(missions) {
    set({ missions });
  },
});
