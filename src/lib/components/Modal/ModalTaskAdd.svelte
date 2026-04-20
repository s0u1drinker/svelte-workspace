<script lang="ts">
  import Modal from "./Modal.svelte";
  import { projectsStore } from "$stores/projects.svelte";
  import Button from "$components/Button.svelte";
	import FormNewTask from "$components/Form/FormNewTask.svelte";
  import { FORM_ID, FORM_STATUS } from "$constants";
  import { tasksStore } from "$stores/tasks.svelte";
  import type { IModalTaskAdd, TTaskFormData } from "$types";

  let { open = $bindable(false) }: IModalTaskAdd = $props();
  let messageText: string = $state('');
  let messageColor: string = $state('');
  let formRef: FormNewTask | undefined = $state();

  const clearMessage = () => messageText = ''
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
      const resultAddTask = tasksStore.addTask(data);

      if (resultAddTask) {
        messageColor = 'var(--color-success)';
        messageText = 'Задача добавлена успешно'

        setTimeout(closeModal, 1000)
      }
    } else {
      messageColor = 'var(--color-danger)';
      messageText = data.error
    }
  }
</script>

<Modal
  bind:open
  class="modal-new-task"
  position="left"
  onClose={clearForm}
  {messageColor}
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
  
  {#snippet message()}
    {messageText}
  {/snippet}

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
  }

  :global(.modal__body) {
    display: flex;
    flex-direction: column;
  }
</style>