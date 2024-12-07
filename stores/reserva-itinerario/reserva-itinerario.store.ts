'use client';

import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ItinerarioType = {
  startLocation: string,
  endLocation: string,
  startDay: Date | null,
  endDay: Date | null,
  startTime: string | undefined,
  endTime: string | undefined
};

const initialState: ItinerarioType = {
  startLocation: "",
  endLocation: "",
  startDay: null,
  endDay: null,
  startTime: undefined,
  endTime: undefined
};

interface StoreState {
  itinerario: ItinerarioType | null;
  getItinerario: () => ItinerarioType | null;
  addItinerario: (item: ItinerarioType) => void;
  removeItinerario: () => void;
}

const storeApi: StateCreator<StoreState> = (set, get) => ({
  itinerario: initialState,
  getItinerario: () => get().itinerario,
  addItinerario: (item: ItinerarioType) => set(() => ({itinerario: item})  ),
  removeItinerario: () => set(() => ({ itinerario: null }))
});

export const useItinerarioStore = create<StoreState>()(
  persist(
    storeApi,
    {
      name: 'reserva-itinerario-rent',
      storage: createJSONStorage(() => localStorage),
    })
);