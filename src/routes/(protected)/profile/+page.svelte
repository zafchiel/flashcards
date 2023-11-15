<script lang="ts">
  import { enhance } from "$app/forms";
  export let data;
</script>

<div class="flex items-center justify-between mb-10">
  <h1 class="h1">Profile page</h1>
  <form method="post" action="?/logout" use:enhance>
    <button class="btn md:btn-lg variant-filled-secondary">Log-out</button>
  </form>
</div>
<div class="flex items-center">
  <img src={data.user?.avatar} alt="User profile" width="64" height="64" />
  <div
    class="font-bold border-t border-r border-b self-stretch rounded-r-sm p-3"
  >
    <p class="text-3xl break-words">
      {data.user?.username}
    </p>
  </div>
</div>
