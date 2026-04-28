<script lang="ts">
  import { taskStatusStore } from "$stores/taskStatus.svelte";
  import { convertDateToString } from "$lib/utils";
  import type { ITaskChange } from '$types';

  let {
    class: className = '',
    listOfChanges
  }: {
    class: string,
    listOfChanges: ITaskChange[]
  } = $props();
</script>

<details
  class={['list-of-changes', className]}
>
  <summary>
    <span class="list-of-changes__title">История изменений</span>
  </summary>
  <ul
    class="list-of-changes__list"
  >
    {#each listOfChanges as change (`change-${change.dateOfChange}`)}
      <li class="list-of-changes__item">
        <span class="list-of-changes__status">{change?.status && taskStatusStore.getStatusTitleById(change.status)}:</span>
        <span class="list-of-changes__date">{change?.dateOfChange && convertDateToString(change.dateOfChange)}</span>
      </li>
    {/each}
  </ul>
</details>

<style lang="postcss">
  .list-of-changes {
    --padding: .5rem;

    border: 1px dashed transparent;
    border-radius: var(--radius);
    transition: border-color var(--transition-base);
    width: 20rem;

    &[open] {
      border-color: var(--color-border);

      .list-of-changes__title {
        transform: translateX(0);
      }

      summary::after {
        transform: rotate(.25turn);
      }
    }

    summary {
      list-style: none;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      padding: var(--padding);
      transition: color var(--transition-base);

      &:hover {
        color: var(--color-primary);
      }
      
      &::marker,
      &::-webkit-details-marker {
        display: none;
      }

      &::after {
        content: "\27A4";
        transition: transform var(--transition-base);
      }
    }

    &__title {
      transform: translateX(calc(-1 * var(--padding)));
      transition: transform var(--transition-base);
    }

    &__list {
      padding: var(--padding);
      border-top: 1px dashed var(--color-border);
      height: 6.75rem;
      overflow-y: scroll;
      scrollbar-color: var(--gray) var(--lightgray);
      scrollbar-width: thin;
      cursor: default;
    }

    &__item {
      font-style: italic;
      color: var(--gray);

      & + & {
        margin-top: .5rem;
      }
    }

    &__status {
      text-decoration: underline;
    }
  }
</style>