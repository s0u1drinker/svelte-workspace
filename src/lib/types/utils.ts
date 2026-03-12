/** Тип для определения заглавной первой буквы. */
export type TCapitalzeFirstChar<S extends string> = S extends `${infer First}${string}`
	? Uppercase<First>
	: S;
