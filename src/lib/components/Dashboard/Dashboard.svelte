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
    grid-template-columns: repeat(3, 1fr);
    width: 80%;
    overflow: hidden;

    :global(&__column) {
      
      &:first-child {
        border-top-left-radius: var(--radius);
        border-bottom-left-radius: var(--radius);
      }

      &:last-child {
        border-top-right-radius: var(--radius);
        border-bottom-right-radius: var(--radius);
      }

      & + & {
        border-left: 0 none;
      }
    }
  }
</style>