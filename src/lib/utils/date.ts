import { DATE_FORMATTER } from '$constants';

/**
 * Форматирует строку с датой в локализованный читаемый вид.
 * Если дата не передана или пустая, возвращает заглушку 'Дата не указана'.
 *
 * @param date - Строка с датой в ISO-формате.
 * @param formatter - Форматтер Intl.DateTimeFormat. Можно взять из константы DATE_FORMATTER. По умолчанию выводит .
 * @returns Отформатированная строка.
 */
export function getFormatDate(
	date: string,
	formatter: Intl.DateTimeFormat = DATE_FORMATTER.short
): string {
	if (!date) return 'Дата не указана';

	return formatter.format(new Date(date));
}

/**
 * Нормализует ISO-строку даты, обрезая время до 00:00:00.
 *
 * @example
 * normalizeIsoDate('2026-04-13T16:33:12.000Z') => '2026-04-13'
 */
export function normalizeISODate(isoString: string): string {
	if (!isoString) return '';

	return isoString.split('T')[0];
}

/**
 * Проверяет, является ли вторая дата более поздней, чем первая.
 *
 * @param baseDate - Базовая дата в формате ISO.
 * @param targetDate - Проверяемая дата в формате ISO.
 * @returns true, если targetDate позже baseDate, иначе false.
 */
export function isDateLater(baseDate: string, targetDate: string): boolean {
	const time1 = new Date(baseDate).getTime();
	const time2 = new Date(targetDate).getTime();

	if (Number.isNaN(time1) || Number.isNaN(time2)) {
		console.warn('[utils/isDateLater] Переданы невалидные даты.');

		return false;
	}

	return time2 > time1;
}

/**
 * Форматирует объект Date в строку с учётом локального часового пояса пользователя.
 * @param date Дата.
 * @returns Строка для использования в input[type="datetime-local"]
 * @example '2026-04-04T13:33'
 */
export function getLocaleISOString(date: Date = new Date()): string {
	try {
		const pad = (num: number) => num.toString().padStart(2, '0');

		const year = date.getFullYear();
		const month = pad(date.getMonth() + 1);
		const day = pad(date.getDate());
		const hours = pad(date.getHours());
		const minutes = pad(date.getMinutes());

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	} catch (e) {
		console.warn('[utils/getLocaleISOString] Ошибка при работе с датой: ', e);

		return '';
	}
}
