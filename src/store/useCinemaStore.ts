import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HorarioSelecionado {
  filme: string;
  hora: string;
  data: string;
  quantidade: number;
}

interface Usuario {
  cpf: string;
  email: string;
  registrado?: boolean;
}

interface Ingresso {
  id: string;
  filme: string;
  hora: string;
  data: string;
  dataCompra: string;
  valor: number;
  quantidade: number;
}


interface CinemaState {
  horarioSelecionado: HorarioSelecionado | null;
  setHorarioSelecionado: (data: HorarioSelecionado | null) => void;

  usuario: Usuario | null;
  setUsuario: (data: Usuario | null) => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;

  ingressosComprados: Ingresso[];
  adicionarIngresso: (ingresso: Ingresso) => void;
  removerIngresso: (id: string) => void;
}

export const useCinemaStore = create<CinemaState>()(
  persist(
    (set) => ({
      horarioSelecionado: null,
      setHorarioSelecionado: (data) => set({ horarioSelecionado: data }),

      usuario: null,
      setUsuario: (data) => set({ usuario: data }),

      isLoggedIn: false,
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),

      ingressosComprados: [],
      adicionarIngresso: (novoIngresso) =>
        set((state) => {
          const ingressoExistenteIndex = state.ingressosComprados.findIndex(
            (i) =>
              i.filme === novoIngresso.filme &&
              i.data === novoIngresso.data &&
              i.hora === novoIngresso.hora
          );

          if (ingressoExistenteIndex !== -1) {
            const ingressosAtualizados = [...state.ingressosComprados];
            const ingressoAtual = ingressosAtualizados[ingressoExistenteIndex];

            ingressosAtualizados[ingressoExistenteIndex] = {
              ...ingressoAtual,
              quantidade: ingressoAtual.quantidade + novoIngresso.quantidade,
              valor: ingressoAtual.valor + novoIngresso.valor,
            };

            return { ingressosComprados: ingressosAtualizados };
          }

          return {
            ingressosComprados: [...state.ingressosComprados, novoIngresso],
          };
        }),

      removerIngresso: (id) =>
        set((state) => ({
          ingressosComprados: state.ingressosComprados.filter(
            (i) => i.id !== id
          ),
        })),
    }),
    {
      name: "cinema-storage",
      partialize: (state) => ({
        horarioSelecionado: state.horarioSelecionado,
        usuario: state.usuario,
        isLoggedIn: state.isLoggedIn,
        ingressosComprados: state.ingressosComprados,
      }),
    }
  )
);