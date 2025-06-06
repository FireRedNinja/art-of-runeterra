<script lang="ts">
  import type { Card } from '../types';
  export let card: Card;
  export let related: {
    code: string;
    name: string;
    fullArtUrl: string;
  }[] = [];
</script>

<div class="flex flex-col gap-8 items-center" id="card-detail">
  <div class="w-full">
    <img src={card.fullArtUrl} alt={card.name} class="rounded-lg shadow-xl w-full object-contain" />
  </div>
  <div class="max-w-7xl text-white px-4">
    <h2 class="text-3xl font-bold mb-3 text-center">{card.name}</h2>
    <div class="mb-3 text-gray-400 text-center">{card.region} - {card.rarity} - {card.type}</div>
    {#if card.flavourText}
      <blockquote class="italic text-gray-300 mb-5 text-center text-lg">"{card.flavourText}"</blockquote>
    {/if}
    <div class="mb-4 text-base leading-relaxed">{card.description}</div>
    <div class="mb-3">
      <span class="font-semibold">Artist:</span> {card.artist}
    </div>
    {#if card.keywords && card.keywords.length}
      <div class="mb-4">
        <span class="font-semibold">Keywords:</span>
        <div class="flex flex-wrap gap-2 mt-1">
          {#each card.keywords as kw}
            <span class="inline-block bg-gray-800 rounded px-2.5 py-1 text-sm font-medium">{kw}</span>
          {/each}
        </div>
      </div>
    {/if}
    {#if related.length}
      <div class="mt-8">
        <h3 class="text-2xl font-semibold mb-4 text-center">Related Cards</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
          {#each related as rel}
            <a href={`/card/${rel.code}`} class="block text-center w-full max-w-[150px]">
              <div class="aspect-[3/4] overflow-hidden rounded shadow-lg bg-gray-800">
                <img
                  src={rel.fullArtUrl}
                  alt={rel.name}
                  class="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div class="text-sm text-gray-300 mt-1.5 truncate">{rel.name}</div>
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
