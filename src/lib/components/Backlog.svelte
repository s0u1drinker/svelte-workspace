<script lang="ts">
  import TaskList from "./TaskList.svelte";
  import { TASK_STATUS_MAP } from "$constants";
</script>

<div class="backlog">
  <TaskList
    listTitle="Список задач"
    idStatus={TASK_STATUS_MAP.noStatus}
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