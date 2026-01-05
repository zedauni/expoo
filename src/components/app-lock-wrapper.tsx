import React, { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { useAppLock } from '@/lib/app-lock';
import { useAuth } from '@/lib/auth';

import { LockScreen } from './lock-screen';

export const AppLockWrapper = ({ children }: { children: React.ReactNode }) => {
  const appState = useRef(AppState.currentState);
  const isLocked = useAppLock.use.isLocked();
  const setLocked = useAppLock.use.setLocked();
  const pin = useAppLock.use.pin();
  const isAppLockEnabled = useAppLock.use.isAppLockEnabled();
  const lockTimeout = useAppLock.use.lockTimeout();
  const lastBackgroundTime = useAppLock.use.lastBackgroundTime();
  const setLastBackgroundTime = useAppLock.use.setLastBackgroundTime();
  const status = useAuth.use.status();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          // App has come to the foreground
          if (isAppLockEnabled && pin && status === 'signIn') {
            const now = Date.now();
            if (lastBackgroundTime) {
              const elapsed = now - lastBackgroundTime;
              if (elapsed >= lockTimeout) {
                setLocked(true);
              }
            }
          }
          setLastBackgroundTime(null);
        }

        if (nextAppState.match(/inactive|background/)) {
          // App has gone to the background
          setLastBackgroundTime(Date.now());
        }

        appState.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, [
    isAppLockEnabled,
    pin,
    lockTimeout,
    lastBackgroundTime,
    setLocked,
    setLastBackgroundTime,
    status,
  ]);

  return (
    <>
      {children}
      {status === 'signIn' && pin && <LockScreen />}
    </>
  );
};
