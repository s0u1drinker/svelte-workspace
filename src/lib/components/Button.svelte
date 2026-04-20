<script lang="ts">
  import Icon from '@iconify/svelte';
  import IconCustom from './IconCustom.svelte';
  import { BUTTON_STYLE } from '$constants';
  import type { IButton } from '$types'

  let {
    title,
    buttonStyle = BUTTON_STYLE.primary,
    type: buttonType = 'button',
    ...props
  }: IButton = $props();
  let outlineStyle = $derived(props?.outline ? ' button_outline' : '');
  let ghostStyle = $derived(props?.ghost ? ' button_ghost' : '');
  let style = $derived(`button_${buttonStyle}${outlineStyle || ghostStyle}`)
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
  aria-label={props['aria-label']}
>
  {#if props.iconCustom}
    <IconCustom
      icon-name={props.iconCustom}
      aria-hidden="true"
    />
  {:else if props.icon}
    <Icon
      icon={props.icon}
      aria-hidden="true"
    />
  {/if}
  {#if title}
    <span>{title}</span>
  {/if}
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
      opacity: .5;
      cursor: not-allowed;
    }

    &:not(.button_outline, .button_ghost) {
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
      --button-color: var(--gray);

      color: inherit;
    }

    &_ghost {
      --ghost-bg-color: transparent;
      --ghost-txt-color: var(--button-color);

      background-color: var(--ghost-bg-color);
      color: var(--ghost-txt-color);

      @mixin hover {
        --ghost-bg-color: color-mix(in srgb, var(--ghost-txt-color) 30%, var(--color-white));
      }
    }

    &_outline {
      --outline-bg-color: transparent;
      --outline-txt-color: var(--button-color);

      background-color: var(--outline-bg-color);
      color: var(--outline-txt-color);
      border: 1px solid var(--outline-txt-color);

      @mixin hover {
        --outline-bg-color: var(--outline-txt-color);

        color: var(--color-white);
      }
    }
  }
</style>