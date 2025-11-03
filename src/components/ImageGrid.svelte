<script lang="ts">
  import type { Card } from "../types";
  import ImageTile from "./ImageTile.svelte";
  import { filterStore } from "../stores/filterStore";
  import { derived, writable, get } from "svelte/store";
  import { flip } from "svelte/animate";
  import { backInOut, backOut, expoOut } from "svelte/easing";
  import { onMount } from "svelte";

  export let cards: Card[] = [];

  const PAGE_SIZE = 30;
  const currentPage = writable(1);

  // Subscribe to filterStore and filter cards reactively
  const filteredCards = derived([filterStore], ([filters]) => {
    let result = cards.filter((card) => {
      const nameMatch = card.name.toLowerCase().includes(filters.searchTerm);
      const regionMatch =
        filters.selectedRegion === "" ||
        card.region.includes(filters.selectedRegion);
      const typeMatch =
        filters.selectedType === "" || card.type === filters.selectedType;
      return nameMatch && regionMatch && typeMatch;
    });

    return result.sort((a, b) => {
      return filters.sortOrder === "desc"
        ? b.code.localeCompare(a.code)
        : a.code.localeCompare(b.code);
    });
  });

  const paginatedCards = derived(
    [filteredCards, currentPage],
    ([$filteredCards, $currentPage]) => {
      const start = ($currentPage - 1) * PAGE_SIZE;
      return $filteredCards.slice(start, start + PAGE_SIZE);
    },
  );

  filteredCards.subscribe(() => {
    currentPage.set(1);
  });

  $: totalCards = $filteredCards.length;
  $: totalPages = Math.ceil(totalCards / PAGE_SIZE);

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" && get(currentPage) > 1) {
      currentPage.update((n) => n - 1);
    } else if (event.key === "ArrowRight" && get(currentPage) < totalPages) {
      currentPage.update((n) => n + 1);
    }
  };

  onMount(() => {
    const unsubscribe = currentPage.subscribe(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return unsubscribe;
  });
</script>

<div
  class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
>
  {#if $filteredCards.length > 0}
    {#each $paginatedCards as card, i (card.code)}
      <div
        animate:flip={{
          duration: 100,
          easing: expoOut,
        }}
      >
        <ImageTile {card} index={i} />
      </div>
    {/each}
  {:else}
    <p class="text-white col-span-full text-center">
      No cards match your current filters.
    </p>
  {/if}
</div>

{#if totalPages > 1}
  <div class="flex flex-wrap justify-center items-center gap-2 mt-8">
    <button
      class="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      on:click={() => $currentPage > 1 && currentPage.update((n) => n - 1)}
      disabled={$currentPage === 1}
    >
      Prev
    </button>
    {#if totalPages <= 7}
      {#each Array(totalPages) as _, idx}
        <button
          class="px-2 py-1 rounded text-sm font-semibold {$currentPage ===
          idx + 1
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}"
          on:click={() => currentPage.set(idx + 1)}
        >
          {idx + 1}
        </button>
      {/each}
    {:else}
      {#if $currentPage > 3}
        <button
          class="px-2 py-1 rounded text-sm font-semibold bg-gray-800 text-gray-300"
          on:click={() => currentPage.set(1)}>1</button
        >
        {#if $currentPage > 4}
          <span class="px-1 text-gray-400">…</span>
        {/if}
      {/if}
      {#each Array(5) as _, i}
        {#if $currentPage <= 3}
          {#if i < 5}
            <button
              class="px-2 py-1 rounded text-sm font-semibold {$currentPage ===
              i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}"
              on:click={() => currentPage.set(i + 1)}
            >
              {i + 1}
            </button>
          {/if}
        {:else if $currentPage > totalPages - 3}
          {#if i < 5}
            <button
              class="px-2 py-1 rounded text-sm font-semibold {$currentPage ===
              totalPages - 4 + i
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}"
              on:click={() => currentPage.set(totalPages - 4 + i)}
            >
              {totalPages - 4 + i}
            </button>
          {/if}
        {:else if i < 5}
          <button
            class="px-2 py-1 rounded text-sm font-semibold {$currentPage ===
            $currentPage - 2 + i
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}"
            on:click={() => currentPage.set($currentPage - 2 + i)}
          >
            {$currentPage - 2 + i}
          </button>
        {/if}
      {/each}
      {#if $currentPage < totalPages - 2}
        {#if $currentPage < totalPages - 3}
          <span class="px-1 text-gray-400">…</span>
        {/if}
        <button
          class="px-2 py-1 rounded text-sm font-semibold bg-gray-800 text-gray-300"
          on:click={() => currentPage.set(totalPages)}>{totalPages}</button
        >
      {/if}
    {/if}
    <button
      class="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      on:click={() =>
        $currentPage < totalPages && currentPage.update((n) => n + 1)}
      disabled={$currentPage === totalPages}
    >
      Next
    </button>
    <div class="w-full text-center text-sm text-gray-400 mt-2">
      Showing {($currentPage - 1) * PAGE_SIZE + 1}–{Math.min(
        $currentPage * PAGE_SIZE,
        totalCards,
      )} of {totalCards} cards
    </div>
  </div>
{/if}
