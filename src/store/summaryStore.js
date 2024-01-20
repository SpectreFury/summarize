import { create } from "zustand";

const useSummaryStore = create((set) => ({
  summary: "",
  setSummary: (newSummary) => set((state) => ({ summary: newSummary })),
}));

export { useSummaryStore };
