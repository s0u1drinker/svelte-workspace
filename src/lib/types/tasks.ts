import { TASK_BUTTONS, FORM_STATUS } from '$constants';
import type { TButtonStyle, TTaskStatusID, ITaskType, TTaskTypeID } from '$types';

/** Идентификатор задачи. */
export type TTaskId = `${ITaskType['prefix']}-${number}`;

/** Задача. */
export interface ITask {
	id: string;
	idTask: TTaskId;
	subject: string;
	description: string;
	type: TTaskTypeID;
	deadline: string;
	status: TTaskStatusID;
	urgent: boolean;
	created: string;
	finished: string;
}

/** Счетчик задач. */
export type TTaskCounter = Record<TTaskTypeID, number>;

/** Документ в БД tasks/{idProject} */
export interface ITaskDocDB {
	counter: TTaskCounter;
}

/** Комопнент для отображдения списка задач. */
export interface ITaskList {
	listTitle: string;
	idStatus: TTaskStatusID | null | undefined;
	class?: string;
	minimizeCard?: boolean;
	noDataText?: string;
	titleStyle?: 'blur' | 'border';
}

export type TTaskCard = ITask & {
	minimize?: boolean;
	onclick?: () => void;
};

/** Список задач для хранилища. */
export type TaskList = ITask[];

/** Кнопки в модальном окне. */
export type TTaskButton = keyof typeof TASK_BUTTONS;
export type TTaskModalButtons = {
	[P in TTaskButton]: {
		title: string;
		onClick: () => void;
		buttonStyle?: TButtonStyle;
		statusToShow?: TTaskStatusID[];
	};
};

export interface ITaskFormDataPayload {
	formStatus: typeof FORM_STATUS.success;
	subject: string;
	description: string;
	type: TTaskTypeID;
	deadline: string;
	status: TTaskStatusID;
	urgent: boolean;
}

export interface ITaskFormDataError {
	formStatus: typeof FORM_STATUS.error;
	error: string;
}

export type TTaskFormData = ITaskFormDataPayload | ITaskFormDataError;
