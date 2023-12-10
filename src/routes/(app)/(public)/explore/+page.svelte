<script lang="ts">
  import type { PageData } from "./$types";
  import DisplayDeckList from "$lib/components/displayDeckList.svelte";

  export let data: PageData;
</script>

<h1 class="h1 p-4">Discover public decks</h1>

<DisplayDeckList decks={data.decks} isPublic={true} />
