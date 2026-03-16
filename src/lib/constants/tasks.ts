import type { TTaskPrefixMap } from '$types';

/** Типы задач. */
export const TASK_TYPE = {
	bug: 'bug',
	feature: 'feature',
	task: 'task'
} as const;

/** Префикс идентификатора задачи. */
export const TASK_PREFIX = {
	bug: 'B',
	feature: 'F',
	task: 'T'
} as const satisfies TTaskPrefixMap;

/** Статус задачи. */
export const TASK_STATUS = {
	noStatus: {
		id: '0',
		title: 'Без статуса'
	},
	sprint: {
		id: '1',
		title: 'Спринт'
	},
	inProgress: {
		id: '2',
		title: 'В работе'
	},
	test: {
		id: '3',
		title: 'Тестирование'
	},
	complete: {
		id: '4',
		title: 'Завершено'
	}
} as const;
