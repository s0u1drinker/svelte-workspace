<script lang="ts">
  import Icon from '@iconify/svelte';
  import { isDateLater } from '$lib/utils';

  let {class: className = '', showDate = true, deadline, finished}: { class?: string, showDate?: boolean, deadline: string, finished: string } = $props();
  let taskFinishedLater = $derived(isDateLater(deadline, finished));
  let iconName = $derived(taskFinishedLater ? 'mynaui:sad' : 'mynaui:smile');
  let iconClass = $derived(`deadline__icon${taskFinishedLater ? ' deadline__icon_wrong' : ''}`);
  let dateToShow = $derived(showDate ? new Date(deadline).toLocaleDateString() : '');
</script>

<div class={`deadline ${className}`}>
  {dateToShow}
  <Icon
    class={iconClass}
    icon={iconName}
    font-size="1.25rem"
  />
</div>

<style lang="postcss">
  .deadline {
    display: flex;
    align-items: center;
    gap: var(--indent-half);

    &__icon {
      :global(&) {
        color: var(--color-success);
      }

      :global(&_wrong) {
        color: var(--color-danger);
      }
    }

  }
</style>