<script lang="ts">
  import { TASK_TYPE } from '$constants';
  import type { TTaskType } from '$types';

  let { taskType }: { taskType: TTaskType } = $props();
  let color = $derived(taskType ? TASK_TYPE[taskType].color : 'var(--color-border)')
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