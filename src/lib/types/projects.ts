export type TProjectID = string;

/** Проект. */
export interface IProject {
	id: TProjectID;
	name: string;
	description: string;
	icon: string;
}

/** Список проектов. */
export type IProjectsMap = Record<string, IProject>;
