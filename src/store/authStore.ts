import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  firstName: string;
  role: string;
  userId: string;
  email: string;
  phone: string;
}

interface AuthState {
  jwt: string | null;
  user: User | null;
  setAuth: (jwt: string, user: User) => void;
  clearAuth: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      jwt: null,
      user: null,
      setAuth: (jwt, user) => set({ jwt, user }),
      clearAuth: () => set({ jwt: null, user: null }),
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        jwt: state.jwt,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);