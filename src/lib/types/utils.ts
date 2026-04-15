/** Тип для выпадающего меню. */
export interface ISelectData {
	title: string;
	value: string;
}

/** Тип для списка вкладок. */
declare const __TTabListItemIDBrand: unique symbol;

export type TTabListItemID = number & { [__TTabListItemIDBrand]: void };

export interface ITabListItem {
	id: TTabListItemID;
	title: string;
}

export const createTabID = (id: number): TTabListItemID => {
	return id as TTabListItemID;
};

export interface ITabList {
	name: string;
	tabs: ITabListItem[];
	selectedTab: TTabListItemID;
}

/** Параметры для возврата: дата + время, дата, время. */
export type TDateParts = 'datetime' | 'date' | 'time';

/** Тип для имени иконки. */
export type TIconName = `${any}${string}:${any}${string}`;

/** Тип для определения заглавной первой буквы. */
export type TCapitalzeFirstChar<S extends string> = S extends `${infer First}${string}`
	? Uppercase<First>
	: S;

/** Тип для сгруппированных данных. */
export type TGroupedData<T extends object> = Map<string, T[]>;

/** Тип для фильтров данных. */
export interface IFilter {
	searchText?: string;
}
