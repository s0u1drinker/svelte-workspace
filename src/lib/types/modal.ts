import type { Snippet } from 'svelte';
import type { TButtonStyle, TTaskStatusID } from '$types';

/** Позиция модального окна. */
type TModalPosition = 'center' | 'left';

export interface IModal {
	open: boolean;
	header?: Snippet;
	children?: Snippet;
	message?: Snippet;
	buttons?: Snippet;
	onClose?: () => void;
	showCloseButton?: boolean;
	class?: string;
	position?: TModalPosition;
	messageColor?: string;
}

/** Модальное окно с ошибккой. */
export type IModalText = Pick<IModal, 'open'> & {
	title?: string;
	text?: string;
	buttonText?: string;
	buttonStyle?: TButtonStyle;
	buttons?: Snippet;
};

/** Модальное окно для выбора проекта. */
export type IModalProjects = Pick<IModal, 'open'>;

/** Модальное окно для задачи. */
export type IModalTask = Pick<IModal, 'open'> & {
	idTask: string;
};
export type IModalTaskAdd = Pick<IModal, 'open'>;

/** Кнопки. */
export interface IModalButtonsDefault {
	taskStatus: TTaskStatusID;
	disabled?: boolean;
	onClose: () => void;
	onChangeStatus: (status: TTaskStatusID) => void;
	onComplete: () => void;
	onDelete: () => void;
}

export interface IModalButtonsDelete {
	disabled?: boolean;
	onDelete: () => void;
	onCancel: () => void;
}
