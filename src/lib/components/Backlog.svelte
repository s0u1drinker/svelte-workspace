<script lang="ts">
  import TaskList from "./TaskList.svelte";
</script>

<div class="backlog">
  <TaskList
    listTitle="Список задач"
    idStatus="noStatus"
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