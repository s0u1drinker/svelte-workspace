<script lang="ts">
  import Dashboard from './Dashboard/Dashboard.svelte'
</script>

<div class="workspace">
  <h3>Доска с задачами</h3>
  <Dashboard
    class="workspace__dashboard"
  />
</div>

<style lang="postcss">
  .workspace {
    padding: var(--indent);
    border-left: var(--border);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;

    :global(&__dashboard) {
      flex-grow: 1;
    }
  }
</style>