<script>
  import SearchIcon from "$lib/assets/searchIcon.svelte";
</script>


  <form method="GET">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
      <div class="input-group-shim">
        <SearchIcon />
      </div>
      <input type="search" name="q" placeholder="Search..." />
      <button class="variant-filled-secondary">
        Submit
      </button>
    </div>
  </form>
