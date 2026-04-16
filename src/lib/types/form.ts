import type { TTaskFormData } from './tasks';

export interface IForm {
	id?: string;
}

/** Форма добавления новой задачи. */
export type TFormNewTask = IForm & {
	onSubmit: (data: TTaskFormData) => void;
};

/** Форма входа. */
export interface IFormLoginData {
	email: string;
	password: string;
}

export type TFormLogin = IForm & {
	onSubmit: (data: IFormLoginData) => void;
};
