import { TASK_STATUS, TASK_TYPE } from '$constants';
import type { TTaskStatus, ISelectData } from '$types';

/** Возвращает статус задачи по идентификатору. */
export function getTaskStatusByID(id: TTaskStatus): string {
	return TASK_STATUS[id]?.title || '-';
}

/**
 * ВРЕМЕННОЕ РЕШЕНИЕ
 * Возвращает список статусов задач для выпадающего меню.
 */
export function getTasksStatusForSelect() {
	return Object.values(TASK_STATUS).reduce((acc: ISelectData[], item) => {
		acc.push({
			title: item.title,
			value: item.id
		});

		return acc;
	}, []);
}

/**
 * ВРЕМЕННОЕ РЕШЕНИЕ
 * Возвращает список типов задач для выпадающего меню.
 */
export function getTaskTypeForSelect() {
	return Object.entries(TASK_TYPE).reduce((acc: ISelectData[], item) => {
		acc.push({
			title: item[1].title,
			value: item[0]
		});

		return acc;
	}, []);
}
