import DOMPurify from 'dompurify';
import { SvelteDate } from 'svelte/reactivity';
import type { TDateParts } from '$types';

/**
 * "Очистка" строк от вредного и лишнего.
 * @param value Строка для очистки.
 * @returns "Чистая" строка, которую можно добавлять в БД.
 */
export function sanitizeString(value: string): string {
	return DOMPurify.sanitize(value);
}

/**
 * Конвертирует дату в строку и возвращает часть, указанную вторым параметром.
 * По умолчанию возвращает: дата + время.
 * @param datetime Строка в формате ISO.
 * @param part Часть для возврата: дата + время, дата, время.
 */
export function convertDateToString(datetime: string, part?: TDateParts): string {
	const datetimeString = new SvelteDate(datetime).toLocaleString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
	const [date, time] = datetimeString.split(', ');

	return part === 'date' ? date : part === 'time' ? time : `${date} ${time}`;
}
