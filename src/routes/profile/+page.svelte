<script lang="ts">
  import { enhance } from "$app/forms";

  export let data;
</script>

<h3 class="h3">Welcome</h3>
<h1 class="h1 font-bold">{data.username}</h1>
<form method="post" action="?/logout">
  <input type="submit" value="Logout" />
</form>
