<script lang="ts">
  import TaskCard from "$components/TaskCard.svelte";
  import { TASK_STATUS } from '$constants'
  import { getTasksByIdStatus } from '$stores/tasks.svelte'
  import type { IDashboardColumn } from '$types';

  const props: IDashboardColumn = $props();
  const tasks = getTasksByIdStatus(TASK_STATUS[props.taskStatus].id)
</script>

<div class="d-column {props.class}">
  <div class="d-column__title">{ TASK_STATUS[props.taskStatus].title }</div>
  <div class="d-column__tasks">
    {#if tasks.length}
      {#each tasks as task (task.id)}
        <TaskCard minimize {...task} />
      {/each}
    {:else}
      <div class="d-column__no-data">Нет задач</div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .d-column {
    --padding: var(--indent);

    border: var(--border);
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

    &__no-data {
      color: var(--gray);
      text-align: center;
      font-style: italic;
    }
  }
</style>