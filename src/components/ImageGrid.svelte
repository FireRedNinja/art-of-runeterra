<script lang="ts">
  export let cards: any[];
  import ImageTile from './ImageTile.svelte';
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {#each cards as card (card.code)}
    <ImageTile {card} />
  {/each}
</div>
