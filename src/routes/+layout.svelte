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
    flex-direction: column;
    height: 100%;
  }
</style>
