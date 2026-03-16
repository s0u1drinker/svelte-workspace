import type { ITask, TTaskList } from '$types';

const tasks = $state<TTaskList>([
	{
		id: 1,
		idTask: 'B-1',
		idStatus: '0',
		title: 'Исправить баг',
		descr:
			'Баг появляется и исчезает внезапно. Никто не может его воспроизвести, т.к. никто не знает из-за чего он появляется.',
		type: 'bug',
		urgent: false,
		ownerName: 'Дмитрий',
		created: '12.03.2026 10:10',
		deadline: '16.03.2026'
	},
	{
		id: 2,
		idTask: 'F-1',
		idStatus: '0',
		title: 'Реализовать новую фичу',
		descr:
			'Нужно реализовать мега-крутую, просто феерически невообразимую новую фичу. Срок: 1 час.',
		type: 'feature',
		urgent: true,
		ownerName: 'Дмитрий',
		created: '12.03.2026 10:11',
		deadline: '16.03.2026'
	},
	{
		id: 3,
		idTask: 'T-1',
		idStatus: '0',
		title: 'Простая таска. Ничего сложного.',
		descr: '',
		type: 'task',
		urgent: false,
		ownerName: 'Дмитрий',
		created: '12.03.2026 10:12',
		deadline: '16.03.2026'
	},
	{
		id: 4,
		idTask: 'B-2',
		idStatus: '0',
		title: 'Нашёл баг. Нет, не так... НАШЁЛ БАГ!!1',
		descr: 'Описания не будет. Баг просто есть. Его не может не быть. Нужно найти и исправить.',
		type: 'bug',
		urgent: true,
		ownerName: 'Дмитрий',
		created: '12.03.2026 10:13',
		deadline: '16.03.2026'
	},
	{
		id: 5,
		idTask: 'B-3',
		idStatus: '0',
		title: 'Ещё один баг',
		descr: 'Не кажется ли Вам, товарищ разработчик, что багов в Вашей поделке слишком много?',
		type: 'bug',
		urgent: false,
		ownerName: 'Дмитрий',
		created: '12.03.2026 10:14',
		deadline: '16.03.2026'
	},
	{
		id: 6,
		idTask: 'F-2',
		idStatus: '1',
		title: 'Фича в спринте',
		descr: 'Какая-то фича в графе "Спринт".',
		type: 'feature',
		urgent: true,
		ownerName: 'Дмитрий',
		created: '16.03.2026 18:35',
		deadline: '20.03.2026'
	},
	{
		id: 7,
		idTask: 'B-4',
		idStatus: '2',
		title: 'Баг в работе',
		descr: 'Исправление какого-то бага.',
		type: 'bug',
		urgent: false,
		ownerName: 'Дмитрий',
		created: '16.03.2026 19:02',
		deadline: '20.03.2026'
	},
	{
		id: 8,
		idTask: 'T-2',
		idStatus: '3',
		title: 'Задача на тесте',
		descr: 'Просто задача на тесте.',
		type: 'task',
		urgent: false,
		ownerName: 'Дмитрий',
		created: '16.03.2026 19:03',
		deadline: '20.03.2026'
	}
]);

/** Добавить новую задачу. */
export function addTask(newTask: ITask) {
	tasks.push(newTask);
}

/** Обновить существуюшую задачу по id. */
export function updateTask(id: number, updatedFields: Partial<ITask>) {
	const index = tasks.findIndex((task) => task.id === id);

	if (index !== -1) {
		tasks[index] = { ...tasks[index], ...updatedFields };
	}
}

/** Получить задачу по id. */
export function getTaskById(id: number): ITask | undefined {
	return tasks.find((task) => task.id === id);
}

/** Получить задачи с определённым статусом. */
export function getTasksByIdStatus(idStatus: string) {
	return tasks.filter((task) => task.idStatus === idStatus);
}
