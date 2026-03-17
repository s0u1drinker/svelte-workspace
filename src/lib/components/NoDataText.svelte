<script lang="ts">
  const { text = 'Пусто' } = $props();
</script>

<div class="no-data">
  {text}
</div>

<style lang="postcss">
  .no-data {
    color: var(--gray);
    text-align: center;
    font-style: italic;
  }
</style>