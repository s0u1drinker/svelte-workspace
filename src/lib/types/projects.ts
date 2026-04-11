import type { TCollectionFromDB } from '$types';

export type TProjectID = string;

/** Проект. */
export interface IProject {
	id: TProjectID;
	name: string;
	description: string;
	icon: string;
	order: number;
}

/** Проект в БД. */
export type TProjectFromDB = TCollectionFromDB<IProject>;

/** Список проектов. */
export type IProjectsMap = Record<TProjectID, IProject>;
