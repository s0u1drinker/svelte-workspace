<script lang="ts">
	import TaskList from "$components/TaskList.svelte";
  import { TASK_STATUS } from "$constants";
  import type { TTaskStatusList } from '$types'

  const { class: className = '' } = $props<{ class?: string }>();
  const columns: TTaskStatusList = [
    TASK_STATUS.sprint,
    TASK_STATUS.inProgress,
    TASK_STATUS.test
  ]
</script>

<div class={`dashboard ${className}`}>
  {#each columns as column (`column-status-${column.id}`)}
    <TaskList
      class="dashboard__column"
      listTitle={column.title}
      idStatus={column.id}
      minimizeCard={true}
    />
  {/each}
</div>

<style lang="postcss">
  .dashboard {
    display: grid;
    border: var(--border);
    border-radius: var(--radius);
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
    overflow: hidden;

    :global(.dashboard__column:not(:first-child)) {
      border-left: var(--border);
    }
  }
</style>