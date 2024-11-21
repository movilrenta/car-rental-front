'use client';

import { CarType } from "@/constant/cars";
import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ReservaType = {
  car: CarType | null,
  startLocation: string,
  endLocation: string,
  startDay: Date,
  endDay: Date,
  startTime: string | undefined,
  endTime: string | undefined,
  silla: boolean,
  gps: boolean
};

interface StoreState {
  reserva: ReservaType | null;
  getReserva: () => ReservaType | null;
  addReserva: (item: ReservaType) => void;
  removeReserva: (item: ReservaType) => void;
  //removeAllReserva: () => void;
}

const storeApi: StateCreator<StoreState> = (set, get) => ({
  reserva: null,
  getReserva: () => get().reserva,
  addReserva: (item: ReservaType) => set(() => ({reserva: item})  ),
  removeReserva: () => set(() => ({ reserva: null }))
  //removeReserva: (item: Product) => set((state) => ({ cart: state.cart.filter((i) => i !== item) })),
  //removeAllCart: () => set((state) => ({ cart: [] }))

});

export const useReservaStore = create<StoreState>()(
  persist(
    storeApi,
    {
      name: 'reserva',
      storage: createJSONStorage(() => localStorage),
    })
);