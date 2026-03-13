<script lang="ts">
	import DashboardColumn from "./DashboardColumn.svelte";

  const props: { class: string } = $props();
  const columns: { idTaskStatus: number, title: string }[] = [
    {
      idTaskStatus: 1,
      title: 'Спринт',
    },
    {
      idTaskStatus: 2,
      title: 'В работе',
    },
    {
      idTaskStatus: 3,
      title: 'Тестирование',
    },
  ]
</script>

<div class="dashboard {props.class}">
  {#each columns as column (`column-status-${column.idTaskStatus}`)}
    <DashboardColumn class="dashboard__column" {...column} />
  {/each}
</div>

<style lang="postcss">
  .dashboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 80%;

    :global(&__column) {
      
      &:first-child {
        border-top-left-radius: var(--radius);
        border-bottom-left-radius: var(--radius);
      }

      &:last-child {
        border-top-right-radius: var(--radius);
        border-bottom-right-radius: var(--radius);
      }

      & + & {
        border-left: 0 none;
      }
    }
  }
</style>