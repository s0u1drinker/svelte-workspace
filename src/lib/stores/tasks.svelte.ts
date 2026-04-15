import { SvelteDate } from 'svelte/reactivity';
import { projectsStore } from './projects.svelte';
import { TASK_TYPE } from '$constants';
import type {
	ITask,
	ITaskFormDataPayload,
	TaskList,
	TProjectID,
	TTaskStatus,
	TTaskType,
	TTaskId
} from '$types';

const tasks = $state<TaskList>([
	{
		id: 1,
		idTask: 'B-1',
		status: 'noStatus',
		idProject: '1',
		subject: 'Исправить баг',
		description:
			'Баг появляется и исчезает внезапно. Никто не может его воспроизвести, т.к. никто не знает из-за чего он появляется.',
		type: 'bug',
		urgent: false,
		created: '2026-03-12T06:59:24.391Z',
		deadline: '2026-03-31T21:00:00.000Z',
		finished: ''
	},
	{
		id: 2,
		idTask: 'F-1',
		status: 'noStatus',
		idProject: '1',
		subject: 'Реализовать новую фичу',
		description:
			'Нужно реализовать мега-крутую, просто феерически невообразимую новую фичу. Срок: 1 час.',
		type: 'feature',
		urgent: true,
		created: '2026-03-12T07:59:24.391Z',
		deadline: '2026-03-31T21:00:00.000Z',
		finished: ''
	},
	{
		id: 3,
		idTask: 'T-1',
		status: 'noStatus',
		idProject: '1',
		subject: 'Простая таска. Ничего сложного.',
		description: '',
		type: 'task',
		urgent: false,
		created: '2026-03-12T08:03:24.391Z',
		deadline: '2026-03-31T21:00:00.000Z',
		finished: ''
	},
	{
		id: 4,
		idTask: 'B-2',
		status: 'noStatus',
		idProject: '1',
		subject: 'Нашёл баг. Нет, не так... НАШЁЛ БАГ!!1',
		description:
			'Описания не будет. Баг просто есть. Его не может не быть. Нужно найти и исправить.',
		type: 'bug',
		urgent: true,
		created: '2026-03-12T08:05:24.391Z',
		deadline: '2026-03-31T21:00:00.000Z',
		finished: ''
	},
	{
		id: 5,
		idTask: 'B-3',
		status: 'noStatus',
		idProject: '1',
		subject: 'Ещё один баг',
		description: 'Не кажется ли Вам, товарищ разработчик, что багов в Вашей поделке слишком много?',
		type: 'bug',
		urgent: false,
		created: '2026-03-12T08:09:24.391Z',
		deadline: '2026-03-31T21:00:00.000Z',
		finished: ''
	},
	{
		id: 6,
		idTask: 'F-2',
		status: 'sprint',
		idProject: '1',
		subject: 'Фича в спринте',
		description: 'Какая-то фича в графе "Спринт".',
		type: 'feature',
		urgent: true,
		created: '2026-03-16T15:35:24.391Z',
		deadline: '2026-03-31T21:00:00.000Z',
		finished: ''
	},
	{
		id: 7,
		idTask: 'B-4',
		status: 'inProgress',
		idProject: '1',
		subject: 'Баг в работе',
		description: 'Исправление какого-то бага.',
		type: 'bug',
		urgent: false,
		created: '2026-03-16T16:02:24.391Z',
		deadline: '2026-03-31T21:00:00.000Z',
		finished: ''
	},
	{
		id: 8,
		idTask: 'T-2',
		status: 'test',
		idProject: '1',
		subject: 'Задача на тесте',
		description: 'Просто задача на тесте.',
		type: 'task',
		urgent: false,
		created: '2026-03-16T16:04:24.391Z',
		deadline: '2026-03-31T21:00:00.000Z',
		finished: ''
	},
	{
		id: 9,
		idTask: 'T-3',
		status: 'complete',
		idProject: '1',
		subject: 'Задача завершена раньше дедлайна',
		description: 'Задача была поставлена и успешно решена.',
		type: 'task',
		urgent: true,
		created: '2026-04-11T16:04:24.391Z',
		deadline: '2026-04-12T17:00:00.000Z',
		finished: '2026-04-12T16:33:12.000Z'
	},
	{
		id: 10,
		idTask: 'F-3',
		status: 'complete',
		idProject: '1',
		subject: 'Задача завершена позже дедлайна',
		description: 'Задача была поставлена и успешно решена позже дедлайна. Плохо.',
		type: 'feature',
		urgent: false,
		created: '2026-04-10T11:01:14.391Z',
		deadline: '2026-04-12T19:00:00.000Z',
		finished: '2026-04-13T23:17:45.000Z'
	}
]);

/**
 * Генерирует новый идентификатор для задачи с переданным типом.
 * @param taskType Тип задачи.
 * @returns Идентификатор задачи.
 */
function generateNewIDTask(taskType: TTaskType): TTaskId {
	const count: number = tasks.filter((task) => task.type === taskType).length + 1;

	return `${TASK_TYPE[taskType].prefix}-${count}`;
}

/** Добавить новую задачу. */
export function addTask(taskData: ITaskFormDataPayload): boolean {
	const idProject = projectsStore.currentProjectID;

	if (idProject) {
		const deadline = taskData.deadline ? new SvelteDate(taskData.deadline).toISOString() : '';
		const created = new SvelteDate().toISOString();
		const newTask: ITask = {
			...taskData,
			deadline,
			id: tasks.length + 1,
			idTask: generateNewIDTask(taskData.type),
			idProject,
			created,
			finished: ''
		};

		tasks.push(newTask);

		return true;
	}

	return false;
}

/** Обновить существуюшую задачу по id. */
export function updateTask(id: number, updatedFields: Partial<ITask>) {
	const index = tasks.findIndex((task) => task.id === id);

	if (index !== -1) {
		tasks[index] = { ...tasks[index], ...updatedFields };
	}
}

/** Получить задачу по id. */
export function getTaskById(id: number): ITask | null {
	if (typeof id !== 'number') {
		return null;
	}

	return tasks.find((task) => task.id === id) || null;
}

/**
 * Получить задачи с определённым статусом.
 * Если идентификатор проекта не передан, то фильтрация происходит по идентификатору выбранного проекта.
 * @param idStatus Идентификатор статуса.
 * @param idProject Идентификатор проекта (опционально).
 * @returns Массив с задачами.
 */
export function getTasksByIdStatus(idStatus: TTaskStatus, idProject?: TProjectID) {
	if (!idStatus) {
		return [];
	}

	const idProjectForFilter = idProject ?? projectsStore.currentProjectID;

	return tasks.filter((task) => task.status === idStatus && task.idProject === idProjectForFilter);
}
