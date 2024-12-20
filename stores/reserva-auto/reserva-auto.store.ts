'use client';

import { VehicleType } from "@/constant/cars";
import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// export type ReservaAutoType = {
//   car: CarType | null,
//   silla: boolean,
//   gps: boolean
// };

interface StoreState {
  reserva_auto: VehicleType | null;
  getReservaAuto: () => VehicleType | null;
  addReservaAuto: (item: VehicleType) => void;
  removeReservaAuto: () => void;
}

const storeApi: StateCreator<StoreState> = (set, get) => ({
  reserva_auto: null,
  getReservaAuto: () => get().reserva_auto,
  addReservaAuto: (item: VehicleType) => set(() => ({reserva_auto: item})  ),
  removeReservaAuto: () => set(() => ({ reserva_auto: null }))
});

export const useReservaAutoStore = create<StoreState>()(
  persist(
    storeApi,
    {
      name: 'reserva-auto',
      storage: createJSONStorage(() => localStorage),
    })
);