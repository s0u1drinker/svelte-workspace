<script lang="ts">
  import icon from '$lib/assets/favicon.svg?url';
</script>

<a
  class="logo"
  href="https://github.com/s0u1drinker/svelte-workspace"
  target="_blank"
  rel="noopener noreferrer"
>
  <img class="logo__svg" src="{icon}" alt="">
  <span>velte Workspace</span>
</a>

<style lang="postcss">
  .logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    width: fit-content;
    font-weight: 500;
    color: var(--color-text);
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-svelte);
    }

    &__svg {
      width: 1.5rem;
    }
  }
</style>