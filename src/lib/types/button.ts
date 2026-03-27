import { BUTTON_STYLE } from '$constants';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { TIconName } from './utils';

export type TButtonStyle = keyof typeof BUTTON_STYLE;
type TButtonType = 'button' | 'submit' | 'reset';

export interface IButton {
	title: string;
	class?: string;
	type?: TButtonType;
	form?: string;
	outline?: boolean;
	elevated?: boolean;
	icon?: TIconName;
	buttonStyle?: TButtonStyle;
	disabled?: boolean;
	onClick?: () => unknown;
}
