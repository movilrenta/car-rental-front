'use client';

import { VehicleType } from "@/constant/cars";
import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ReservaType = {
  car: VehicleType | null,
  startLocation: string,
  endLocation: string,
  startDay: Date,
  endDay: Date,
  startTime: string | undefined,
  endTime: string | undefined,
  aditionals_array: {id: number, amount: number}[]
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


});

export const useReservaStore = create<StoreState>()(
  persist(
    storeApi,
    {
      name: 'reserva',
      storage: createJSONStorage(() => localStorage),
    })
);