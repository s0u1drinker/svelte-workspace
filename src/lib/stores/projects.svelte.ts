import type { IProject, TProjectID, IProjectsMap } from '$types';

class ProjectsStore {
	/** Список проектов. */
	private _projects = $state<IProjectsMap>({
		'1': {
			id: '1',
			name: 'Nuxt runner',
			description: 'Приложение для учёта беговых тренировок.',
			icon: 'logos:nuxt-icon'
		},
		'2': {
			id: '2',
			name: 'Svelte Workspace',
			description: 'Приложение для управления задачами.',
			icon: 'logos:svelte-icon'
		}
	});

	/** Текущий проект. */
	private currentProject = $state<IProject | null>(null);

	get projects(): IProjectsMap {
		return this._projects;
	}

	/** Идентификатор текущего проекта. */
	get currentProjectID(): TProjectID | null {
		return this.currentProject?.id || null;
	}

	/** Наименование текущего проекта. */
	get currentProjectName(): string {
		return this.currentProject?.name || '';
	}

	/** Проект выбран. */
	get isProjectSelected(): boolean {
		return !!this.currentProjectID;
	}

	/** Добавить данные о проектах. */
	setProjects(newData: IProjectsMap) {
		this._projects = { ...newData };
	}

	/**
	 * Установка идентификатора текущего проекта (выбор проекта).
	 * @param id Идентификатор проекта.
	 * @returns Результат обновления данных.
	 */
	setCurrentProject(id: TProjectID): boolean {
		if (!id) {
			return false;
		}

		this.currentProject = this._projects[id] || null;

		return !!this.currentProject;
	}
}

export const projectsStore = new ProjectsStore();
