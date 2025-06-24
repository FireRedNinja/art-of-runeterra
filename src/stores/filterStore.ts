import { writable } from "svelte/store";

export interface CardFilters {
  searchTerm: string;
  selectedRegion: string;
  selectedType: string;
  sortOrder: "asc" | "desc"; // Add sortOrder to filters
}

export const filterStore = writable<CardFilters>({
  searchTerm: "",
  selectedRegion: "",
  selectedType: "",
  sortOrder: "desc", // Default to newest first
});
