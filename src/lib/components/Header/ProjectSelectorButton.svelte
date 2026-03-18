<script lang="ts">
  import { PROJECT_TEXT } from "$constants";
  import Modal from "$components/Modal.svelte";
  import { currentProjectName } from '$stores/projectsStore';

  let projectNotSelected = $state(!$currentProjectName)
  let open = $state(false);
</script>

<button
  class="p-selector-button"
  class:p-selector-button_no-select={projectNotSelected}
  onclick={() => (open = true)}
>{ $currentProjectName || PROJECT_TEXT.selectProject }</button>

<Modal
  bind:open
>
  {#snippet header()}
    <h3>Модальное окно</h3>
  {/snippet}

  <p>Пример модального окна.</p>
</Modal>

<style lang="postcss">
  .p-selector-button {
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0 .5rem;

    &::before,
    &::after {
      position: absolute;
      width: 1rem;
      height: 1rem;
      color: var(--gray);
      transition: color var(--transition-base);
    }

    &::before {
      content: "<";
      left: -1rem;
      top: 0;
    }

    &::after {
      content: ">";
      right: -1rem;
      top: 0;
    }

    &:hover {

      &::before,
      &::after {
        color: var(--color-primary);
      }
    }

    &:focus-visible {

      &::before,
      &::after {
        opacity: 0;
      }
    }

    &_no-select {
      color: var(--color-danger);
    }
  }
</style>