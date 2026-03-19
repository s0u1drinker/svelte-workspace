import { TASK_TYPE, TASK_PREFIX, TASK_STATUS } from '$constants';
import type { TCapitalzeFirstChar } from './utils';
import type { TProjectID } from './projects';

/** Тип задачи. */
export type TTaskType = keyof typeof TASK_TYPE;

/** Идентификатор задачи. */
export type TTaskId = `${(typeof TASK_PREFIX)[TTaskType]}-${number}`;

/** Задача. */
export interface ITask {
	id: number;
	idTask: TTaskId;
	idStatus: TTaskStatusId;
	idProject: TProjectID;
	title: string;
	descr: string;
	type: TTaskType;
	urgent: boolean;
	ownerName: string;
	created: string;
	deadline: string;
}

export type TTaskCard = ITask & {
	minimize?: boolean;
};

/** Список задач для хранилища. */
export type TTaskList = ITask[];

/** Тип для константы TASK_PREFIX */
export type TTaskPrefixMap = {
	[P in TTaskType]: TCapitalzeFirstChar<P>;
};

/** Иддентификатор статуса задачи. */
export type TTaskStatus = keyof typeof TASK_STATUS;
export type TTaskStatusId = (typeof TASK_STATUS)[TTaskStatus]['id'];
