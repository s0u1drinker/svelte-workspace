/** Проект. */
export interface IProject {
	id: number;
	name: string;
	description: string;
}

/** Список проектов. */
export type IProjectsMap = Map<number, IProject>;
