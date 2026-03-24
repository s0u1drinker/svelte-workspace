/** Тип для имени иконки. */
export type TIconName = `${any}${string}:${any}${string}`;

/** Тип для определения заглавной первой буквы. */
export type TCapitalzeFirstChar<S extends string> = S extends `${infer First}${string}`
	? Uppercase<First>
	: S;
