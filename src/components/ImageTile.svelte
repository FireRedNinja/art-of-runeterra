<script lang="ts">
  export let card: any;
</script>

<a href={`/card/${card.code}`} class="block group">
  <div class="aspect-[3/4] rounded-lg overflow-hidden shadow-lg bg-gray-900 transform transition duration-200 group-hover:scale-105 group-hover:shadow-2xl">
    <img
      src={card.fullArtUrl}
      alt={card.name}
      class="object-cover w-full h-full"
      loading="lazy"
    />
  </div>
  <div class="mt-2 text-center">
    <div class="text-white font-semibold truncate">{card.name}</div>
    <div class="text-xs text-gray-400">{card.region} - {card.type} {card.rarity != 'None' ? `- ${card.rarity}` : ''}</div>
  </div>
</a>
