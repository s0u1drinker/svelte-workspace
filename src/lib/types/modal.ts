import type { Snippet } from 'svelte';

export interface IModal {
	open: boolean;
	header?: Snippet;
	children?: Snippet;
	buttons?: Snippet;
	onClose?: () => void;
	closable?: boolean;
}
