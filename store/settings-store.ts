import { create } from "zustand";
import { persist } from "zustand/middleware";

const ZOOM_STEP = 0.25;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const DEFAULT_ZOOM = 1;

interface SettingsState {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      zoom: DEFAULT_ZOOM,

      zoomIn: () =>
        set((state) => ({
          zoom: Math.min(state.zoom + ZOOM_STEP, MAX_ZOOM),
        })),

      zoomOut: () =>
        set((state) => ({
          zoom: Math.max(state.zoom - ZOOM_STEP, MIN_ZOOM),
        })),

      resetZoom: () => set({ zoom: DEFAULT_ZOOM }),
    }),
    { name: "latexly-settings" },
  ),
);
