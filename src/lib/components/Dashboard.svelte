<script lang="ts">
	import TaskList from "$components/TaskList.svelte";
  import { TASK_STATUS } from "$constants";
  import type { TTaskStatusList } from '$types'

  const props: { class: string } = $props();
  const columns: TTaskStatusList = [
    TASK_STATUS.sprint,
    TASK_STATUS.inProgress,
    TASK_STATUS.test
  ]
</script>

<div class="dashboard {props.class}">
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
    width: 80%;
    overflow: hidden;

    :global(.dashboard__column:not(:first-child)) {
      border-left: var(--border);
    }
  }
</style>