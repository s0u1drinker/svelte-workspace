<script lang="ts">
  import { FORM_ID, FORM_FIELD_NAME, FORM_STATUS, TASK_STATUS_MAP } from "$constants";
  import { taskTypeStore } from "$stores/taskType.svelte";
  import { taskStatusStore } from "$stores/taskStatus.svelte";
  import { sanitizeString, getLocaleISOString } from "$lib/utils";
  import type { TFormNewTask, ITaskFormDataPayload, ITaskFormDataError, TTaskTypeID } from "$types";

  const ID = FORM_ID.newTask;
  const SUBJECT_NAME = FORM_FIELD_NAME[ID].subject
  const DESCRIPTION_NAME = FORM_FIELD_NAME[ID].description
  const MIN_DATE = getLocaleISOString()
  const INITIAL_DATA: ITaskFormDataPayload = {
    formStatus: FORM_STATUS.success,
    subject: '',
    description: '',
    type: Object.keys(taskTypeStore.types)[0] as TTaskTypeID,
    deadline: MIN_DATE,
    status: TASK_STATUS_MAP.noStatus,
    urgent: false,
  }

  let { onSubmit }: TFormNewTask = $props();
  let errors = $state<Record<string, boolean>>({});
  let formData = $state<ITaskFormDataPayload>({...INITIAL_DATA});
  let formError = $state<ITaskFormDataError>({
    formStatus: FORM_STATUS.error,
    error: '',
  })
  let status = $derived(taskStatusStore.getStatusesForSelect());
  let taskTypes = $derived(taskTypeStore.getTypesForSelect());

  $effect(() => {
    const {subject, description} = formData;

    if (subject.trim().length > 0) {
      errors.subject = false
    }

    if (description.trim().length > 0) {
      errors.description = false
    }
  });

  function handleSubmit(event: Event) {
    event.preventDefault();

    clearErrors()

    const subject = sanitizeString(formData.subject);
    const description = sanitizeString(formData.description);

    if (!subject.length) {
      errors.subject = true;
      formError.error = `Необходимо заполнить поле "${SUBJECT_NAME}"`;
      onSubmit?.(formError);
      return
    }

    if (!description.length) {
      errors.description = true;
      formError.error = `Необходимо заполнить поле "${DESCRIPTION_NAME}"`;
      onSubmit?.(formError);
      return
    }

    onSubmit?.({
      formStatus: FORM_STATUS.success,
      subject,
      description,
      type: formData.type,
      deadline: formData.deadline && new Date(formData.deadline).toISOString(),
      status: formData.status,
      urgent: formData.urgent,
    });
  }

  function clearErrors() {
    errors = {}
    formError.error = '';
  }

  export function clearForm() {
    clearErrors()
    
    formData = { ...INITIAL_DATA }
  }
</script>

<form
  id={ID}
  class="form"
  onsubmit={handleSubmit}
  onreset={clearErrors}
>
  <label
    class="form__item"
    class:error={errors.subject}
  >
    <span class="form__label">{SUBJECT_NAME}<span class="color_danger">*</span></span>
    <input
      class="input"
      type="text"
      bind:value={formData.subject}
    />
  </label>
  <label
    class="form__item"
    class:error={errors.description}
  >
    <span class="form__label">{DESCRIPTION_NAME}<span class="color_danger">*</span></span>
    <textarea
      class="input"
      rows="3"
      bind:value={formData.description}
    ></textarea>
  </label>
  <label class="form__item">
    <span class="form__label">Тип задачи</span>
    <select
      class="input"
      bind:value={formData.type}
    >
      {#each taskTypes as t (`select-type-${t.value}`)}
        <option value={t.value}>{t.title}</option>
      {/each}
    </select>
  </label>
  <label class="form__item">
    <span class="form__label">Выполнить до</span>
    <input
      class="input"
      type="datetime-local"
      min={MIN_DATE}
      bind:value={formData.deadline}
    />
  </label>
  <label class="form__item">
    <span class="form__label">Добавить в</span>
    <select
      class="input"
      bind:value={formData.status}
    >
      {#each status as s (`select-status-${s.value}`)}
        <option value={s.value}>{s.title}</option>
      {/each}
    </select>
  </label>
  <label class="form__item">
    <span class="form__label">Срочно</span>
    <input
      class="align-self_center"
      type="checkbox"
      bind:checked={formData.urgent}
    />
  </label>
</form>


<style lang="postcss">
  @keyframes pulse-error {
    from { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4); }
    to { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
  }

  .error {
    .form__label {
      color: var(--color-danger);
    }

    .input {
      border-color: var(--color-danger);
      animation: pulse-error 1s linear infinite;
    }
  }
</style>