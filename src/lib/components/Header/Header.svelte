<script lang="ts">
  import Main from "./Main.svelte";
  import Toolbar from "./Toolbar.svelte";
</script>

<header>
  <Main />
  <Toolbar />
</header>

<style lang="postcss">
  header {
    display: grid;
    box-shadow: var(--shadow);
    flex: 1 0 auto;

    @media(--viewport-lg) {
      height: 6.25rem;
    }
  }
</style>
