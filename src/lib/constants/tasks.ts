/** Статус задачи. */
export const TASK_STATUS = ['noStatus', 'sprint', 'inProgress', 'test', 'complete'] as const;

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
