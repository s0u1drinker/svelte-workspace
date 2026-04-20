import { collection, getDocs } from 'firebase/firestore';
import { db } from '$lib/firebase/client';
import type { ITaskStatus, TTaskStatusMap, TTaskStatusID, TSelectDataArray } from '$types';

class TaskStatusStore {
	private _status = $state<TTaskStatusMap>({} as TTaskStatusMap);

	get statuses(): TTaskStatusMap {
		return this._status;
	}

	async loadTaskStatusFromFirebase() {
		try {
			const taskStatusCollectionRef = collection(db, 'status');
			const querySnapshot = await getDocs(taskStatusCollectionRef);
			const newStatuses = {} as TTaskStatusMap;

			querySnapshot.forEach((doc) => {
				const id = doc.id as TTaskStatusID;
				const data = doc.data() as ITaskStatus;

				newStatuses[id] = { ...data, id };
			});

			this._status = newStatuses;
		} catch (error) {
			console.error('[taskStatusStore] Ошибка при загрузке статусов:', error);
		}
	}

	/** Возвращает список типов задач для выпадающего списка. */
	getStatusesForSelect(): TSelectDataArray {
		return Object.entries(this._status).reduce((acc: TSelectDataArray, item) => {
			acc.push({
				title: item[1].title,
				value: item[0]
			});

			return acc;
		}, []);
	}

	/**
	 * Возвращает наименование статуса задачи по идентификатору.
	 * @param idStatus
	 * @returns
	 */
	getStatusTitleById(idStatus: TTaskStatusID): ITaskStatus['title'] | '-' {
		if (!idStatus) return '-';

		return this._status[idStatus]?.title || '-';
	}
}

export const taskStatusStore = new TaskStatusStore();
