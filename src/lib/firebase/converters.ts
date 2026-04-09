import type { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import type { IProject, TProjectInDB } from '$types';

export const projectConverter = {
	toFirestore: (project: IProject): TProjectInDB => {
		const { id, ...data } = project;

		return data;
	},
	fromFirestore: (
		snapshot: QueryDocumentSnapshot<TProjectInDB>,
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
