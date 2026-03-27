<script lang="ts">
  import Modal from "./Modal.svelte";
  import { projectsStore } from "$stores/projects.svelte";
  import Button from "$components/Button.svelte";
	import FormNewTask from "$components/Form/FormNewTask.svelte";
  import { FORM_ID, FORM_STATUS } from "$constants";
  import { addTask } from "$stores/tasks.svelte";
  import type { IModalTaskAdd, TTaskFormData } from "$types";

  let { open = $bindable(false) }: IModalTaskAdd = $props();
  let message: string = $state('');
  let messageColor: string = $state('');
  let formRef: FormNewTask | undefined = $state();

  const clearMessage = () => message = ''
  const clearForm = () => {
    setTimeout(() => {
      formRef?.clearForm()
      clearMessage()
    }, 1000)
  }
  const closeModal = () => {
    open = false
  }
  const handleFormSave = (data: TTaskFormData) => {
    if (data.formStatus === FORM_STATUS.success) {
      const resultAddTask = addTask(data);

      if (resultAddTask) {
        messageColor = 'var(--color-success)';
        message = 'Задача добавлена успешно'

        setTimeout(closeModal, 1000)
      }
    } else {
      messageColor = 'var(--color-danger)';
      message = data.error
    }
  }
</script>

<Modal
  bind:open
  class="modal-new-task"
  position="left"
  onClose={clearForm}
>
  {#snippet header()}
    <h3 class="modal-new-task__header">Новая задача для &laquo;{projectsStore.currentProjectName}&raquo;</h3>
  {/snippet}

  <div class="modal-new-task__form">
    <FormNewTask
      bind:this={formRef}
      onSubmit={handleFormSave}
    />
  </div>
  <div
    class="modal-new-task__message"
    style:color={messageColor}
  >{message}</div>

  {#snippet buttons()}
    <Button
      type="submit"
      title="Сохранить"
      elevated
      form={FORM_ID.newTask}
    />
    <Button
      type="reset"
      title="Очистить"
      outline
      elevated
      form={FORM_ID.newTask}
      onClick={clearMessage}
    />
    <Button
      title="Отмена"
      buttonStyle="gray"
      elevated
      onClick={closeModal}
    />
  {/snippet}
</Modal>

<style lang="postcss">
  .modal-new-task {
    :global(&) {
      width: 32rem;
    }

    &__header {
      text-align: center;
    }
    
    &__form {
      height: 100%;
    }

    &__message {
      text-align: center;
    }
  }

  :global(.modal__body) {
    display: flex;
    flex-direction: column;
  }
</style>