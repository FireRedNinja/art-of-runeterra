<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import ImageTile from './ImageTile.svelte';
  import Filter from './Filter.svelte';

  export let cards: any[];

  let filtered = cards;
  let filters = { region: '', type: '', rarity: '' };

  function handleFilter(event: CustomEvent) {
    filters = event.detail;
    filtered = cards.filter(card =>
      (!filters.region || card.region === filters.region) &&
      (!filters.type || card.type === filters.type) &&
      (!filters.rarity || card.rarity === filters.rarity)
    );
  }
</script>

<Filter on:filter={handleFilter}
  regions={Array.from(new Set(cards.map(c => c.region)))}
  types={Array.from(new Set(cards.map(c => c.type)))}
  rarities={Array.from(new Set(cards.map(c => c.rarity)))} />

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {#each filtered as card (card.code)}
    <div in:fly={{ y: 20, duration: 300, opacity: 0 }}>
      <ImageTile {card} />
    </div>
  {/each}
</div>
