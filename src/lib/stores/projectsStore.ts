import { writable, derived } from 'svelte/store';
import type { IProjectsMap } from '$types';

/** Идентификатор текущего проекта. */
export const currentProjectID = writable<number | null>(null);

/** Список проектов. */
export const projects = writable<IProjectsMap>(
	new Map([
		[
			1,
			{
				id: 1,
				name: 'Nuxt runner',
				description: 'Учёт тренировок.'
			}
		],
		[
			2,
			{
				id: 2,
				name: 'Svelte Workspace',
				description: 'Приложение для управления задачами.'
			}
		]
	])
);

/** Обновление данных о проектах. */
export function updateProjects(newData: IProjectsMap) {
	projects.set(new Map(newData));
}

/** Текущий проект. */
export const currentProject = derived(
	[currentProjectID, projects],
	([$currentProjectID, $projects]) => {
		return $currentProjectID !== null ? $projects.get($currentProjectID) : undefined;
	}
);

/** Название текущего проекта. */
export const currentProjectName = derived(currentProject, ($currentProject) => {
	return $currentProject?.name || '';
});
