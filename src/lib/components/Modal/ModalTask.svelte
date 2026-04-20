<script lang="ts">
  import Icon from "@iconify/svelte";
  import Modal from "./Modal.svelte";
  import ModalText from './ModalText.svelte'
	import TaskTypeIndicator from "$components/TaskTypeIndicator.svelte";
	import DeadlineIndicator from "$components/DeadlineIndicator.svelte";
	import IconCustom from "$components/IconCustom.svelte";
  import ModalButtonsDefault from "$components/ModalButtons/ModalButtonsDefault.svelte";
  import { tasksStore } from "$stores/tasks.svelte";
  import { taskStatusStore } from "$stores/taskStatus.svelte";
  import { taskTypeStore } from "$stores/taskType.svelte";
  import { TASK_STATUS_MAP } from "$constants";
  import { convertDateToString } from "$lib/utils";
  import type { IModalTask, TTaskStatusID } from '$types'
	import ModalButtonsDelete from "$components/ModalButtons/ModalButtonsDelete.svelte";

  let { open = $bindable(false), idTask }: IModalTask = $props();
  let showDeleteButtons = $state<boolean>(false);
  let isBeingRemoved = $state<boolean>(false);
  let messageText = $state<string>('');

  let isProcessing = $derived<boolean>(isBeingRemoved);
  let taskData = $derived(tasksStore.getTaskById(idTask))
  let taskStatus = $derived(taskData?.status ? taskStatusStore.getStatusTitleById(taskData.status) : '-')
  let taskCreated = $derived(taskData?.created ? convertDateToString(taskData.created) : '-');
  let taskDeadline = $derived(taskData?.deadline ? convertDateToString(taskData.deadline) : '-');
  let taskFinished = $derived(taskData?.finished ? convertDateToString(taskData.finished) : '-')

  const closeModal = (callback?: () => void) => {
    open = false

    if (callback) {
      setTimeout(() => callback(), 600)
    }
  }

  /**
   * Меняет статус задачи на указанный и закрывает окно.
   * @param status Новый статус задачи.
   */
  const changeStatusTo = (status: TTaskStatusID): void => {
    if (taskData) {
      taskData.status = status
      closeModal();
    }
  }

  /** Перевод задачи в статус "Завершено". */
  const finishTask = (): void => {
    changeStatusTo(TASK_STATUS_MAP.complete)

    const fieldsToUpdate = {
      finished: new Date().toISOString()
    }
    
    tasksStore.updateTask(idTask, fieldsToUpdate)
  }

  /** Удаляет задачу по идентификатору. */
  const deleteTask = () => {
    showDeleteButtons = false;
    isBeingRemoved = true;

    const isDeletionSuccess = tasksStore.deleteTask(idTask)

    if (isDeletionSuccess) {
      closeModal(() => isBeingRemoved = false);
    } else {
      messageText = 'Не удалось удалить задачу. Попробуйте позже.';
      isBeingRemoved = false;
    }
  }
</script>

{#if taskData}
  <Modal
    bind:open
    position="left"
    class="modal-task"
  >
    {#snippet header()}
      <h3><span style:color={taskData.urgent ? 'var(--color-danger)' : 'var(--color-primary)'}>{`#${taskData.idTask}`}</span> {taskData.subject}</h3>
    {/snippet}

    <div class="modal-task__info">
      <span class="modal-task__created">{taskCreated}</span>
      <span class="modal-task__status">{taskStatus}</span>
    </div>
    <div class="modal-task__descr">{taskData.description}</div>

    <div class="modal-task__item">
      <span class="modal-task__label">Тип задачи:</span>
      <TaskTypeIndicator taskType={taskData.type} />
      {taskTypeStore.getPropertyOfTypeById(taskData.type, 'title')}
    </div>
    <div class="modal-task__item">
      <span class="modal-task__label">Выполнить до:</span>
      {taskDeadline}
    </div>
    {#if taskData.finished}
      <div class="modal-task__item">
        <span class="modal-task__label">Выполнено:</span>
        {taskFinished}
        <DeadlineIndicator
          deadline={taskData.deadline}
          finished={taskData.finished}
          showDate={false}
        />
      </div>
    {/if}
    {#if taskData.urgent}
      <Icon
        icon="mdi:fire"
        class="modal-task__urgent"
      />
    {/if}

    {#snippet message()}
      {#if showDeleteButtons}
        <span><IconCustom icon-name="warning" color="var(--color-danger)" /> Вы действительно хотите удалить задачу?</span>
        <span>(Она всё-равно &laquo;вернётся&raquo; после обновления страницы<br/>или выбора другого проекта)</span>
      {:else if isProcessing}
        <span>
          <Icon icon='svg-spinners:180-ring' />
          {isBeingRemoved ? 'Удаляю задачу...' : 'Процесс идёт...'}
        </span>
      {:else}
        {messageText}
      {/if}
    {/snippet}

    {#snippet buttons()}
      {#if showDeleteButtons}
        <ModalButtonsDelete
          onDelete={deleteTask}
          onCancel={() => showDeleteButtons = false}
        />
      {:else}
        <ModalButtonsDefault
          taskStatus={taskData.status}
          disabled={isProcessing}
          onClose={closeModal}
          onChangeStatus={changeStatusTo}
          onComplete={finishTask}
          onDelete={() => showDeleteButtons = true}
        />
      {/if}
    {/snippet}
  </Modal>
{:else}
  <ModalText
    bind:open
    text="Не найдена задача с таким идентификатором."
  />
{/if}

<style lang="postcss">
  :global(.modal-task) {
    width: 40rem;

    h3 {
      text-align: left;
    }
  }

  :global(.modal-task__urgent) {
    width: 7rem;
    height: 7rem;
    position: absolute;
    right: 2rem;
    bottom: 9rem;
    opacity: .5;
    color: var(--color-danger);
  }

  .modal-task {

    &__info {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      font-style: italic;
    }

    &__created {
      color: var(--gray);
    }

    &__descr {
      margin: 2rem 0;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: var(--indent-half);

      & + & {
        margin-top: 1rem;
      }
    }

    &__label {
      display: inline-block;
      width: 8rem;
      text-decoration: underline;
    }
  }
</style>