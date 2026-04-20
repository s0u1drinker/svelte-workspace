<script lang="ts">
  import Icon from '@iconify/svelte';
	import DeadlineIndicator from '$components/DeadlineIndicator.svelte';
	import TaskTypeIndicator from '$components/TaskTypeIndicator.svelte';
  import ModalTask from '$components/Modal/ModalTask.svelte';
  import { tasksStore } from '$stores/tasks.svelte'
  import { DATE_FORMATTER, PLACEHOLDER_TEXT, TASK_STATUS_MAP } from '$constants';
  import { groupDataBy, getFormatDate, normalizeISODate, filterGroupedData, sortGroupedDataByGroup } from '$lib/utils';
  import type { IFilter } from '$types';

  let { filters = {} }: { filters: IFilter } = $props();
  let open = $state<boolean>(false)
  let idTask = $state<string>('');
  let tasks = $derived(tasksStore.getTasksByIdStatus(TASK_STATUS_MAP.complete));
  let groupedTasks = $derived(groupDataBy(tasks, 'finished', normalizeISODate));
  let sortedGroupedTasks = $derived(sortGroupedDataByGroup(groupedTasks, 'desc'));
  let filteredTasks = $derived(filterGroupedData(sortedGroupedTasks, filters));

  const openModalTask = (id: string) => {
    if (id) {
      idTask = id;
      open = true;
    }
  }

  const handleKeyboard = (event: KeyboardEvent, id: string) => {
    if (['Space', 'Enter', 'NumpadEnter'].includes(event.code)) {
      event.preventDefault();

      openModalTask(id)
    }
  }
</script>

<div class="f-tasks-list">
  {#if !filteredTasks.size}
    <div class="f-tasks-list__placeholder">
      { !tasks.length ? PLACEHOLDER_TEXT.finishedTasks.noTasks : PLACEHOLDER_TEXT.finishedTasks.noFilteredTasks }
    </div>
  {:else}
    {#each filteredTasks as [isoDate, tasksArray] (`group-${isoDate || 'empty'}`)}
      <div class="f-tasks-list__group">
        <h3 class="f-tasks-list__group-title">
          {getFormatDate(DATE_FORMATTER.textMonth, isoDate)}
        </h3>
        <div class="f-tasks-list__list">
          {#each tasksArray as task (task.id)}
            <div
              class="f-tasks-list__item"
              role="button"
              tabindex="0"
              onclick={() => openModalTask(task.id)}
              onkeydown={(e) => handleKeyboard(e, task.id)}
            >
              <TaskTypeIndicator taskType={task.type} />
              <span class="f-tasks-list__id">{task.idTask}</span>
              <span class="f-tasks-list__subject">{task.subject}</span>
              {#if task.urgent}
                <Icon
                  class="f-tasks-list__icon-urgent"
                  icon="mdi:fire"
                  font-size="1.5rem"
                />
              {/if}
              {#if task.deadline}
                <DeadlineIndicator
                  class="f-tasks-list__deadline"
                  deadline={task.deadline}
                  finished={task.finished}
                />
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  {/if}
</div>

<ModalTask bind:open {idTask} />

<style lang="postcss">
  .f-tasks-list {
    overflow-y: auto;
    scrollbar-color: var(--gray) var(--lightgray);
    scrollbar-width: thin;

    &__placeholder {
      margin-top: 4rem;
      text-align: center;
      color: var(--gray);
      font-style: italic;
    }

    &__group {
      padding: var(--indent);
      transition: background-color var(--transition-base);
      border-radius: var(--radius);

      &:hover {
        background-color: var(--lightgray);
      }
    }

    &__group-title {
      border-bottom: var(--border-bold);
      padding-bottom: var(--indent-half);
    }

    &__list {
      --list-margin: var(--indent-half);

      margin-top: var(--indent);
      display: flex;
      flex-direction: column;
      gap: var(--indent-half);
    }

    &__item {
      display: flex;
      align-items: center;
      gap: var(--indent-half);
      padding: var(--indent-half);
      border-radius: var(--radius);
      border: var(--border);
      overflow: hidden;
      transition:
        box-shadow var(--transition-base),
        background-color var(--transition-base);

      @mixin focus;

      &:hover {
        background-color: var(--color-white);
        box-shadow: var(--shadow-md);
        cursor: pointer;
        user-select: none;

        :global(.f-tasks-list__deadline) {
          transform: translateX(0);
        }
      }
    }

    &__id {
      font-weight: bold;
    }

    &__subject {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    :global(&__icon-urgent) {
      color: var(--color-danger);
    }

    :global(&__deadline) {
      margin-left: auto;
      transform: translateX(120%);
      transition: transform var(--transition-base);
    }
  }
</style>