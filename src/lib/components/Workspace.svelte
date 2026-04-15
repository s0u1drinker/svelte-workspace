<script lang="ts">
  import Dashboard from './Dashboard.svelte'
  import FinishedTasks from './FinishedTasks/FinishedTasks.svelte';
	import TabList from './TabList.svelte';
  import { createTabID } from '$types';
  import type { ITabListItem, TTabListItemID } from "$types";

  type TWorkspaceTabComponent = typeof Dashboard | typeof FinishedTasks;

  const tabs: ITabListItem[] = [
    {
      id: createTabID(0),
      title: 'Доска с задачами'
    },
    {
      id: createTabID(1),
      title: 'Завершённые'
    }  
  ]
  const tabsComponents = new Map<TTabListItemID, TWorkspaceTabComponent>([
    [tabs[0].id, Dashboard],
    [tabs[1].id, FinishedTasks]
  ]);

  let selectedTab = $state(createTabID(0));
  let ActiveComponent = $derived<TWorkspaceTabComponent | undefined>(tabsComponents.get(selectedTab));
</script>

<div class="workspace">
  <TabList
    name="workspace-tabs"
    {tabs}
    bind:selectedTab
  />

  <div
    class="workspace__tab"
    role="tabpanel"
  >
    {#if ActiveComponent}
      <ActiveComponent />
    {/if}
  </div>
</div>

<style lang="postcss">
  .workspace {
    padding: var(--indent);
    border-left: var(--border);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    &__tab {
      width: 80%;
      height: 100%;
      overflow: hidden;
    }
  }
</style>