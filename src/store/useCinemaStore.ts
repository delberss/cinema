import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HorarioSelecionado {
  filme: string;
  hora: string;
  data: string
  quantidade: number;
}
interface CinemaState {
  horarioSelecionado: HorarioSelecionado | null;
  setHorarioSelecionado: (data: HorarioSelecionado | null) => void;
}

export const useCinemaStore = create<CinemaState>()(
  persist(
    (set) => ({
      horarioSelecionado: null,
      setHorarioSelecionado: (data) => set({ horarioSelecionado: data }),
    }),
    {
      name: "cinema-storage",
      partialize: (state) => ({
        horarioSelecionado: state.horarioSelecionado,
      }),
    }
  )
);