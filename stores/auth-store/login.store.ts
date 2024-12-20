import { create } from 'zustand'

interface State {
  isLogged:boolean;

  setIsLogin: () => void;
}

export const useAuthstore = create<State>()((set) => ({
  isLogged:false,

  setIsLogin: () => set({isLogged:true}),
}))