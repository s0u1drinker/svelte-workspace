<script lang="ts">
  import { PROJECT_TEXT } from "$constants";
  import ModalProjects from "$components/Modal/ModalProjects.svelte";
  import { projectsStore } from '$stores/projects.svelte';

  let buttonText = $derived(projectsStore.currentProjectName || PROJECT_TEXT.selectProject)
  let open = $state<boolean>(false)
</script>

<button
  class="p-selector-button"
  class:p-selector-button_no-select={!open && !projectsStore.isProjectSelected}
  onclick={() => (open = true)}
>{ buttonText }</button>

<ModalProjects bind:open />

<style lang="postcss">
  .p-selector-button {
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0 .5rem;

    &::before,
    &::after {
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      color: var(--gray);
      transition: color var(--transition-base), transform var(--transition-base);
    }

    &::before {
      content: "";
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M18.41 7.41L17 6l-6 6l6 6l1.41-1.41L13.83 12zm-6 0L11 6l-6 6l6 6l1.41-1.41L7.83 12z'/%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      background-color: currentColor;
      left: -1rem;
      top: 10%;
    }

    &::after {
      content: "";
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M5.59 7.41L7 6l6 6l-6 6l-1.41-1.41L10.17 12zm6 0L13 6l6 6l-6 6l-1.41-1.41L16.17 12z'/%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      background-color: currentColor;
      right: -1rem;
      top: 10%;
    }

    &:hover {

      &::before,
      &::after {
        color: var(--color-primary);
      }
    }

    &_no-select {
      color: var(--color-danger);

      &::before {
        animation: rotate-before 1s linear 1s forwards, move-before 1.5s linear 2s forwards infinite;
      }

      &::after {
        animation: rotate-after 1s linear 1s forwards, move-after 1.5s linear 2s forwards infinite;
      }
    }
  }

  @keyframes rotate-before {
    100% {
      rotate: .5turn;
    }
  }

  @keyframes rotate-after {
    100% {
      rotate: -.5turn;
    }
  }

  @keyframes move-before {
    12.5% {
      transform: translateX(1rem);
    }
    25%, 50%, 100% {
      transform: translateX(0);
    }
    32.5% {
      transform: translateX(.5rem);
    }
  }

  @keyframes move-after {
    12.5% {
      transform: translateX(-1rem);
    }
    25%, 50%, 100% {
      transform: translateX(0);
    }
    32.5% {
      transform: translateX(-.5rem);
    }
  }
</style>