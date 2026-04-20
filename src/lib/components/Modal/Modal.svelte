<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { IModal } from '$types'

  let {
    open = $bindable(false),
    header,
    children,
    message,
    buttons,
    onClose,
    showCloseButton = true,
    class: className = '',
    position = 'center',
    messageColor = '',
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
  class="modal modal_{position}{className && ` ${className}`}"
  onclose={handleClose}
  onclick={handleClick}
>
  <div class="modal__content">
    {#if showCloseButton}
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
    {#if message}
      <div class="modal__message" style:color={messageColor}>
        {@render message()}
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
      animation: fadeOut 1s forwards;
    }

    &_center {
      --open-modal-from: translate(-50%, -100%);
      --open-modal: translate(-50%, -50%);
      --close-modal-to: translate(-50%, 0);
      
      top: 50%;
      left: 50%;

      .modal__content {
        padding: var(--indent);
      }

      .modal__header {
        text-align: center;
        padding: 0 var(--indent);
      }
    }

    &_left {
      --open-modal-from: translate(-50%, -50%);
      --open-modal: translate(0, -50%);
      --close-modal-to: translate(-50%, -50%);

      top: 50%;
      height: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      & > .modal__content {
        padding: var(--indent-double);
      }

      & .modal__body {
        flex: 1;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--indent);
      position: relative;
      height: 100%;
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

    &__message {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--indent-half);
      color: var(--color-text-secondary);
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--indent);
      justify-content: center;
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

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes openModal {
    from {
      opacity: 0;
      transform: var(--open-modal-from);
    }
    to {
      opacity: 1;
      transform: var(--open-modal);
    }
  }

  @keyframes closeModal {
    from {
      opacity: 1;
      transform: var(--open-modal);
    }
    to {
      opacity: 0;
      transform: var(--close-modal-to);
    }
  }
</style>