<script lang="ts">
  import Header from '$components/Header/Header.svelte';
  import MediaQueryPlaceholder from '$components/MediaQueryPlaceholder.svelte';
  import '../app.css';
</script>

<Header />

<main>
  <slot />
</main>

<MediaQueryPlaceholder />

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

  @media (--viewport-xl) {

  }
</style>
