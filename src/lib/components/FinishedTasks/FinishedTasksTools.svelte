<script lang="ts">
  import InputSearch from "$components/Input/InputSearch.svelte";
  import type { ITools } from '$types';

  let { searchText = $bindable('') }: ITools = $props();
</script>

<div class="f-tasks-tools">
  <InputSearch
    placeholder="Идентификатор задачи"
    bind:value={searchText}
  />
</div>

<style lang="postcss">
  .f-tasks-tools {
    display: flex;
    justify-content: flex-end;
    gap: var(--f-tasks-padding);

    :global(.i-search) {
      width: 20rem;
    }
  }
</style>