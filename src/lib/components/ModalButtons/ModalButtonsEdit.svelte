<script lang="ts">
  import Button from "$components/Button.svelte";
  import { BUTTON_STYLE, TASK_BUTTONS } from "$constants";
  import type { TTaskModalButtons, IModalButtonsEdit } from "$types";

  let { disabled = false, onSave, onCancel }: IModalButtonsEdit = $props();

  let modalButtons = $state<TTaskModalButtons>({
    save: {
      title: TASK_BUTTONS.save,
      buttonStyle: BUTTON_STYLE.primary,
      onClick: () => onSave()
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