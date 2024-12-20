import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  isLogged: boolean;
  getLog: () => boolean;
  setIsLogin: () => void;
}

const storeAuth: StateCreator<State> = (set, get) => ({
  isLogged: false,
  getLog: () => get().isLogged,
  setIsLogin: () => set({ isLogged: true }),
})


export const useAuthstore = create<State>()(
  persist(storeAuth, {
    name: 'movilrenta-auth',
    storage: createJSONStorage(() => sessionStorage),
  })
);
