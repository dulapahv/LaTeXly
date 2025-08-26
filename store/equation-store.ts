// src/store/equation-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface EquationState {
  equation: string;
  history: string[];
  historyIndex: number;
  isDownloading: boolean;
  isCopying: boolean;
  
  // Actions
  setEquation: (equation: string) => void;
  addToHistory: (equation: string) => void;
  undo: () => void;
  redo: () => void;
  setIsDownloading: (isDownloading: boolean) => void;
  setIsCopying: (isCopying: boolean) => void;
  clearHistory: () => void;
}

const MAX_HISTORY_SIZE = 50;

export const useEquationStore = create<EquationState>()(
  devtools(
    (set, get) => ({
      equation: '',
      history: [''],
      historyIndex: 0,
      isDownloading: false,
      isCopying: false,

      setEquation: (equation) => {
        set((state) => {
          // Add to history if different from current
          const currentEquation = state.history[state.historyIndex];
          if (equation !== currentEquation) {
            // Remove any history after current index
            const newHistory = state.history.slice(0, state.historyIndex + 1);
            newHistory.push(equation);
            
            // Limit history size
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

      setIsDownloading: (isDownloading) => set({ isDownloading }),
      setIsCopying: (isCopying) => set({ isCopying }),
      clearHistory: () => set({ history: [''], historyIndex: 0, equation: '' }),
    }),
    {
      name: 'equation-store',
    }
  )
);