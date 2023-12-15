<script lang="ts">
  // import image from "$lib/assets/black-card.jpg";
</script>

<main class="min-h-[100svh] flex flex-col justify-center items-center">
  <div class="p-4 flex-grow flex justify-center items-center">
    <div class="hidden md:block p-4 max-w-4xl">
      <enhanced:img
        src="../../../../lib/assets/black-card.jpg"
        alt="Logo"
        class="rounded-lg shadow-lg"
      />
    </div>
    <div class="min-w-max">
      <slot />
    </div>
  </div>
  <p class="text-sm opacity-60 p-1">
    @zafchiel, {new Date().getFullYear()}&#169;
  </p>
</main>
