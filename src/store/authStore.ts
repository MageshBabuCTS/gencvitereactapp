import { create } from 'zustand';

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
}

export const useAuthStore = create<AuthState>((set) => ({
  jwt: null,
  user: null,
  setAuth: (jwt, user) => set({ jwt, user }),
  clearAuth: () => set({ jwt: null, user: null }),
}));