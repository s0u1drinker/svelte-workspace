import { TASK_STATUS } from '$constants';

/** Идентификатор статуса задачи. */
export type TTaskStatusID = (typeof TASK_STATUS)[number];

export interface ITaskStatus {
	title: string;
}

export interface ITaskStatusWithID extends ITaskStatus {
	id: TTaskStatusID;
}

export type TTaskStatusMap = Record<TTaskStatusID, ITaskStatusWithID>;

export type TTaskStatusMapID = {
	[P in TTaskStatusID]: P;
};
