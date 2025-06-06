<script lang="ts">
  import type { Card } from '../types';
  export let card: Card;
  export let related: {
    code: string;
    name: string;
    fullArtUrl: string;
  }[] = [];
</script>

<div class="flex flex-col md:flex-row gap-8 items-start">
  <div class="flex-shrink-0 w-full md:w-1/3">
    <img src={card.fullArtUrl} alt={card.name} class="rounded-lg shadow-xl w-full" />
  </div>
  <div class="flex-1 text-white">
    <h2 class="text-2xl font-bold mb-2">{card.name}</h2>
    <div class="mb-2 text-gray-400">{card.region} - {card.rarity} - {card.type}</div>
    {#if card.flavourText}
      <blockquote class="italic text-gray-300 mb-4">{card.flavourText}</blockquote>
    {/if}
    <div class="mb-4">{card.description}</div>
    <div class="mb-2">
      <span class="font-semibold">Artist:</span> {card.artist}
    </div>
    {#if card.keywords && card.keywords.length}
      <div class="mb-2">
        <span class="font-semibold">Keywords:</span>
        {#each card.keywords as kw}
          <span class="inline-block bg-gray-800 rounded px-2 py-1 text-xs mr-1">{kw}</span>
        {/each}
      </div>
    {/if}
    {#if related.length}
      <div class="mt-6">
        <h3 class="font-semibold mb-2">Related Cards</h3>
        <div class="flex flex-wrap gap-4">
          {#each related as rel}
            <a href={`/card/${rel.code}`} class="block text-center w-24">
              <div class="w-24 h-32 overflow-hidden rounded shadow-lg">
                <img
                  src={rel.fullArtUrl}
                  alt={rel.name}
                  class="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div class="text-xs text-gray-300 mt-1 truncate">{rel.name}</div>
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
