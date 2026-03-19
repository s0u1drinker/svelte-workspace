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
      width: 1rem;
      height: 1rem;
      color: var(--gray);
      transition: color var(--transition-base), transform var(--transition-base);
      transform-origin: bottom center;
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