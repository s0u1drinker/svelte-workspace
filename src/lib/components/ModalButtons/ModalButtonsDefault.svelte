<script lang="ts">
  import Button from "$components/Button.svelte";
  import { TASK_BUTTONS, BUTTON_STYLE, TASK_STATUS_MAP } from "$constants";
  import type { IModalButtonsDefault, TTaskModalButtons } from '$types';

  let { taskStatus, disabled = false, onClose, onChangeStatus, onDelete, onComplete }: IModalButtonsDefault = $props();

  let modalButtons = $state<TTaskModalButtons>({
    add: {
      title: TASK_BUTTONS.add,
      statusToShow: [TASK_STATUS_MAP.noStatus],
      onClick: () => onChangeStatus(TASK_STATUS_MAP.sprint)
    },
    take: {
      title: TASK_BUTTONS.take,
      statusToShow: [TASK_STATUS_MAP.sprint],
      onClick: () => onChangeStatus(TASK_STATUS_MAP.inProgress)
    },
    delete: {
      title: TASK_BUTTONS.delete,
      buttonStyle: BUTTON_STYLE.danger,
      statusToShow: [TASK_STATUS_MAP.noStatus],
      onClick: () => onDelete()
    },
    toBacklog: {
      title: TASK_BUTTONS.toBacklog,
      buttonStyle: BUTTON_STYLE.danger,
      statusToShow: [TASK_STATUS_MAP.sprint],
      onClick: () => onChangeStatus(TASK_STATUS_MAP.noStatus)
    },
    test: {
      title: TASK_BUTTONS.test,
      statusToShow: [TASK_STATUS_MAP.inProgress],
      onClick: () => onChangeStatus(TASK_STATUS_MAP.test)
    },
    return: {
      title: TASK_BUTTONS.return,
      buttonStyle: BUTTON_STYLE.danger,
      statusToShow: [TASK_STATUS_MAP.test],
      onClick: () => onChangeStatus(TASK_STATUS_MAP.inProgress)
    },
    done: {
      title: TASK_BUTTONS.done,
      buttonStyle: BUTTON_STYLE.success,
      statusToShow: [TASK_STATUS_MAP.test],
      onClick: () => onComplete()
    },
    close: {
      title: TASK_BUTTONS.close,
      buttonStyle: BUTTON_STYLE.gray,
      onClick: () => onClose()
    },
  });
</script>

{#each Object.entries(modalButtons) as [key, button] (`modal-button-${key}`)}
  {#if !button?.statusToShow || button.statusToShow.includes(taskStatus)}
    <Button
      {...button}
      elevated
      {disabled}
    />
  {/if}
{/each}

<style lang="postcss"></style>