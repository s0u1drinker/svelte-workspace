/** Тип задачи. */
declare const __TTaskTypeIDBrand: unique symbol;

export type TTaskTypeID = string & { [__TTaskTypeIDBrand]: void };

export interface ITaskType {
	color: string;
	prefix: string;
	title: string;
}

export type TTaskTypeProp = keyof ITaskType;

export type TTaskTypeMap = Record<TTaskTypeID, ITaskType>;
