<script lang="ts">
  import FinishedTasksTools from "./FinishedTasksTools.svelte";
  import FinishedTasksList from "./FinishedTasksList.svelte";

  let searchText = $state('');
  let filters = $derived(searchText ? { searchText } : {});
</script>

<div class="f-tasks">
  <FinishedTasksTools
    bind:searchText={searchText}
  />
  <FinishedTasksList
    {filters}
  />
</div>

<style lang="postcss">
  .f-tasks {
    --f-tasks-padding: var(--indent);

    border: var(--border);
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: var(--f-tasks-padding);
    height: 100%;
    overflow: hidden;
    padding: var(--f-tasks-padding);
  }
</style>