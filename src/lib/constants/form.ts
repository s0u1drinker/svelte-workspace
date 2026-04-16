export const FORM_ID = {
	newTask: 'form-new-task',
	login: 'login'
} as const;

export const FORM_FIELD_NAME = {
	'form-new-task': {
		subject: 'Тема',
		description: 'Описание'
	}
} as const;

export const FORM_STATUS = {
	error: 'error',
	success: 'success'
} as const;
