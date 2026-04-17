import { collection, getDocs } from 'firebase/firestore';
import { db } from '$lib/firebase/client';
import type { TTaskTypeMap, TTaskTypeID, ITaskType, TTaskTypeProp, TSelectDataArray } from '$types';

class TaskTypeStore {
	private _types = $state<TTaskTypeMap>({});

	get types(): TTaskTypeMap {
		return this._types;
	}

	async loadTaskTypeFromFirebase() {
		try {
			const taskTypeCollectionRef = collection(db, 'type');
			const querySnapshot = await getDocs(taskTypeCollectionRef);
			const newTypes: TTaskTypeMap = {};

			querySnapshot.forEach((doc) => {
				const id = doc.id as TTaskTypeID;
				const data = doc.data() as ITaskType;

				newTypes[id] = { ...data };
			});

			this._types = newTypes;
		} catch (error) {
			console.error('[taskTypeStore] Ошибка при загрузке типов задач:', error);
		}
	}

	/**
	 * Возвращает тип задачи по идентификатору.
	 * @param idType Идентификатор типа задачи.
	 * @returns Данные о типе задачи.
	 */
	getTypeById(idType: TTaskTypeID): ITaskType | null {
		if (!idType) return null;

		return this._types[idType] || null;
	}

	/**
	 * Возвращает свойство из объекта типа.
	 * @param idType Идентификатор типа.
	 * @param prop Свойство.
	 * @returns Значение в виде строки.
	 */
	getPropertyOfTypeById(idType: TTaskTypeID, prop: TTaskTypeProp): ITaskType[TTaskTypeProp] | '' {
		if (!idType) return '';

		const taskType = this.getTypeById(idType);

		if (!taskType || !Object.hasOwn(taskType, prop)) return '';

		return taskType[prop];
	}

	/** Возвращает список типов задач для выпадающего списка. */
	getTypesForSelect(): TSelectDataArray {
		return Object.entries(this._types).reduce((acc: TSelectDataArray, item) => {
			acc.push({
				title: item[1].title,
				value: item[0]
			});

			return acc;
		}, []);
	}
}

export const taskTypeStore = new TaskTypeStore();
