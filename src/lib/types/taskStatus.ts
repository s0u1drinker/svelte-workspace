import { TASK_STATUS } from '$constants';

/** Идентификатор статуса задачи. */
declare const __TTaskStatusIDBrand: unique symbol;

export type TTaskStatusID = string & { [__TTaskStatusIDBrand]: void };

export type TTaskStatusKey = (typeof TASK_STATUS)[number];

export interface ITaskStatus {
	key: TTaskStatusKey;
	title: string;
}

export interface ITaskStatusFull extends ITaskStatus {
	id: TTaskStatusID;
}

export type TTaskStatusMap = Record<TTaskStatusID, ITaskStatus>;
