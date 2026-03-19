<script lang="ts">
	import Icon from "@iconify/svelte";
  import { projectsStore } from "$stores/projects.svelte";
  import type { TProjectID } from '$types'

  const { onclick: closeModal } = $props()
  const projectList = $derived(Object.values(projectsStore.projects))
  /** Выбирает текущий проект. */
  const changeCurrentProject = (id: TProjectID): undefined => {
    const result: boolean = projectsStore.setCurrentProject(id)

    if (!result) {
      console.error(`Не удалось выбрать проект с идентификтаором: ${id}`)
    } else {
      closeModal()
    }
  }
</script>

<div class="p-list">
  {#each projectList as project (project.id)}
    <button
      type="button"
      class="p-list__item"
      onclick={() => changeCurrentProject(project.id)}
      disabled={project.id === projectsStore.currentProjectID}
    >
      <div class="p-list__header">
        <Icon class="p-list__logo" icon={project.icon} />
        <h3 class="p-list__title">{project.name}</h3>
      </div>
      <div class="p-list__descr">{project.description}</div>
    </button>
  {/each}
</div>

<style lang="postcss">
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  .p-list {
    --angle: 0deg;
    --icon-size: 2rem;
    --header-gap: var(--indent);

    display: flex;
    flex-direction: column;
    gap: var(--indent-half);

    &__item {
      --item-border: linear-gradient(to bottom, var(--color-border));

      display: block;
      padding: var(--indent);
      border-radius: var(--radius);
      border: 2px solid transparent;
      background:
        linear-gradient(
          to bottom,
          var(--color-white)
        )
        padding-box,
        var(--item-border)
        border-box;
      animation: spin 2.5s infinite linear;
      animation-play-state: paused;
      
      &:hover:not([disabled]) {
        --item-border: conic-gradient(
          from var(--angle),
          var(--color-border) 20%,
          var(--gray) 30%,
          var(--color-border) 40%,
          var(--color-border) 70%,
          var(--gray) 80%,
          var(--color-border) 90%
        );
        animation-play-state: running;
      }

      &[disabled] {
        background: var(--color-border);
        
        &:hover {
          cursor: not-allowed;
        }
      }
    }

    &__header {
      display: flex;
      align-items: center;
      gap: var(--header-gap);
    }

    :global(&__logo) {
      width: var(--icon-size);
      height: var(--icon-size);
    }

    &__descr {
      margin-top: var(--indent-half);
      padding-left: calc(var(--icon-size) + var(--header-gap));
      text-align: left;
    }
  }

  @keyframes spin {
    to {
      --angle: 360deg;
    }
  }
</style>