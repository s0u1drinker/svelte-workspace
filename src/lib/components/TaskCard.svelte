<script lang="ts">
	import type { ITask } from '$types';

  let props: ITask = $props();

  let clType = $derived(props.type ? ` task-card_type_${props.type}` : '')
  let clUrgent = $derived(props.urgent ? ` task-card_${props.urgent}` : '')
  let cl = $derived(`task-card${clType}${clUrgent}`)
</script>

<div class="{cl}">
  <div class="task-card__header">
    <span class="task-card__id">#{ props.idTask }</span>
    <span class="task-card__title">{ props.title }</span>
  </div>
  <div class="task-card__descr">{ props.descr }</div>
  <div class="task-card__deadline">Выполнить до: { props.deadline }</div>
  <div class="task-card__info">
    <span class="task-card__date">{ props.lastModified }</span>
    <span class="task-card__owner">{ props.ownerName }</span>
  </div>
</div>

<style>
  .task-card {
    border: var(--border);
    border-radius: var(--radius);
    padding: var(--indent);
    display: flex;
    flex-direction: column;
    width: 22rem;

    &__title {
      font-weight: bold;
    }

    &__descr {
      line-clamp: 2;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
</style>