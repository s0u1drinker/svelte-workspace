<script lang="ts">
  import ProjectSelectorButton from "./ProjectSelectorButton.svelte";
  import { projectsStore } from '$stores/projects.svelte';
  import { PROJECT_TEXT } from "$lib/constants";
</script>

<div class="p-selector">
  {#if projectsStore.currentProjectID}
    <span class="p-selector__title">{ PROJECT_TEXT.title }</span>
  {/if}
  <ProjectSelectorButton />
</div>

<style lang="postcss">
  .p-selector {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
      color: var(--gray);
      font-size: var(--indent-three-quarters);
    }
  }
</style>