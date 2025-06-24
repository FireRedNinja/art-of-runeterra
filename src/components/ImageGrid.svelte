<script lang="ts">
  import type { Card } from "../types";
  import ImageTile from "./ImageTile.svelte";
  import { filterStore } from '../stores/filterStore';
  import { derived } from 'svelte/store';

  export let cards: Card[] = [];

  // Subscribe to filterStore and filter cards reactively
  const filteredCards = derived([
    filterStore
  ], ([filters]) => {
    let result = cards.filter((card) => {
      const nameMatch = card.name
        .toLowerCase()
        .includes(filters.searchTerm);
      const regionMatch =
        filters.selectedRegion === "" || card.region.includes(filters.selectedRegion);
      const typeMatch = filters.selectedType === "" || card.type === filters.selectedType;
      return nameMatch && regionMatch && typeMatch;
    });
    result = result.slice().sort((a, b) => {
      if (filters.sortOrder === 'desc') {
        return b.code.localeCompare(a.code);
      } else {
        return a.code.localeCompare(b.code);
      }
    });
    return result;
  });
</script>

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {#if $filteredCards.length > 0}
    {#each $filteredCards as card (card.code)}
      <ImageTile {card} />
    {/each}
  {:else}
    <p class="text-white col-span-full text-center">No cards match your current filters.</p>
  {/if}
</div>

<style>
  image-grid-component {
    display: block;
  }
</style>
