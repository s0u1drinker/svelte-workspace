<script lang="ts">
  import TaskCard from "./TaskCard.svelte";
  import { tasks } from '$stores/tasksStore'
</script>

<div class="backlog">
  <h3>Список задач</h3>
  <div class="backlog__inner">
    {#each $tasks as task (task.id)}
      <TaskCard {...task} />
    {/each}
  </div>
</div>

<style>
  .backlog {
    padding: var(--indent);
    height: 17rem;
    display: flex;
    flex-direction: column;
    gap: var(--indent);
    overflow-x: auto;

    &__inner {
      display: flex;
      gap: var(--indent);
      width: fit-content;
    }
  }
</style>