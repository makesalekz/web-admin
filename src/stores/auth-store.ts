import { create } from 'zustand';

export type UserRole = 'platform_admin' | 'owner' | 'distributor';

export interface User {
  id: number;
  name: string;
  phone: string;
  role: UserRole;
}

interface AuthStore {
  accessToken: string | null;
  user: User | null;
  role: UserRole | null;
  permissions: string[];
  setAuth: (token: string, user: User) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  role: null,
  permissions: [],
  setAuth: (token, user) =>
    set({ accessToken: token, user, role: user.role, permissions: [] }),
  clear: () =>
    set({ accessToken: null, user: null, role: null, permissions: [] }),
}));
