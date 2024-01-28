<script lang="ts">
  import CardSvg from "$lib/assets/animatedCardSVG.svelte";
  import previewImage from "$lib/assets/preview.png?enhanced";
  import cardPreviewImage from "$lib/assets/cardPreview.png?enhanced";
  import type { Action } from "svelte/action";

  const previewImageAction: Action = (node) => {
    const width = node.clientWidth;
    const height = node.clientHeight;

    const mouseOverHandler = (e: MouseEvent) => {
      const xVal = e.clientX;
      const yVal = e.clientY;

      const roationX = -8 * ((yVal - height / 2) / height);
      const rotationY = 8 * ((xVal - width / 2) / width);

      const animationString = `rotateX(${roationX}deg) rotateY(${rotationY}deg) scale(1.05)`;
      node.style.transform = animationString;
      node.style.transition = "0.1s"
    };

    const mouseOutHanlder = () => {
      node.style.transform = "rotateX(0deg) rotateY(0deg)";
      node.style.transition = "0.5s ease-in-out";
    }

    node.addEventListener("mousemove", mouseOverHandler);
    node.addEventListener("mouseout", mouseOutHanlder);

    return {
      destroy() {
        node.removeEventListener("mousemove", mouseOverHandler);
        node.removeEventListener("mouseout", mouseOutHanlder);
      },
    };
  };
</script>

<svelte:head>
  <title>Flashcards\HUH</title>
</svelte:head>

<main>
<div
  class="min-h-[100dvh] rounded-b-xl md:p-8 flex flex-col gap-8 items-center justify-center bg-gradient-to-b from-surface-800 from-30% to-primary-600 to-98% shadow-md"
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
  <section class="max-w-[80vw]">
    <div use:previewImageAction class="p-2 rounded-xl bg-surface-500/30 backdrop-blur-md shadow-md hover:shadow-xl">
      <enhanced:img
        src={previewImage}
        alt="Preview"
        class="rounded-md"
      />
    </div>
  </section>
</div>
<section class="grid md:grid-cols-2 gap-4 max-w-[80vw] mx-auto my-4 md:p-10">
  <div class="flex flex-col gap-4 items-start">
    <h2 class="text-xl md:text-4xl font-bold">Get ready for exam</h2>
    <p>Flashcards help you memorise everything you need to know. Make your learning easier and shorter.</p>
    <a href="/auth?t=signup" class="btn variant-filled-primary"
        >Get Started</a
      >
  </div>
  <enhanced:img src={cardPreviewImage} alt="Cards preview" class="rounded-xl" />
</section>
</main>
<footer class="bg-primary-600 rounded-t-xl p-3 flex justify-between shadow-md">
  <h3 class="text-lg md:text-xl font-semibold">Flashcards</h3>
  <p><a href="https://github.com/zafchiel">@zafchiel</a>, {new Date().getFullYear()}</p>
</footer>

<style>
  section {
    perspective: 100vh;
  }
</style>
