<script lang="ts">
  import Main from "./Main.svelte";
  import Toolbar from "./Toolbar.svelte";
</script>

<header>
  <Main />
  <Toolbar />
</header>

<style>
  header {
    display: grid;
    box-shadow: var(--shadow);
  }
</style>
