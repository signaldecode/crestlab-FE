import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  login: (user) => set({ user, isLoggedIn: true, isAdmin: user.role === 'admin' }),
  logout: () => set({ user: null, isLoggedIn: false, isAdmin: false }),
}));

export default useAuthStore;
