<script lang="ts">
  import Logo from "../Logo.svelte";
  import ProjectSelector from "./ProjectSelector.svelte";
  import UserPanel from "./UserPanel.svelte";
</script>

<div class="main">
  <Logo />
  <ProjectSelector />
  <UserPanel />
</div>

<style lang="postcss">
  .main {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    align-items: center;
    justify-items: stretch;
    padding: var(--indent-half);

    @media (--viewport-xl) {
      padding: var(--indent-half) var(--indent);
    }
  }
</style>