<script lang="ts">
	import DashboardColumn from "./DashboardColumn.svelte";
  import type { TTaskStatus } from '$types'

  const props: { class: string } = $props();
  const columns: TTaskStatus[] = ['sprint', 'inProgress', 'test']
</script>

<div class="dashboard {props.class}">
  {#each columns as column (`column-status-${column}`)}
    <DashboardColumn class="dashboard__column" taskStatus={column} />
  {/each}
</div>

<style lang="postcss">
  .dashboard {
    display: grid;
    border: var(--border);
    border-radius: var(--radius);
    grid-template-columns: repeat(3, 1fr);
    width: 80%;
    overflow: hidden;

    :global(&__column) {

      & + & {
        border-left: var(--border);
      }
    }
  }
</style>