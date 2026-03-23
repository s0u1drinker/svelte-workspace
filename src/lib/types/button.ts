import { BUTTON_STYLE } from '$constants';

export type TButtonStyle = keyof typeof BUTTON_STYLE;

export interface IButton {
	title: string;
	class?: string;
	buttonStyle?: TButtonStyle;
	onClick?: () => unknown;
}
