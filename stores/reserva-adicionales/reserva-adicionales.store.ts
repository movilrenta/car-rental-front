'use client';

import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ReservaAdicionalesType = {
  silla: boolean;
  gps: boolean;
};

interface StoreState {
  reserva_adicionales: ReservaAdicionalesType | null;
  getReservaAdicionales: () => ReservaAdicionalesType | null;
  addReservaAdicionalSilla: (value: boolean) => void;
  addReservaAdicionalGPS: (value: boolean) => void;
  removeReservaAuto: () => void;
}

const storeApi: StateCreator<StoreState> = (set, get) => ({
  reserva_adicionales: { silla: false, gps: false },
  getReservaAdicionales: () => get().reserva_adicionales,

  addReservaAdicionalSilla: (value: boolean) =>
    set((state) => ({
      reserva_adicionales: {
        ...state.reserva_adicionales,
        silla: value,
        gps: state.reserva_adicionales?.gps ?? false, // Asegurando que gps siempre tenga un valor booleano
      }
    })),

  addReservaAdicionalGPS: (value: boolean) =>
    set((state) => ({
      reserva_adicionales: {
        ...state.reserva_adicionales,
        gps: value,
        silla: state.reserva_adicionales?.silla ?? false, // Asegurando que silla siempre tenga un valor booleano
      }
    })),

  removeReservaAuto: () => set(() => ({ reserva_adicionales: null })),
});

export const useReservaAdicionalesStore = create<StoreState>()(
  persist(storeApi, {
    name: 'reserva-adicionales',
    storage: createJSONStorage(() => localStorage),
  })
);
