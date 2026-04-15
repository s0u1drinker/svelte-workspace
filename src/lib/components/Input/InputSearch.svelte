<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IInputSearch } from "$types";

  let { value = $bindable(), placeholder = '' }: IInputSearch = $props();

  let showClearButton = $derived(!!value.length)

  const clear = () => value = ''
</script>

<div class="i-search">
  <input
    class="i-search__input"
    type="text"
    {placeholder}
    bind:value={value}
  >
  {#if showClearButton}
    <button
      class="i-search__button i-search__button_clear"
      aria-label="Очистить"
      onclick={clear}
    >
      <Icon
        class="i-search__icon"
        icon="mdi:clear"
        aria-hidden="true"
      />
    </button>
  {/if}
  <button
    class="i-search__button i-search__button_search"
  >
    Поиск
  </button>
</div>

<style lang="postcss">
  .i-search {
    display: flex;
    border-radius: var(--radius);
    border: var(--border);
    padding: var(--indent-quarter);
    gap: var(--indent-quarter);

    &:focus-within {
      --border-color: var(--color-primary);

      border-color: var(--border-color);
      box-shadow:
        0 0 0 2px var(--color-white),
        0 0 0 4px var(--border-color);
    }

    &__input {
      flex-grow: 1;
      
      &:focus-visible {
        box-shadow: none;
      }
    }

    &__button {
      padding: var(--indent-half);

      &_clear {
        :global(.i-search__icon) {
          color: var(--color-danger);
          transition: color var(--transition-base);
        }

        &:hover {
          :global(.i-search__icon) {
            color: var(--color-warning);
          }
        }
      }

      &_search {
        background-color: var(--color-border);
        border-radius: var(--indent-quarter);

        &:hover {
          background-color: var(--gray);
        }
      }
    }
  }
</style>