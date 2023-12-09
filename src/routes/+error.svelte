<script lang="ts">
  import { page } from "$app/stores";
</script>

<main class="p-3 md:p-10 text-center">
  <section class="flex flex-col items-center gap-3">
    <h1 class="h1">Ops, something went wrong.</h1>
    <h2 class="h2">You shouldn't be here</h2>
    <div style="font-size:100px; line-height: 100px">&#128561;</div>
    <h3 class="h3 opacity-60">{$page.status}: {$page.error?.message}</h3>
    <a href="/" class="btn btn-xl variant-filled-error">Take me home</a>
  </section>
</main>
