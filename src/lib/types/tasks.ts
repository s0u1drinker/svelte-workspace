import { TASK_TYPE, TASK_STATUS, TASK_BUTTONS, FORM_STATUS } from '$constants';
import type { TButtonStyle } from './button';
import type { TProjectID } from './projects';

/** Тип задачи. */
export type TTaskType = keyof typeof TASK_TYPE;

/** Идентификатор задачи. */
export type TTaskId = `${(typeof TASK_TYPE)[TTaskType]['prefix']}-${number}`;

/** Задача. */
export interface ITask {
	id: number;
	idTask: TTaskId;
	idProject: TProjectID;
	subject: string;
	description: string;
	type: TTaskType;
	deadline: string;
	status: TTaskStatus;
	urgent: boolean;
	created: string;
	finished: string;
}

/** Комопнент для отображдения списка задач. */
export interface ITaskList {
	listTitle: string;
	idStatus: TTaskStatus;
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

/** Идентификатор статуса задачи. */
export type TTaskStatus = keyof typeof TASK_STATUS;
export type TTaskStatusList = (typeof TASK_STATUS)[TTaskStatus][];

/** Кнопки в модальном окне. */
export type TTaskButton = keyof typeof TASK_BUTTONS;
export type TTaskModalButtons = {
	[P in TTaskButton]: {
		title: string;
		onClick: () => void;
		buttonStyle?: TButtonStyle;
		statusToShow?: TTaskStatus[];
	};
};

export interface ITaskFormDataPayload {
	formStatus: typeof FORM_STATUS.success;
	subject: string;
	description: string;
	type: TTaskType;
	deadline: string;
	status: TTaskStatus;
	urgent: boolean;
}

export interface ITaskFormDataError {
	formStatus: typeof FORM_STATUS.error;
	error: string;
}

export type TTaskFormData = ITaskFormDataPayload | ITaskFormDataError;
