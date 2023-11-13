<script lang="ts">
  import { enhance } from "$app/forms";

  const focusInput = (e: HTMLInputElement) => {
    e.focus();
  };
</script>

<section class="flex flex-col justify-center items-center h-full">
  <div class="variant-soft card p-4">
    <h1 class="h1 card-header mb-4">Sign in</h1>
    <form method="post" use:enhance>
      <div class="flex flex-col gap-3 border-t pt-4">
        <div>
          <label for="username" class="label">Username</label>
          <input
            use:focusInput
            name="username"
            id="username"
            placeholder="username"
            class="input"
          />
        </div>

        <div>
          <label for="password" class="label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*****"
            class="input"
          />
        </div>

        <button class="btn variant-filled">Login</button>
        <p class="text-sm">
          Don't have account? <a
            href="/signup"
            class="anchor text-secondary-700">sign-up instead</a
          >
        </p>
      </div>
    </form>
  </div>
</section>
