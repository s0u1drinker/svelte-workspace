/** Форматтеры для даты. */
export const DATE_FORMATTER = {
	short: new Intl.DateTimeFormat('ru-RU'),
	textMonth: new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
} as const;
