<script lang="ts">
  import TaskCard from "./TaskCard.svelte";
  import { TASK_STATUS } from '$constants'
  import { getTasksByIdStatus } from '$stores/tasks.svelte'
</script>

<div class="backlog">
  <h3>Список задач</h3>
  <div class="backlog__inner">
    {#each getTasksByIdStatus(TASK_STATUS.noStatus.id) as task (task.id)}
      <TaskCard {...task} />
    {/each}
  </div>
</div>

<style>
  .backlog {
    position: relative;
    gap: var(--indent);
    flex-shrink: 0;
    overflow-y: auto;
    scrollbar-color: var(--gray) var(--color-border);
    scrollbar-width: thin;

    h3 {
      text-align: center;
      position: sticky;
      padding: var(--indent);
      top: 0;
      z-index: 1;

      &::after {
        content: '';
        position: absolute;
        inset: 0 0 -1rem 0;
        background: var(--color-white);
        background: linear-gradient(180deg, var(--color-white) 70%, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 100%);
        pointer-events: none;
        z-index: -1;
      }
    }

    &__inner {
      display: flex;
      padding: var(--indent);
      gap: var(--indent);
      flex-direction: column;
    }
  }
</style>