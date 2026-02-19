import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface EquationState {
  equation: string;
  history: string[];
  historyIndex: number;

  setEquation: (equation: string) => void;
  addToHistory: (equation: string) => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
}

const MAX_HISTORY_SIZE = 50;

export const useEquationStore = create<EquationState>()(
  devtools(
    (set) => ({
      equation: '',
      history: [''],
      historyIndex: 0,

      setEquation: (equation) => {
        set((state) => {
          const currentEquation = state.history[state.historyIndex];
          if (equation !== currentEquation) {
            const newHistory = state.history.slice(0, state.historyIndex + 1);
            newHistory.push(equation);

            if (newHistory.length > MAX_HISTORY_SIZE) {
              newHistory.shift();
            }

            return {
              equation,
              history: newHistory,
              historyIndex: newHistory.length - 1,
            };
          }
          return { equation };
        });
      },

      addToHistory: (equation) => {
        set((state) => {
          const newHistory = [...state.history, equation];
          if (newHistory.length > MAX_HISTORY_SIZE) {
            newHistory.shift();
          }
          return {
            history: newHistory,
            historyIndex: newHistory.length - 1,
          };
        });
      },

      undo: () => {
        set((state) => {
          if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            return {
              historyIndex: newIndex,
              equation: state.history[newIndex],
            };
          }
          return state;
        });
      },

      redo: () => {
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            return {
              historyIndex: newIndex,
              equation: state.history[newIndex],
            };
          }
          return state;
        });
      },

      clearHistory: () => set({ history: [''], historyIndex: 0, equation: '' }),
    }),
    { name: 'equation-store' }
  )
);
