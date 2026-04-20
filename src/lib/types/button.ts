import { BUTTON_STYLE } from '$constants';
import type { TIconName } from './utils';

export type TButtonStyle = keyof typeof BUTTON_STYLE;
type TButtonType = 'button' | 'submit' | 'reset';

export interface IButton {
	title?: string;
	'aria-label'?: string;
	class?: string;
	type?: TButtonType;
	form?: string;
	outline?: boolean;
	ghost?: boolean;
	elevated?: boolean;
	/** Имя иконки для загрузки с Iconify. */
	icon?: TIconName;
	/** Наименование кастомной иконки из папки lib/assets/icons */
	iconCustom?: string;
	buttonStyle?: TButtonStyle;
	disabled?: boolean;
	onClick?: () => unknown;
}
