<script lang="ts">
  import { filterStore, type CardFilters } from "../stores/filterStore";
  export let allRegions: string[] = [];
  export let allTypes: string[] = [];

  let searchTerm = '';
  let selectedRegion = '';
  let selectedType = '';
  let sortOrder: CardFilters['sortOrder'] = 'desc';

  $: filterStore.set({
    searchTerm: searchTerm.toLowerCase(),
    selectedRegion,
    selectedType,
    sortOrder,
  });
</script>

<div class="mb-8 p-4 bg-gray-800 rounded-lg shadow-md bg-col">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div>
      <label for="search" class="block text-sm font-medium text-gray-300 mb-1">Search by Name</label>
      <input
        type="text"
        id="search"
        bind:value={searchTerm}
        placeholder="Enter card name..."
        class="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div>
      <label for="region" class="block text-sm font-medium text-gray-300 mb-1">Filter by Region</label>
      <select
        id="region"
        bind:value={selectedRegion}
        class="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Regions</option>
        {#each allRegions as region}
          <option value={region}>{region}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="type" class="block text-sm font-medium text-gray-300 mb-1">Filter by Type</label>
      <select
        id="type"
        bind:value={selectedType}
        class="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Types</option>
        {#each allTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="sort" class="block text-sm font-medium text-gray-300 mb-1">Sort by</label>
      <select
        id="sort"
        bind:value={sortOrder}
        class="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="desc">Newest to Oldest</option>
        <option value="asc">Oldest to Newest</option>
      </select>
    </div>
  </div>
</div>

<style>
.bg-col {
  background-color: #1f1c1f;
}
</style>