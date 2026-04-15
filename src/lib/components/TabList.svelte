<script lang="ts">
  import type { ITabList } from "$types";

  let { tabs = [], selectedTab = $bindable(), name }: ITabList = $props();
</script>

<div
  class="tablist"
  role="tablist"
>
  {#each tabs as tab (`${name}-tab-${tab.id}`)}
    <button
      type="button"
      class="tablist__tab"
      class:tablist__tab_active={selectedTab === tab.id}
      role="tab"
      tabindex={selectedTab === tab.id ? -1 : 0}
      aria-selected={selectedTab === tab.id}
      aria-controls={`${name}-panel-${tab.id}`}
      onclick={() => (selectedTab = tab.id)}
    >
      {tab.title}
    </button>
  {/each}
</div>

<style lang="postcss">
  .tablist {
    --tablist-padding: var(--indent-quarter);

    padding: var(--tablist-padding);
    background: linear-gradient(to right, var(--color-primary-30), var(--color-primary-20));
    border-radius: var(--radius);
    display: flex;
    gap: var(--tablist-padding);

    &__tab {
      padding: var(--indent-half);
      transition: background-color var(--transition-base);
      color: var(--color-text);
      border-radius: 6px;

      @mixin hover {
        background-color: var(--color-white-50);
      }
      
      &_active {
        background-color: var(--color-white);
        pointer-events: none;
      }
    }
  }
</style>