import type { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import type { IProject, TProjectFromDB } from '$types';

export const projectConverter = {
	toFirestore: (project: IProject): TProjectFromDB => {
		const { id, ...data } = project;

		return data;
	},
	fromFirestore: (
		snapshot: QueryDocumentSnapshot<TProjectFromDB>,
		options: SnapshotOptions
	): IProject => {
		const data = snapshot.data(options);

		return {
			id: snapshot.id,
			name: data.name,
			description: data.description,
			icon: data.icon,
			order: data.order
		};
	}
};
