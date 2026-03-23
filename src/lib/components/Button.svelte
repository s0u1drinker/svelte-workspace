<script lang="ts">
  import type { IButton } from '$types'

  let { title, buttonStyle = 'primary', ...props }: IButton = $props();
  let style = $derived(buttonStyle ? `button_${buttonStyle}` : '');

  const handleCLick = () => {
    props?.onClick && props.onClick()
  }
</script>

<button
  type="button"
  class={['button', props.class, style]}
  onclick={handleCLick}
>
  {title}
</button>

<style lang="postcss">
  .button {
    --button-color: transparent;

    background-color: var(--button-color);
    color: var(--color-white);
    padding: var(--indent-half) var(--indent);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    transition:
      background-color var(--transition-base),
      color var(--transition-base), 
      transform var(--transition-fast);

    @mixin hover {
      background-color: hsl(from var(--button-color) h s calc(l - 10));
    }

    &:active {
      transform: scale(.95);
    }

    &_primary {
      --button-color: var(--color-primary);
    }

    &_secondary{
      --button-color: var(--color-secondary);
    }
    
    &_danger{
      --button-color: var(--color-danger);
    }
    
    &_success{
      --button-color: var(--color-success);
    }
    
    &_gray{
      --button-color: var(--color-border);

      color: inherit;
    }
  }
</style>