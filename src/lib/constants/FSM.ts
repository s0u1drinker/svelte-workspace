import type { TLoginStages, TLoginStageName } from '$types';

export const LOGIN_STAGES = [
	'stage1',
	'stage2',
	'stage3',
	'stage4',
	'stage5',
	'stage6',
	'stage7'
] as const;

export const LOGIN_STAGE_DATA = {
	stage1: {
		header: 'Пока не работает',
		text: 'К сожалению, данный функционал временно недоступен. Приношу свои искренние извинения и смею заверить, что в скором времени функция аутентификации будет реализована.',
		buttonNextText: 'Я настаиваю',
		buttonCancelText: 'Ок'
	},
	stage2: {
		header: 'Сожалею, но это невозможно',
		text: 'Повторюсь, функция не реализована, пройти аутентификацию Вы не сможете.',
		buttonNextText: 'Я видел код в исходниках',
		buttonCancelText: 'Ок'
	},
	stage3: {
		header: 'Это псевдокод',
		text: 'Он не работает должным образом.',
		buttonNextText: 'А ты покажи',
		buttonCancelText: 'Ну ладно'
	},
	stage4: {
		header: 'Отстань',
		text: 'Иначе я тебя по IP вычислю.',
		buttonNextText: 'Я через VPN',
		buttonCancelText: 'Уп-с...'
	},
	stage5: {
		header: 'Попался!',
		text: 'Тогда я на тебя в РКН, МФЦ и другие "страшные" буквы пожалуюсь. Так что "Извинись!" и иди своей дорогой...',
		buttonNextText: 'Неть',
		buttonCancelText: 'Извините'
	},
	stage6: {
		header: 'Надоело',
		text: 'Ну держи, сам напросился...',
		buttonNextText: 'Ура!',
		buttonCancelText: 'Мне уже не надо'
	},
	stage7: {
		header: 'Форма входа',
		text: '',
		buttonNextText: '',
		buttonCancelText: 'Отмена'
	}
} as const satisfies TLoginStages;

export const LOGIN_STAGE_COUNT = LOGIN_STAGES.length;
