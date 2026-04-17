<script lang="ts">
  import { taskTypeStore } from '$stores/taskType.svelte';
  import type { TTaskTypeID } from '$types';

  let { taskType }: { taskType: TTaskTypeID } = $props();
  let color = $derived(taskType && (taskTypeStore.getTypeById(taskType)?.color || 'var(--color-border)'))
</script>

<div class="task-type-indicator" style:--task-type-color={color}></div>

<style lang="postcss">
  .task-type-indicator {
    width: 1rem;
    height: 1rem;
    background-color: var(--task-type-color);
    border-radius: var(--radius-full);
  }
</style>