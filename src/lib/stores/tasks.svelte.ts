import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/client';
import { SvelteDate } from 'svelte/reactivity';
import { projectsStore } from './projects.svelte';
import { taskTypeStore } from './taskType.svelte';
import type {
	ITask,
	ITaskFormDataPayload,
	TaskList,
	TTaskStatusID,
	TTaskTypeID,
	TTaskId,
	ITaskDocDB,
	TTaskCounter
} from '$types';

class TasksStore {
	private _tasks = $state<TaskList>([]);
	private _tasksCounter = $state<TTaskCounter>({});

	get tasks(): TaskList {
		return this._tasks;
	}

	get tasksCounter() {
		return this._tasksCounter;
	}

	async loadTasksFromFirebase() {
		const ID_PROJECT = projectsStore?.currentProjectID;

		if (ID_PROJECT) {
			const docRef = doc(db, 'tasks', ID_PROJECT);
			const collectionRef = collection(db, 'tasks', ID_PROJECT, 'list');

			try {
				const [docSnap, tasksSnap] = await Promise.all([getDoc(docRef), getDocs(collectionRef)]);
				const data = docSnap.data() as ITaskDocDB;
				const tasks = tasksSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as ITask[];

				this._tasks = tasks;
				this._tasksCounter = data.counter;
			} catch (error) {
				console.error('[tasksStore] Ошибка при загрузке задач:', error);
			}
		} else {
			console.error('[tasksStore] Не указан идентификатор текущего проекта.');
		}
	}

	/**
	 * Генерирует новый идентификатор для задачи с переданным типом.
	 * @param taskType Тип задачи.
	 * @returns Идентификатор задачи.
	 */
	generateNewIDTask(taskType: TTaskTypeID): TTaskId {
		const count: number = this._tasksCounter[taskType] + 1;

		return `${taskTypeStore.types[taskType].prefix}-${count}`;
	}

	/** Добавить новую задачу. */
	addTask(taskData: ITaskFormDataPayload): boolean {
		if (projectsStore.currentProjectID) {
			const deadline = taskData.deadline ? new SvelteDate(taskData.deadline).toISOString() : '';
			const created = new SvelteDate().toISOString();
			const newTask: ITask = {
				...taskData,
				deadline,
				id: crypto.randomUUID(),
				idTask: this.generateNewIDTask(taskData.type),
				created,
				finished: ''
			};

			this._tasks.push(newTask);
			this._tasksCounter[taskData.type]++;

			return true;
		}

		return false;
	}

	/** Обновить существуюшую задачу по id. */
	updateTask(id: string, updatedFields: Partial<ITask>) {
		const index = this._tasks.findIndex((task) => task.id === id);

		if (index !== -1) {
			this._tasks[index] = { ...this._tasks[index], ...updatedFields };
		}
	}

	/** Получить задачу по id. */
	getTaskById(id: string): ITask | null {
		if (typeof id !== 'string') {
			return null;
		}

		return this._tasks.find((task) => task.id === id) || null;
	}

	/**
	 * Получить задачи с определённым статусом.
	 * @param idStatus Идентификатор статуса.
	 * @returns Массив с задачами.
	 */
	getTasksByIdStatus(idStatus: TTaskStatusID) {
		if (!idStatus) {
			return [];
		}

		return this._tasks.filter((task) => task.status === idStatus);
	}

	async addTaskToDB(taskData: ITaskFormDataPayload): Promise<boolean> {
		const ID_PROJECT = projectsStore?.currentProjectID;

		if (ID_PROJECT) {
			try {
				const tasksSubcollectionRef = collection(db, 'tasks', ID_PROJECT, 'list');

				await addDoc(tasksSubcollectionRef, taskData);

				// TODO: Добавить id и отправить в _tasks.

				return true;
			} catch (error) {
				console.error('[tasksStore/addTaskToDB] Не удалось добавить данные:', error);

				return false;
			}
		} else {
			console.error('[tasksStore/addTaskToDB] Не выбран проект.');

			return false;
		}
	}

	/**
	 * Удалить задачу.
	 * @param id Идентификатор задачи.
	 * @returns Результат удаления.
	 */
	deleteTask(id: string): boolean {
		if (!id) {
			console.warn(`[tasksStore/deleteTask]: Не указан идентификатор задачи: ${id}.`);

			return false;
		}

		const index = this._tasks.findIndex((item) => item.id === id);

		if (~index) {
			setTimeout(() => this._tasks.splice(index, 1), 500);

			return true;
		} else {
			console.warn(`[tasksStore/deleteTask]: Неверный идентификатор задачи: ${id}.`);

			return false;
		}
	}
}

export const tasksStore = new TasksStore();
