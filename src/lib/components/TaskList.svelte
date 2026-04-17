<script lang="ts">
  import TaskCard from "$components/TaskCard.svelte";
  import ModalTask from "./Modal/ModalTask.svelte";
  import NoDataText from "./NoDataText.svelte";
  import { tasksStore } from '$stores/tasks.svelte'
  import type { ITaskList } from '$types';

  const { titleStyle = 'border', ...props }: ITaskList = $props();
  const tasks = $derived(props.idStatus ? tasksStore.getTasksByIdStatus(props.idStatus) : []);

  let open = $state<boolean>(false)
  let idTask = $state<string>('');

  const openModalTask = (id: string) => {
    if (id) {
      idTask = id;
      open = true;
    }
  }
</script>

<div class={['task-list', props?.class]}>
  <div
    class={["task-list__title", `task-list__title_${titleStyle}`]}
  >{props.listTitle}</div>
  <div class="task-list__tasks">
    {#if tasks.length}
      {#each tasks as task (task.id)}
        <TaskCard
          {...task}
          minimize={props?.minimizeCard || false}
          onclick={() => openModalTask(task.id)}
        />
      {/each}
    {:else}
      <NoDataText text={props?.noDataText} />
    {/if}
  </div>
</div>

{#if idTask}
  <ModalTask bind:open {idTask} />
{/if}

<style lang="postcss">
  .task-list {
    --padding: var(--indent);

    position: relative;
    overflow-y: auto;
    scrollbar-color: var(--gray) var(--lightgray);
    scrollbar-width: thin;
    height: 100%;

    &__title {
      font-weight: bold;
      text-align: center;
      padding: var(--padding);
      position: sticky;
      top: 0;
      background-color: var(--color-white);
      z-index: 1;

      &_blur {
        &::after {
          content: '';
          position: absolute;
          inset: 0 0 -1rem 0;
          background: var(--color-white);
          background:
            linear-gradient(
              180deg,
              var(--color-white) 85%,
              rgba(255, 255, 255, 0) 100%
            );
          pointer-events: none;
          z-index: -1;
        }
      }

      &_border {
        border-bottom: var(--border);
      }
    }

    &__tasks {
      display: flex;
      padding: var(--padding);
      gap: var(--indent);
      flex-direction: column;
    }
  }
</style>