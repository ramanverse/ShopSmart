import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  kmDriven: number;
  fuelType: string;
  transmission: string;
  images: { url: string; isPrimary: boolean }[];
}

interface WishlistStore {
  items: string[];
  addItem: (carId: string) => void;
  removeItem: (carId: string) => void;
  toggleItem: (carId: string) => void;
  hasItem: (carId: string) => boolean;
  clearAll: () => void;
}

interface CompareStore {
  items: Car[];
  addItem: (car: Car) => void;
  removeItem: (carId: string) => void;
  hasItem: (carId: string) => boolean;
  clearAll: () => void;
}

interface FilterState {
  brands: string[];
  fuelTypes: string[];
  bodyTypes: string[];
  transmissions: string[];
  colors: string[];
  states: string[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  kmMin: number;
  kmMax: number;
  sort: string;
  search: string;
  page: number;
}

interface FilterStore {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: any) => void;
  resetFilters: () => void;
  setSearch: (q: string) => void;
}

const defaultFilters: FilterState = {
  brands: [],
  fuelTypes: [],
  bodyTypes: [],
  transmissions: [],
  colors: [],
  states: [],
  priceMin: 500000,
  priceMax: 50000000,
  yearMin: 2010,
  yearMax: new Date().getFullYear(),
  kmMin: 0,
  kmMax: 200000,
  sort: "newest",
  search: "",
  page: 1,
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) => set((s) => ({ items: [...s.items, id] })),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i !== id) })),
      toggleItem: (id) => {
        if (get().hasItem(id)) get().removeItem(id);
        else get().addItem(id);
      },
      hasItem: (id) => get().items.includes(id),
      clearAll: () => set({ items: [] }),
    }),
    { name: "fastlane-wishlist" }
  )
);

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (car) => {
        if (get().items.length >= 3) return;
        set((s) => ({ items: [...s.items, car] }));
      },
      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((c) => c.id !== id) })),
      hasItem: (id) => get().items.some((c) => c.id === id),
      clearAll: () => set({ items: [] }),
    }),
    { name: "fastlane-compare" }
  )
);

export const useFilterStore = create<FilterStore>()((set) => ({
  filters: defaultFilters,
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value, page: 1 } })),
  resetFilters: () => set({ filters: defaultFilters }),
  setSearch: (q) =>
    set((s) => ({ filters: { ...s.filters, search: q, page: 1 } })),
}));
