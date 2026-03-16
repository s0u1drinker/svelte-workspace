import type { TTaskStatus } from '$types';

export interface IDashboardColumn {
	taskStatus: TTaskStatus;
	class: string;
}
