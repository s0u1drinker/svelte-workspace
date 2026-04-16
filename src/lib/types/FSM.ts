import { LOGIN_STAGES } from '$constants';

interface ILoginStage {
	header: string;
	text: string;
	buttonNextText: string;
	buttonCancelText: string;
}

export type TLoginStageName = (typeof LOGIN_STAGES)[number];

export type TLoginStages = Record<TLoginStageName, ILoginStage>;
