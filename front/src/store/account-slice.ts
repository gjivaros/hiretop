import { StateCreator } from "zustand";

export interface Experience {
  period: string;
  post: string;
  enterprise: string;
}
export interface Account {
  id: string;
  email: string;
  token: string;
  enterprise: {
    id: string;
    name?: string;
    description?: string;
    isCompleted: boolean;
  };
  applicant: {
    id: string;
    firsname?: string;
    lastname?: string;
    whoami?: string;
    experiences?: Experience[];
    isCompleted: boolean;
  };
}

export interface AccountSlice {
  account?: Account;
  setAccount: (mode: Account) => void;
}

export const createAccountSlice: StateCreator<
  AccountSlice,
  [],
  [],
  AccountSlice
> = (set) => ({
  account: undefined,
  setAccount(account) {
    set({ account });
  },
});
