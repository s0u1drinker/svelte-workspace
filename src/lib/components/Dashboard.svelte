<script lang="ts">
	import TaskList from "$components/TaskList.svelte";
  import Icon from "@iconify/svelte";
  import { taskStatusStore } from "$stores/taskStatus.svelte";

  let props: { class: string } = $props();
  let columns = $derived([
    taskStatusStore.getStatusForKey('sprint'),
    taskStatusStore.getStatusForKey('inProgress'),
    taskStatusStore.getStatusForKey('test'),
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
    <Icon
      class="dashboard__placeholder"
      icon="carbon:workspace"
    />
  {/if}
</div>

<style lang="postcss">
  .dashboard {
    display: grid;
    border: var(--border);
    border-radius: var(--radius);
    grid-template-columns: repeat(3, 1fr);
    width: 80%;
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
      font-size: 15rem;
      color: var(--lightgray);
    }
  }
</style>