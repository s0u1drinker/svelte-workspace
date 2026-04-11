import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '$lib/firebase/client';
import { projectConverter } from '$lib/firebase/converters';
import type { Unsubscribe } from 'firebase/firestore';
import type { IProject, TProjectID, IProjectsMap } from '$types';

class ProjectsStore {
	/** Список проектов. */
	private _projects = $state<IProjectsMap>({});

	/** Функция для отписки от Firebase Snapshot Listener. */
	private _unsubscribeFromProjects: Unsubscribe | null = null;

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

	/** Загрузка проектов из Firestore, а также подписка на изменения в коллекции 'projects'. */
	loadProjectsFromFirebase() {
		if (this._unsubscribeFromProjects) {
			this._unsubscribeFromProjects();
			this._unsubscribeFromProjects = null;
		}

		const projectsCollectionRef = collection(db, 'projects').withConverter(projectConverter);

		this._unsubscribeFromProjects = onSnapshot(
			query(projectsCollectionRef, orderBy('order', 'asc')),
			(querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const project = doc.data();

					this._projects[doc.id] = project;
				});

				// TODO: обновление данных для currrentProject.
			},
			(error) => {
				console.error('[projectsStore] Ошибка при получении проектов из Firebase:', error);
			}
		);
	}

	/** Отписывается от Firebase Snapshot Listener. */
	unsubscribeFromFirebase() {
		if (this._unsubscribeFromProjects) {
			this._unsubscribeFromProjects();
			this._unsubscribeFromProjects = null;
		}
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
