import { writable } from "svelte/store";

export interface CardFilters {
  searchTerm: string;
  selectedRegion: string;
  selectedType: string;
}

export const filterStore = writable<CardFilters>({
  searchTerm: "",
  selectedRegion: "",
  selectedType: "",
});
