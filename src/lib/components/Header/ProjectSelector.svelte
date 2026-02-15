<script lang="ts">
  import ProjectSelectorButton from "./ProjectSelectorButton.svelte";
  import { currentProjectName } from '$lib/stores/projectsStore';
  import { PROJECT_TEXT } from "$lib/constants";
</script>

<div class="p-selector">
  {#if $currentProjectName}
    <span class="p-selector__title">{ PROJECT_TEXT.title }</span>
  {/if}
  <ProjectSelectorButton />
</div>

<style lang="postcss">
  .p-selector {
    display: flex;
    flex-direction: column;
    gap: var(--indent-half);
    align-items: center;

    &__title {
      color: var(--gray);
      font-size: var(--indent-three-quarters);
    }
  }
</style>