/** Тип для выпадающего меню. */
export interface ISelectData {
	title: string;
	value: string;
}

/** Параметры для возврата: дата + время, дата, время. */
export type TDateParts = 'datetime' | 'date' | 'time';

/** Тип для имени иконки. */
export type TIconName = `${any}${string}:${any}${string}`;

/** Тип для определения заглавной первой буквы. */
export type TCapitalzeFirstChar<S extends string> = S extends `${infer First}${string}`
	? Uppercase<First>
	: S;
