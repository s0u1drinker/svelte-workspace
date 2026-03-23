/** Типы задач. */
export const TASK_TYPE = {
	bug: {
		title: 'Баг',
		prefix: 'B',
		color: 'tomato'
	},
	feature: {
		title: 'Новый функционал',
		prefix: 'F',
		color: 'purple'
	},
	task: {
		title: 'Общая',
		prefix: 'T',
		color: 'skyblue'
	}
} as const;

/** Статус задачи. */
export const TASK_STATUS = {
	noStatus: {
		id: 'noStatus',
		title: 'Без статуса'
	},
	sprint: {
		id: 'sprint',
		title: 'Спринт'
	},
	inProgress: {
		id: 'inProgress',
		title: 'В работе'
	},
	test: {
		id: 'test',
		title: 'Тестирование'
	},
	complete: {
		id: 'complete',
		title: 'Завершено'
	}
} as const;

/** Кнопки в модальном окне. */
export const TASK_BUTTONS = {
	add: 'Добавить в спринт',
	take: 'Взять в работу',
	delete: 'Удалить',
	test: 'На тест',
	return: 'Вернуть в работу',
	done: 'Готово',
	close: 'Закрыть'
} as const;
