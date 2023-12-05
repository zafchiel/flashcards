<script lang="ts">
  import CardSvg from "$lib/assets/animatedCardSVG.svelte";
</script>

<main class="min-h-[100svh] flex items-center justify-center">
  <section
    class="p-4 m-2 md:p-10 flex flex-col items-center gap-5 card variant-soft-surface shadow-lg"
  >
    <div class="max-w-xl mb-5">
      <h1 class="h1 font-bold gradient-heading">Flashcards HUH</h1>
      <p class="text-sm md:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos magni
        distinctio ut nihil eius commodi modi at alias. Fugit saepe modi aperiam
        nesciunt dicta repudiandae vero, magnam ea eaque animi.
      </p>
      <div class="p-3 flex flex-wrap gap-3 items-center max-w-xs">
        <a href="/signup" class="btn variant-filled-primary flex-1"
          >Get Started</a
        >
        <a href="/login" class="btn variant-outline-secondary flex-1">Sign-in</a
        >
      </div>
    </div>
    <CardSvg />
  </section>
</main>

<style>
  main {
    background: rgb(21, 23, 31);
    background: linear-gradient(
      45deg,
      rgba(21, 23, 31, 1) 0%,
      rgba(61, 36, 37, 0.7) 81%,
      rgba(212, 22, 60, 0.4) 100%
    );
  }

  section {
    perspective: 100vh;
  }
</style>
