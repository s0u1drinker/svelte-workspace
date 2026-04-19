import DOMPurify from 'dompurify';
import { SvelteDate } from 'svelte/reactivity';
import type { TDateParts, TGroupedData, IFilter, ITask } from '$types';

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

/**
 * TODO: Посмотреть "свежим" взглядом и сделать рефакторинг.
 * Группировка данных по заданному параметру.
 * @param data Массив объектов.
 * @param param Ключ объекта, по которому будет происходить группировка.
 * @param transformKey Функция для преобразования значения ключа перед группировкой.
 * @returns Map, где ключ — значение параметра (или undefined), а значение — массив объектов.
 */
export function groupDataBy<T extends object, K extends keyof T>(
	data: T[],
	param: K,
	transformKey?: (value: T[K]) => string
): TGroupedData<T> {
	const grouped: TGroupedData<T> = new Map();

	if (!Array.isArray(data)) {
		console.warn('[utils/groupDataBy] Некорректный массив данных.');

		return grouped;
	}

	if (!data.length) {
		return grouped;
	}

	for (const item of data) {
		if (!Object.hasOwn(item, param)) {
			const emptyGroup = grouped.get('');

			if (emptyGroup) {
				emptyGroup.push(item);
			} else {
				grouped.set('', [item]);
			}
			continue;
		}

		const rawValue = item[param];
		let key: string | number;

		if (transformKey) {
			key = transformKey(rawValue);
		} else {
			key = String(rawValue);
		}

		const existingGroup = grouped.get(key);

		if (existingGroup) {
			existingGroup.push(item);
		} else {
			grouped.set(key, [item]);
		}
	}

	return grouped;
}

/**
 * FIXME: Сейчас функция сортирует только по дате.
 * Сортировка сгруппированных данных по наименованию группы.
 * @param data Данные.
 * @param dir Сортировка по возрастанию (asc) или убыванию (desc).
 * @returns Отсортированный массив.
 */
export function sortGroupedDataByGroup<T extends object>(
	data: TGroupedData<T>,
	dir: 'asc' | 'desc' = 'asc'
): TGroupedData<T> {
	const sorted = [...data.entries()].sort(([dateA], [dateB]) => {
		const timeA = dateA ? new Date(dateA).getTime() : -Infinity;
		const timeB = dateB ? new Date(dateB).getTime() : -Infinity;

		return dir === 'asc' ? timeA - timeB : timeB - timeA;
	});

	return new Map(sorted);
}

/**
 * FIXME: Фильтрация работает только по фильтру searchText для идентификатора задачи.
 * Фильтрация сгруппированных данных.
 * @param data Данные.
 * @param filters Фильтры.
 * @returns Отфильтрованный массив.
 */
export function filterGroupedData<T extends ITask>(
	data: TGroupedData<T>,
	filters: IFilter
): TGroupedData<T> {
	if (!filters.searchText) return data;

	const search = filters.searchText.toLowerCase();
	const filteredMap: TGroupedData<T> = new Map();

	data.forEach((items, key) => {
		const filteredItems = items.filter((item) => item.idTask.toLowerCase().includes(search));

		if (filteredItems?.length) {
			filteredMap.set(key, filteredItems);
		}
	});

	return filteredMap;
}
