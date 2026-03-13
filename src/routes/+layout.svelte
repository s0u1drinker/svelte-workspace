<script lang="ts">
  import Header from '$components/Header/Header.svelte';
  import '../app.css';
</script>

<Header />

<main>
  <slot />
</main>

<style lang="postcss">
  main {
    display: flex;

    @media(--viewport-lg) {
      height: calc(100vh - 6.25rem);
    }
  }
</style>
