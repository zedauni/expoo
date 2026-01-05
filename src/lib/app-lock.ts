import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from './storage';
import { createSelectors } from './utils';

interface AppLockState {
  pin: string | null;
  lastBackgroundTime: number | null;
  isLocked: boolean;
  isAppLockEnabled: boolean;
  lockTimeout: number; // in milliseconds
  hasCompletedOnboarding: boolean;
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  setPin: (pin: string | null) => void;
  setLastBackgroundTime: (time: number | null) => void;
  setLocked: (isLocked: boolean) => void;
  setAppLockEnabled: (enabled: boolean) => void;
  setLockTimeout: (timeout: number) => void;
  setHasCompletedOnboarding: (completed: boolean) => void;
  setUserProfile: (profile: {
    name?: string;
    email?: string;
    phone?: string;
  }) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
}

const _useAppLock = create<AppLockState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
      pin: null,
      lastBackgroundTime: null,
      isLocked: false,
      isAppLockEnabled: true,
      lockTimeout: 30000, // Default 30 seconds
      hasCompletedOnboarding: false,
      userName: null,
      userEmail: null,
      userPhone: null,
      setPin: (pin) => set({ pin }),
      setLastBackgroundTime: (lastBackgroundTime) =>
        set({ lastBackgroundTime }),
      setLocked: (isLocked) => set({ isLocked }),
      setAppLockEnabled: (isAppLockEnabled) => set({ isAppLockEnabled }),
      setLockTimeout: (lockTimeout) => set({ lockTimeout }),
      setHasCompletedOnboarding: (hasCompletedOnboarding) =>
        set({ hasCompletedOnboarding }),
      setUserProfile: (profile) =>
        set((state) => ({
          userName: profile.name ?? state.userName,
          userEmail: profile.email ?? state.userEmail,
          userPhone: profile.phone ?? state.userPhone,
        })),
    }),
    {
      name: 'app-lock-storage',
      storage: createJSONStorage(() => ({
        setItem: (name, value) => storage.set(name, value),
        getItem: (name) => storage.getString(name) ?? null,
        removeItem: (name) => storage.delete(name),
      })),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        pin: state.pin,
        isAppLockEnabled: state.isAppLockEnabled,
        lockTimeout: state.lockTimeout,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        userName: state.userName,
        userEmail: state.userEmail,
        userPhone: state.userPhone,
      }),
    }
  )
);

export const useAppLock = createSelectors(_useAppLock);
