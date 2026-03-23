import { TASK_STATUS } from '$constants';
import type { TTaskStatus } from '$types';

/** Возвращает статус задачи по идентификатору. */
export function getTaskStatusByID(id: TTaskStatus): string {
	return TASK_STATUS[id]?.title || '-';
}
