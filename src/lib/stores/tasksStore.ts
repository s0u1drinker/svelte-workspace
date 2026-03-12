import { writable } from 'svelte/store';
import type { TTaskList } from '$types';

export const tasks = writable<TTaskList>([
	{
		id: 1,
		idTask: 'B-1',
		title: 'Исправить баг',
		descr:
			'Баг появляется и исчезает внезапно. Никто не может его воспроизвести, т.к. никто не знает из-за чего он появляется.',
		type: 'bug',
		urgent: false,
		ownerName: 'Дмитрий',
		lastModified: '12.03.2026 10:10',
		deadline: '16.03.2026'
	},
	{
		id: 2,
		idTask: 'F-1',
		title: 'Реализовать новую фичу',
		descr:
			'Нужно реализовать мега-крутую, просто феерически невообразимую новую фичу. Срок: 1 час.',
		type: 'feature',
		urgent: true,
		ownerName: 'Дмитрий',
		lastModified: '12.03.2026 10:11',
		deadline: '16.03.2026'
	},
	{
		id: 3,
		idTask: 'T-1',
		title: 'Простая таска. Ничего сложного.',
		descr: '',
		type: 'task',
		urgent: false,
		ownerName: 'Дмитрий',
		lastModified: '12.03.2026 10:12',
		deadline: '16.03.2026'
	},
	{
		id: 4,
		idTask: 'B-2',
		title: 'Нашёл баг. Нет, не так... НАШЁЛ БАГ!!1',
		descr: 'Описания не будет. Баг просто есть. Его не может не быть. Нужно найти и исправить.',
		type: 'bug',
		urgent: true,
		ownerName: 'Дмитрий',
		lastModified: '12.03.2026 10:13',
		deadline: '16.03.2026'
	},
	{
		id: 5,
		idTask: 'B-3',
		title: 'Ещё один баг',
		descr: 'Не кажется ли Вам, товарищ разработчик, что багов в Вашей поделке слишком много?',
		type: 'bug',
		urgent: false,
		ownerName: 'Дмитрий',
		lastModified: '12.03.2026 10:14',
		deadline: '16.03.2026'
	}
]);
