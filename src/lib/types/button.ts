import { BUTTON_STYLE } from '$constants';
import type { TIconName } from './utils';

export type TButtonStyle = keyof typeof BUTTON_STYLE;

export interface IButton {
	title: string;
	outline?: boolean;
	elevated?: boolean;
	icon?: TIconName;
	class?: string;
	buttonStyle?: TButtonStyle;
	onClick?: () => unknown;
}
