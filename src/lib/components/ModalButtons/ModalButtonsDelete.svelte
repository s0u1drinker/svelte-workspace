<script lang="ts">
  import Button from "$components/Button.svelte";
  import { BUTTON_STYLE, TASK_BUTTONS } from "$constants";
  import type { TTaskModalButtons, IModalButtonsDelete } from "$types";

  let { disabled = false, onDelete, onCancel }: IModalButtonsDelete = $props();

  let modalButtons = $state<TTaskModalButtons>({
    delete: {
      title: TASK_BUTTONS.delete,
      buttonStyle: BUTTON_STYLE.danger,
      onClick: () => onDelete()
    },
    cancel: {
      title: TASK_BUTTONS.cancel,
      buttonStyle: BUTTON_STYLE.gray,
      onClick: () => onCancel()
    }
  })
</script>

{#each Object.entries(modalButtons) as [key, button] (`modal-button-${key}`)}
  <Button
    {...button}
    elevated
    {disabled}
  />
{/each}

<style lang="postcss"></style>