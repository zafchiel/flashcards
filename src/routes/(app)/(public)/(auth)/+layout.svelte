<script lang="ts">
  import { decode } from "blurhash";

  let isImageLoaded = false;

  const paintCanvas = (node: HTMLCanvasElement) => {
    const pixels = decode("L72PZQMtp1V@RKp3V=ofj{j=axa{", 500, 500);

    const ctx = node.getContext("2d");
    if (!ctx) return;

    // const imageData = ctx.createImageData(3840, 2160);
    // imageData.data.set(pixels);
    const imageData = new ImageData(pixels, 500, 500);
    ctx.putImageData(imageData, 0, 0);
  };
</script>

<main
  class="min-h-[100svh] flex flex-col justify-center items-center bg-gradient-to-br from-surface-800 from-50% to-secondary-700 to-98%"
>
  <div class="p-4 w-full flex-grow flex justify-around items-center">
    <div class="hidden md:flex p-4 max-w-5xl flex-1">
      <canvas use:paintCanvas class:hidden={isImageLoaded} width="16" height="9" class="w-full rounded-xl" ></canvas>
      <enhanced:img
        on:load={() => (isImageLoaded = true)}
        class:hidden={!isImageLoaded}
        src="../../../../lib/assets/unsplash.jpg"
        alt="Auth page"
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
