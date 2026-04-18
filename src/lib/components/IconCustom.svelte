<script lang="ts">
  import type { ICustomIcon, TParseSVG } from '$types';
  
  let {
    'icon-name': iconName,
    width = '1rem',
    height = '1rem',
    color,
    fill = 'currentColor',
    stroke = 'currentColor',
    class: className = '',
    ...restProps
  }: ICustomIcon = $props();

  const icons = import.meta.glob('$lib/assets/icons/*.svg', {
    query: '?raw',
    import: 'default',
    eager: true
  }) as Record<string, string>;

  /**
   * Парсит SVG-иконку в виде строки.
   * @param rawString Строка с SVG-иконкой.
   * @returns Параметр ViewBox и подготовленную иконку.
   */
  function parseSvg(rawString: string): TParseSVG {
    const viewBoxMatch = rawString.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
    const innerMatch = rawString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    
    if (!innerMatch) return null;
    
    let innerHtml = innerMatch[1].trim();

    innerHtml = innerHtml.replace(/\s(fill|stroke)="[^"]*"/g, ' $1="currentColor"');

    return { viewBox, innerHtml };
  }

  /**
   * По имени иконки возвращает подготовленную SVG-строку.
   * @param iconName Имя иконки.
   */
  function getIconData(iconName: string): TParseSVG {
    const key = Object.keys(icons).find((k) => k.endsWith(`${iconName}.svg`));

    if (!key) return null;

    return parseSvg(icons[key]);
  }

  let iconData = $derived(getIconData(iconName));
</script>

{#if iconData}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={iconData.viewBox}
    class={className}
    width={width}
    height={height}
    fill={fill}
    stroke={stroke}
    color={color}
    {...restProps}
  >
    {@html iconData.innerHtml}
  </svg>
{/if}

<style lang="postcss"></style>