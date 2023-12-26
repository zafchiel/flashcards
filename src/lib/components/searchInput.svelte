<script>
  import SearchIcon from "$lib/assets/searchIcon.svelte";
  import { enhance } from "$app/forms";
</script>

<form method="POST" action="?/searchDecks" use:enhance>
  <div
    class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
  >
    <div class="input-group-shim">
      <SearchIcon />
    </div>
    <input type="search" name="search" placeholder="Search..." />
    <button class="variant-filled-primary">Submit</button>
  </div>
</form>
