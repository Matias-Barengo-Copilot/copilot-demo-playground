import { create } from "zustand";

type SceneState = {
  activeHotspotId: string | null;
  /** Index in the ordered hotspots array; used for arrow navigation with wrap-around. */
  currentHotspotIndex: number;
  panelOpen: boolean;
  panX: number;
  panY: number;
  isDragging: boolean;
};

type SceneActions = {
  setActiveHotspot: (id: string | null) => void;
  /** Set active hotspot and sync the navigation index (e.g. when user clicks a hotspot). */
  setActiveHotspotWithIndex: (id: string | null, index: number) => void;
  setCurrentHotspotIndex: (index: number) => void;
  openPanel: () => void;
  closePanel: () => void;
  setPanPosition: (panX: number, panY: number) => void;
  setIsDragging: (value: boolean) => void;
};

export const useSceneStore = create<SceneState & SceneActions>((set) => ({
  activeHotspotId: null,
  currentHotspotIndex: -1,
  panelOpen: false,
  panX: 0,
  panY: 0,
  isDragging: false,
  setActiveHotspot: (id) => set({ activeHotspotId: id }),
  setActiveHotspotWithIndex: (id, index) =>
    set({ activeHotspotId: id, currentHotspotIndex: index }),
  setCurrentHotspotIndex: (index) => set({ currentHotspotIndex: index }),
  openPanel: () => set({ panelOpen: true }),
  closePanel: () => set({ panelOpen: false }),
  setPanPosition: (panX, panY) => set({ panX, panY }),
  setIsDragging: (value) => set({ isDragging: value }),
}));
