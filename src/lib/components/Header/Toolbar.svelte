<script lang="ts">
  import Button from '$components/Button.svelte'
</script>

<div class="toolbar">
  <Button
    title="Добавить задачу"
    buttonStyle="primary"
    icon="mdi:add"
    outline
  />
</div>

<style lang="postcss">
  .toolbar {
    padding: var(--indent-quarter);
    border-top: var(--border);

    @media (--viewport-md) {
      padding: var(--indent-half);
    }

    @media (--viewport-xl) {
      padding: var(--indent-half) var(--indent);
    }
  }
</style>