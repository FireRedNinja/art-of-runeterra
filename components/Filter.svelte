<script lang="ts">
  export let regions: string[];
  export let types: string[];
  export let rarities: string[];

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let selectedRegion = '';
  let selectedType = '';
  let selectedRarity = '';

  function updateFilters() {
    dispatch('filter', {
      region: selectedRegion,
      type: selectedType,
      rarity: selectedRarity
    });
  }
</script>

<div class="flex flex-wrap gap-4 mb-8 justify-center">
  <select class="rounded px-3 py-2 bg-gray-800 text-white" bind:value={selectedRegion} on:change={updateFilters}>
    <option value="">All Regions</option>
    {#each regions as region}
      <option value={region}>{region}</option>
    {/each}
  </select>
  <select class="rounded px-3 py-2 bg-gray-800 text-white" bind:value={selectedType} on:change={updateFilters}>
    <option value="">All Types</option>
    {#each types as type}
      <option value={type}>{type}</option>
    {/each}
  </select>
  <select class="rounded px-3 py-2 bg-gray-800 text-white" bind:value={selectedRarity} on:change={updateFilters}>
    <option value="">All Rarities</option>
    {#each rarities as rarity}
      <option value={rarity}>{rarity}</option>
    {/each}
  </select>
</div>
