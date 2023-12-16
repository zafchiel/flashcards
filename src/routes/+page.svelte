<script lang="ts">
  import CardSvg from "$lib/assets/animatedCardSVG.svelte";
</script>

<svelte:head>
  <title>Flashcards\HUH</title>
</svelte:head>

<main
  class="min-h-[100svh] flex items-center justify-center bg-gradient-to-tr from-surface-800 from-50% to-primary-600 to-98%"
>
  <section
    class="p-4 m-2 md:p-10 flex flex-col items-center gap-5 card variant-soft-surface shadow-lg"
  >
    <div class="max-w-xl mb-5">
      <h1 class="h1 font-bold gradient-heading">Flashcards\HUH</h1>
      <p class="text-sm md:text-base">
        Here you can learn and practice various subjects using interactive
        flashcards. Start exploring our collection of flashcards and enhance
        your learning experience today!
      </p>
      <div class="p-3 flex flex-wrap gap-3 items-center max-w-xs">
        <a href="/auth?t=signup" class="btn variant-filled-primary flex-1"
          >Get Started</a
        >
        <a href="/auth?t=signin" class="btn variant-outline-secondary flex-1"
          >Sign-in</a
        >
      </div>
    </div>
    <CardSvg />
  </section>
</main>

<style>
  section {
    perspective: 100vh;
  }
</style>
