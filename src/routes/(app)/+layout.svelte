<script lang="ts">
  import BottomNav from "$lib/components/bottomNav.svelte";
  import ProgressBar from "$lib/components/progressBar.svelte";
  import SideRail from "$lib/components/sideRail.svelte";

  export let data;

  let windowWidth: number;
  $: console.log(windowWidth);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<!-- If user is logged in don't duplicate layout -->
{#if !data.user}
  <slot />
{:else}
  <div class="flex">
    <!-- Determine which nav to display -->
    {#if windowWidth > 768}
      <SideRail user={data.user} />
    {:else if windowWidth < 768}
      <BottomNav user={data.user} />
    {/if}

    <main class="h-screen overflow-y-auto w-full">
      <div
        class="p-3 md:p-10 relative w-full overflow-x-hidden max-w-4xl"
        class:pb-14={windowWidth < 768}
      >
        <ProgressBar />
        <slot />
      </div>
    </main>
  </div>
{/if}
