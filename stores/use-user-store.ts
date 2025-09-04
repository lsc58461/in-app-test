import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface IUser {
  userId?: string | null;
  resumeId?: string | null;
  phoneNumber?: string | null;
  name?: string | null;
  businessRegistrationNumber?: number | null;
  workerPoolExposure?: boolean | null;
  marketingConsent?: boolean | null;
  userType?: "COMPANY" | "EMPLOYEE" | "ADMIN" | null;
  isBanned?: boolean | null;
}

interface IUserStore {
  user: IUser;
  setUser: (user: IUser) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  allReset: () => void;
  pause: boolean;
  setPause: (pause: boolean) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}

const useUserStore = create(
  devtools(
    persist<IUserStore>(
      (set) => ({
        user: {
          userId: "",
          resumeId: "",
          phoneNumber: "",
          name: "",
          businessRegistrationNumber: undefined,
          workerPoolExposure: undefined,
          marketingConsent: undefined,
          userType: undefined,
          isBanned: undefined,
        },
        setUser: (user) => {
          set({ user });
        },
        accessToken: "",
        setAccessToken: (accessToken) => set({ accessToken }),

        allReset: () => {
          set({
            user: {
              userId: "",
              resumeId: "",
              phoneNumber: "",
              name: "",
              businessRegistrationNumber: undefined,
              workerPoolExposure: undefined,
              marketingConsent: undefined,
              userType: undefined,
              isBanned: undefined,
            },
            accessToken: "",
          });
        },
        pause: false,
        setPause: (pause) => set({ pause }),
        hasHydrated: false,
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      }),
      {
        name: "user",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  )
);

export { useUserStore };
