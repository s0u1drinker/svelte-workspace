import type { SVGAttributes } from 'svelte/elements';

export interface ICustomIcon extends SVGAttributes<SVGSVGElement> {
	'icon-name': string;
}

export type TParseSVG = { viewBox: string; innerHtml: string } | null;
