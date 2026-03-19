<script lang="ts">
  import TaskCard from "$components/TaskCard.svelte";
  import NoDataText from "$components/NoDataText.svelte";
  import { TASK_STATUS } from '$constants'
  import { getTasksByIdStatus } from '$stores/tasks.svelte'
  import type { IDashboardColumn } from '$types';

  const props: IDashboardColumn = $props();
  const tasks = $derived(getTasksByIdStatus(TASK_STATUS[props.taskStatus].id));
</script>

<div class="d-column {props.class}">
  <div class="d-column__title">{ TASK_STATUS[props.taskStatus].title }</div>
  <div class="d-column__tasks">
    {#if tasks.length}
      {#each tasks as task (task.id)}
        <TaskCard minimize {...task} />
      {/each}
    {:else}
      <NoDataText />
    {/if}
  </div>
</div>

<style lang="postcss">
  .d-column {
    --padding: var(--indent);

    overflow-y: auto;
    scrollbar-color: var(--gray) var(--color-border);
    scrollbar-width: thin;
    
    &__title {
      font-weight: bold;
      text-align: center;
      padding: var(--padding);
      border-bottom: var(--border);
      position: sticky;
      top: 0;
      background-color: var(--color-white);
      z-index: 1;
    }

    &__tasks {
      display: flex;
      flex-direction: column;
      gap: var(--indent);
      padding: var(--padding);
    }
  }
</style>