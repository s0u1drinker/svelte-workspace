import { TASK_TYPE, TASK_PREFIX } from '$constants';
import type { TCapitalzeFirstChar } from './utils';

/** Тип задачи. */
export type TTaskType = keyof typeof TASK_TYPE;

/** Идентификатор задачи. */
export type TTaskId = `${(typeof TASK_PREFIX)[TTaskType]}-${number}`;

/** Задача. */
export interface ITask {
	id: number;
	idTask: TTaskId;
	title: string;
	descr: string;
	type: TTaskType;
	urgent: boolean;
	ownerName: string;
	lastModified: string;
	deadline: string;
}

/** Список задач для хранилища. */
export type TTaskList = ITask[];

/** Тип для константы TASK_PREFIX */
export type TTaskPrefixMap = {
	[P in TTaskType]: TCapitalzeFirstChar<P>;
};
