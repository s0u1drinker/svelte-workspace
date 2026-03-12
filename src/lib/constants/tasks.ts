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
