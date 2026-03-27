<script lang="ts">
  import Modal from "./Modal.svelte";
  import Button from '$components/Button.svelte'
  import { BUTTON_STYLE } from "$constants";
  import type { IModalText } from "$types";

  let {
    open = $bindable(false),
    title = 'Ошибка',
    text = 'Произошла непредвиденная ошибка.',
    buttonText = 'Закрыть',
    buttonStyle = BUTTON_STYLE.primary,
    buttons: modalButtons
  }: IModalText = $props();

  const closeModal = () => open = false
</script>

<Modal
  bind:open
>
  {#snippet header()}
    <h3>{title}</h3>
  {/snippet}

  <p>{text}</p>

  {#snippet buttons()}
    {#if modalButtons}
      {@render modalButtons()}
    {/if}
    <Button
      title={buttonText}
      {buttonStyle}
      onClick={() => closeModal()}
      elevated
    />
  {/snippet}
</Modal>

<style lang="postcss"></style>