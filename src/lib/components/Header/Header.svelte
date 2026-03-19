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
    grid-template-rows: 1fr auto;
    box-shadow: var(--shadow);
    z-index: 10;

    @media(--viewport-lg) {
      height: var(--header-height);
    }
  }
</style>
