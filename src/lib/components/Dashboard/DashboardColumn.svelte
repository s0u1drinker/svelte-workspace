<script lang="ts">
import type { IDashboardColumn } from '$types';

  const props: IDashboardColumn = $props();
</script>

<div class="d-column {props.class}">
  <div class="d-column__title">{ props.title }</div>
  <div class="d-column__tasks"></div>
</div>

<style lang="postcss">
  .d-column {
    --padding: var(--indent);

    border: var(--border);
    padding: var(--padding);
    transition: box-shadow var(--transition-base);

    &:hover {
      box-shadow: 0 0 0 4px var(--color-border) inset;
    }
    
    &__title {
      font-weight: bold;
      text-align: center;
      padding-bottom: var(--padding);
      border-bottom: var(--border);
    }
  }
</style>