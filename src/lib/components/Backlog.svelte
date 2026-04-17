<script lang="ts">
  import TaskList from "./TaskList.svelte";
  import { taskStatusStore } from "$stores/taskStatus.svelte";
</script>

<div class="backlog">
  <TaskList
    listTitle="Список задач"
    idStatus={taskStatusStore.getStatusForKey('noStatus')?.id}
    noDataText="Нет задач"
    titleStyle="blur"
  />
</div>

<style lang="postcss">
  .backlog {
    flex-shrink: 0;
    width: 24rem;
  }
</style>