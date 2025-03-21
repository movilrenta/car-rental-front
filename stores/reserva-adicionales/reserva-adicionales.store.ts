'use client';

import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ReservaAdicionalesType = {
  id: number
};

interface StoreState {
  reserva_adicionales: ReservaAdicionalesType[] | null;
  getReservaAdicionales: () => ReservaAdicionalesType[] | null;
  addReservaAdicional: (value: number) => void;
  removeReservaAuto: () => void;
}

const storeApi: StateCreator<StoreState> = (set, get) => ({
  reserva_adicionales: [],
  getReservaAdicionales: () => get().reserva_adicionales,
  addReservaAdicional: (value: number) => {
    const reserva_adicionales = get().reserva_adicionales ?? [];
    const exists = reserva_adicionales.some((item) => item.id === value);
  
    const updatedReservaAdicionales = exists
      ? reserva_adicionales.filter((item) => item.id !== value) // Eliminar si ya existe
      : [...reserva_adicionales, { id: value }]; // Agregar si no existe
  
    set(() => ({ reserva_adicionales: updatedReservaAdicionales }));
  },

  removeReservaAuto: () => set(() => ({ reserva_adicionales: null })),
});

export const useReservaAdicionalesStore = create<StoreState>()(
  persist(storeApi, {
    name: 'reserva-adicionales',
    storage: createJSONStorage(() => localStorage),
  })
);
