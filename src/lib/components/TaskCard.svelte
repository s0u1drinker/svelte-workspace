<script lang="ts">
  import Icon from "@iconify/svelte";
	import type { TTaskCard } from '$types';

  let props: TTaskCard = $props();

  let clType = $derived(props.type ? ` task-card_type_${props.type}` : '')
  let clUrgent = $derived(props.urgent ? ' task-card_urgent' : '')
  let clMinimize = $derived(props.minimize ? ' task-card_minimize' : '')
  let cl = $derived(`task-card${clType}${clUrgent}${clMinimize}`)
</script>

<div class="{cl}">
  <div class="task-card__header">
    <span class="task-card__id">#{ props.idTask }</span>
    {#if !props.minimize}
      <span class="task-card__date">{ props.created }</span>
    {/if}
  </div>
  <span class="task-card__title">{ props.title }</span>
  {#if !props.minimize}
    <div class="task-card__deadline">Выполнить до: { props.deadline }</div>
  {/if}
  {#if props.urgent}
    <Icon
      icon="mdi:fire"
      class="task-card__icon-urgent"
    />
  {/if}
</div>

<style lang="postcss">
  .task-card {
    --type-color: transparent;
    --icon-urgent-size: 3rem;

    position: relative;
    overflow: hidden;
    border: var(--border);
    border-radius: var(--radius);
    padding: var(--indent);
    padding-left: var(--indent-and-half);
    display: flex;
    flex-direction: column;
    gap: var(--indent-half);
    width: 22rem;
    transition: box-shadow var(--transition-base);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: .5em;
      background-color: var(--type-color);
    }

    &:hover {
      box-shadow: var(--shadow);
    }

    &_urgent {
      .task-card__id {
        color: var(--color-danger);
      }

      &:hover {
        box-shadow: 0 10px 15px -3px color-mix(in srgb, var(--color-danger), transparent 80%);

        :global(.task-card__icon-urgent) {
          opacity: 1;
        }
      }
    }

    &_minimize {
      width: auto;

      :global(.task-card__icon-urgent) {
        --icon-urgent-size: 2rem;
        top: var(--indent-half);
        right: var(--indent-half);
      }
    }

    &_type {

      &_bug {
        --type-color: var(--color-danger);
      }

      &_feature {
        --type-color: var(--color-secondary);
      }

      &_task {
        --type-color: var(--color-border);
      }
    }

    &__header {
      display: flex;
      gap: var(--indent);
      justify-content: space-between;
    }

    &__id {
      font-weight: bold;
      color: var(--color-primary);
    }

    &__date {
      color: var(--gray);
      font-style: italic;
    }

    &__title {
      font-weight: bold;
    }

    :global(&__icon-urgent) {
      width: var(--icon-urgent-size);
      height: var(--icon-urgent-size);
      position: absolute;
      right: 0;
      bottom: 0;
      color: var(--color-danger);
      opacity: .25;
      z-index: -1;
      transition: opacity var(--transition-base);
    }
  }
</style>