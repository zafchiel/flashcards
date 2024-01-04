<script>
  import SearchIcon from "$lib/assets/searchIcon.svelte";
</script>


  <form method="GET">
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      <input type="search" name="q" placeholder="Search..." />
      <button class="variant-filled-secondary">
        <SearchIcon />
      </button>
    </div>
  </form>
