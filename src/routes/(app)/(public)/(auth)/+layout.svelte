<main
  class="min-h-[100svh] flex flex-col justify-center items-center bg-gradient-to-br from-surface-800 from-50% to-secondary-700 to-98%"
>
  <div class="p-4 w-full flex-grow flex justify-around items-center">
    <div class="hidden md:block p-4 max-w-5xl">
      <enhanced:img
        src="../../../../lib/assets/unsplash.jpg"
        alt="Logo"
        class="rounded-lg shadow-lg"
      />
    </div>
    <div class="min-w-max">
      <slot />
    </div>
  </div>
  <p class="text-sm opacity-60 p-1">
    <a href="https://github.com/zafchiel" target="_blank">@zafchiel</a>
    &#169;{new Date().getFullYear()}
  </p>
</main>
