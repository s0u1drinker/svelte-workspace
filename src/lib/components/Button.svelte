<script lang="ts">
  import Icon from '@iconify/svelte';
  import { BUTTON_STYLE } from '$constants';
  import type { IButton } from '$types'

  let {
    title,
    buttonStyle = BUTTON_STYLE.primary,
    type: buttonType = 'button',
    ...props
  }: IButton = $props();
  let style = $derived(props?.outline ? `button_outline button_outline_${buttonStyle}` : `button_${buttonStyle}`)
  let shadow = $derived(props?.elevated && 'button_elevated' )

  const handleCLick = () => {
    props?.onClick && props.onClick()
  }
</script>

<button
  type={buttonType}
  class={['button', props.class, style, shadow]}
  form={props?.form}
  onclick={handleCLick}
  disabled={props.disabled}
>
  {#if props.icon}
    <Icon icon={props.icon} />
  {/if}
  <span>{title}</span>
</button>

<style lang="postcss">
  .button {
    --button-color: transparent;

    background-color: var(--button-color);
    color: var(--color-white);
    padding: var(--indent-half) var(--indent-three-quarters);
    border-radius: var(--radius);
    transition:
      background-color var(--transition-base),
      color var(--transition-base), 
      transform var(--transition-fast);

    @mixin focus;

    &[disabled] {
      opacity: .75;
      cursor: not-allowed;
    }

    &:not(.button_outline) {
      @mixin hover {
        background-color: hsl(from var(--button-color) h s calc(l - 10));
      }
    }

    &:active:not[disabled] {
      transform: scale(.95);
    }

    &_elevated {
      box-shadow: var(--shadow-sm);
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

    &_outline {
      --outline-bg-color: transparent;
      --outline-txt-color: inherit;

      background-color: var(--outline-bg-color);
      color: var(--outline-txt-color);
      border: 1px solid var(--outline-txt-color);

      @mixin hover {
        --outline-bg-color: var(--outline-txt-color);

        color: var(--color-white);
      }

      &_primary {
        --outline-txt-color: var(--color-primary);
      }

      &_secondary{
        --outline-txt-color: var(--color-secondary);
      }
      
      &_danger{
        --outline-txt-color: var(--color-danger);
      }
      
      &_success{
        --outline-txt-color: var(--color-success);
      }
      
      &_gray{
        --outline-txt-color: var(--gray);
      }
    }
  }
</style>