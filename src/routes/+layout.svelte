<script lang="ts">
  import Header from '$components/Header/Header.svelte';
  import '../app.css';
</script>

<Header />

<main>
  <slot />
</main>

<style lang="postcss">
  :root {
    --header-height: 7.25rem;
  }

  main {
    display: flex;

    @media(--viewport-lg) {
      height: calc(100vh - var(--header-height));
    }
  }
</style>
