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
  setPin: (pin: string | null) => void;
  setLastBackgroundTime: (time: number | null) => void;
  setLocked: (isLocked: boolean) => void;
  setAppLockEnabled: (enabled: boolean) => void;
  setLockTimeout: (timeout: number) => void;
}

const _useAppLock = create<AppLockState>()(
  persist(
    (set) => ({
      pin: null,
      lastBackgroundTime: null,
      isLocked: false,
      isAppLockEnabled: true,
      lockTimeout: 30000, // Default 30 seconds
      setPin: (pin) => set({ pin }),
      setLastBackgroundTime: (lastBackgroundTime) =>
        set({ lastBackgroundTime }),
      setLocked: (isLocked) => set({ isLocked }),
      setAppLockEnabled: (isAppLockEnabled) => set({ isAppLockEnabled }),
      setLockTimeout: (lockTimeout) => set({ lockTimeout }),
    }),
    {
      name: 'app-lock-storage',
      storage: createJSONStorage(() => ({
        setItem: (name, value) => storage.set(name, value),
        getItem: (name) => storage.getString(name) ?? null,
        removeItem: (name) => storage.delete(name),
      })),
      partialize: (state) => ({
        pin: state.pin,
        isAppLockEnabled: state.isAppLockEnabled,
        lockTimeout: state.lockTimeout,
      }),
    }
  )
);

export const useAppLock = createSelectors(_useAppLock);
