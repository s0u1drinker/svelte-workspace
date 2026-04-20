/** Статус задачи. */
export const TASK_STATUS = ['noStatus', 'sprint', 'inProgress', 'test', 'complete'] as const;

/** Кнопки в модальном окне. */
export const TASK_BUTTONS = {
	add: 'В спринт',
	take: 'В работу',
	toBacklog: 'Вернуть в список',
	delete: 'Удалить',
	test: 'На тест',
	return: 'Вернуть в работу',
	done: 'Готово',
	close: 'Закрыть'
} as const;
