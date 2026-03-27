import type { TTaskFormData } from './tasks';

export interface IForm {
	id?: string;
}

export type TFormNewTask = IForm & {
	onSubmit: (data: TTaskFormData) => void;
};
