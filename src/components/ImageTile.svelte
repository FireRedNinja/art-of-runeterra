<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { backOut } from "svelte/easing";
  import type { Card } from "../types";

  export let card: Card;
  export let index: number = 0;

  let region = card.region.join(", ");

  let wrapper: HTMLAnchorElement;

  let imageLoaded = false;
  let imageError = false;
  let rotateX = 0;
  let rotateY = 0;
  let scale = 1;

  let isHovering = false;

  const onMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = wrapper.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const centerX = width / 2;
    const centerY = height / 2;

    const percentageX = (x - centerX) / centerX;
    const percentageY = (y - centerY) / centerY;

    rotateY = percentageX * 12;
    rotateX = -percentageY * 12;
    scale = 1.05;
    isHovering = true;
  };

  const onMouseLeave = () => {
    isHovering = false;
    setTimeout(() => {
      rotateX = 0;
      rotateY = 0;
      scale = 1;
    }, 50);
  };

  const baseImgOptimisationUrl = "https://images.weserv.nl/";
  const params = new URLSearchParams({
    url: card.fullArtUrl,
    w: "300",
    h: "400",
    fit: "cover",
    q: "75",
  });
  $: optimizedImageUrl = `${baseImgOptimisationUrl}?${params.toString()}`;
</script>

<a
  href={`/art-of-runeterra/card/${card.code}`}
  class="block group"
  in:fly={{
    y: 50,
    duration: 100,
    easing: backOut,
    delay: index * 50 + 100,
    opacity: 0,
  }}
  out:fade={{ duration: 50 }}
  bind:this={wrapper}
  on:mousemove={onMouseMove}
  on:mouseleave={onMouseLeave}
>
  <div
    role="presentation"
    class="aspect-[3/4] rounded-lg overflow-hidden bg-gray-90 {isHovering
      ? 'shadow-2xl'
      : 'shadow-lg'}"
    style="transform: perspective(1000px) rotateX({rotateX}deg) rotateY({rotateY}deg) scale({scale}); will-change: transform;"
  >
    {#if !imageLoaded && !imageError}
      <div
        class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse"
      />
    {/if}

    {#if imageError}
      <div
        class="absolute inset-0 flex items-center justify-center bg-gray-800"
      >
        <span class="text-gray-400 text-sm">Image unavailable</span>
      </div>
    {:else}
      <img
        src={optimizedImageUrl}
        alt="{card.name} full art"
        class="object-cover w-full h-full"
        class:opacity-0={!imageLoaded}
        class:opacity-100={imageLoaded}
        loading="lazy"
        decoding="async"
        on:load={() => (imageLoaded = true)}
        on:error={() => (imageError = true)}
      />
    {/if}
  </div>
  <div class="mt-2 text-center">
    <h2 class="text-white font-semibold truncate">{card.name.toUpperCase()}</h2>
    <div class="text-xs text-gray-400">{region} - {card.type}</div>
  </div>
</a>
