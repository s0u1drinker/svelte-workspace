<script lang="ts">
	import IconCustom from "$components/IconCustom.svelte";
	import TaskList from "$components/TaskList.svelte";
  import { taskStatusStore } from "$stores/taskStatus.svelte";
  import { TASK_STATUS_MAP } from "$constants";

  let props: { class: string } = $props();
  let columns = $derived([
    taskStatusStore.statuses[TASK_STATUS_MAP.sprint],
    taskStatusStore.statuses[TASK_STATUS_MAP.inProgress],
    taskStatusStore.statuses[TASK_STATUS_MAP.test],
  ]);
  let isColumnsDataSet = $derived(columns.every((column) => !!column?.id));
</script>

<div class="dashboard {props.class}">
  {#if isColumnsDataSet}
    {#each columns as column (`column-status-${column?.id}`)}
      <TaskList
        class="dashboard__column"
        listTitle={column?.title || ''}
        idStatus={column?.id}
        minimizeCard={true}
      />
    {/each}
  {:else}
    <IconCustom
      class="dashboard__placeholder"
      icon-name="workspace"
      aria-hidden="true"
    />
  {/if}
</div>

<style lang="postcss">
  .dashboard {
    display: grid;
    border: var(--border);
    border-radius: var(--radius);
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
    overflow: hidden;
    position: relative;

    :global(.dashboard__column:not(:first-child)) {
      border-left: var(--border);
    }

    :global(&__placeholder) {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 25rem;
      height: 25rem;
      color: var(--lightgray);
    }
  }
</style>