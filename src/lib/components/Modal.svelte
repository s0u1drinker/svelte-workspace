<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { IModal } from '$types'

  let {
    open = $bindable(false),
    header,
    children,
    buttons,
    onClose,
    closable = true,
  }: IModal = $props();

  let dialogEl: HTMLDialogElement | null = null;

  $effect(() => {
    if (!dialogEl) return;

    if (open) {
      if (!dialogEl.open) {
        dialogEl.showModal();
      }
    } else {
      if (dialogEl.open) {
        dialogEl.close();
      }
    }
  });

  /** Обработчик закрытия окна. */
  function handleClose() {
    if (open) {
      open = false;
    }

    onClose?.();
  }

  /**
   * Обработчик клика.
   * Клик по фону закрывает модальное окно.
  */
  function handleClick(event: MouseEvent) {
    if (event.target === dialogEl) {
      open = false;
    }
  }
</script>

<dialog
  bind:this={dialogEl}
  class="modal"
  onclose={handleClose}
  onclick={handleClick}
>
  <div class="modal__content">
    {#if closable}
      <button
        type="button"
        class="modal__close"
        aria-label="Закрыть"
        onclick={handleClose}
      >
        <Icon icon="mdi:close" />
      </button>
    {/if}
    {#if header}
      <div class="modal__header">
        {@render header()}
      </div>
    {/if}
    {#if children}
      <div class="modal__body">
        {@render children()}
      </div>
    {/if}
    {#if buttons}
      <div class="modal__buttons">
        {@render buttons()}
      </div>
    {/if}
  </div>
</dialog>

<style lang="postcss">
  .modal {
    top: 50%;
    left: 50%;
    width: 30rem;
    border: var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    transition:
      display .6s allow-discrete,
      overlay .6s allow-discrete;
    animation: closeModal .6s forwards;

    &[open] {
      animation: openModal 1s forwards;

      &::backdrop {
        animation: fadeIn .6s forwards;
      }
    }

    &::backdrop {
      background: rgba(0, 0, 0, 0.25);
      backdrop-filter: var(--filter-blur);
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--indent);
      padding: var(--indent);
      position: relative;
    }

    &__close {
      position: absolute;
      top: var(--indent-half);
      right: var(--indent-half);
      background-color: var(--color-border);
      padding: var(--indent-quarter);
      border-radius: var(--radius-full);
      transition: background-color var(--transition-base);

      &:hover {
        background-color: var(--gray);
      }
    }

    &__header {
      text-align: center;
      padding: 0 var(--indent);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes openModal {
    from {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes closeModal {
    from {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, 0);
    }
  }
</style>