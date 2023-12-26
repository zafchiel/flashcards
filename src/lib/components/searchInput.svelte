<script>
  import SearchIcon from "$lib/assets/searchIcon.svelte";
  import { enhance } from "$app/forms";
  import LoaderIcon from "$lib/assets/loaderIcon.svelte";

  let isFormLoading = false;
</script>

<form
  method="POST"
  action="?/searchDecks"
  use:enhance={() => {
    setTimeout(() => {
      isFormLoading = true;
    }, 300);

    return ({ update }) => {
      isFormLoading = false;
      update();
    };
  }}
>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
    <div class="input-group-shim">
      <SearchIcon />
    </div>
    <input type="search" name="search" placeholder="Search..." />
    <button class="variant-filled-primary" disabled={isFormLoading}>
      {#if isFormLoading}
        <span class="animate-spin">
          <!-- ⏳ -->
          <LoaderIcon />
        </span>
      {:else}
        Submit
      {/if}
    </button>
  </div>
</form>
