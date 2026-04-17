<script lang="ts">
  import Icon from "@iconify/svelte";
  import Modal from "./Modal.svelte";
  import ModalText from './ModalText.svelte'
  import Button from "$components/Button.svelte";
	import TaskTypeIndicator from "$components/TaskTypeIndicator.svelte";
	import DeadlineIndicator from "$components/DeadlineIndicator.svelte";
  import { tasksStore } from "$stores/tasks.svelte";
  import { taskStatusStore } from "$stores/taskStatus.svelte";
  import { taskTypeStore } from "$stores/taskType.svelte";
  import { convertDateToString } from "$lib/utils";
  import { TASK_BUTTONS, BUTTON_STYLE } from "$constants";
  import type { IModalTask, TTaskModalButtons, TTaskStatusID, TTaskStatusKey } from '$types'

  let { open = $bindable(false), idTask }: IModalTask = $props();
  let idMap: Record<TTaskStatusKey, TTaskStatusID> = {
    noStatus: taskStatusStore.getStatusForKey('noStatus')!.id,
    sprint: taskStatusStore.getStatusForKey('sprint')!.id,
    inProgress: taskStatusStore.getStatusForKey('inProgress')!.id,
    test: taskStatusStore.getStatusForKey('test')!.id,
    complete: taskStatusStore.getStatusForKey('complete')!.id,
  }
  let modalButtons = $state<TTaskModalButtons>({
    add: {
      title: TASK_BUTTONS.add,
      statusToShow: [idMap.noStatus],
      onClick: () => changeStatusTo(idMap.sprint)
    },
    take: {
      title: TASK_BUTTONS.take,
      statusToShow: [idMap.sprint],
      onClick: () => changeStatusTo(idMap.inProgress)
    },
    delete: {
      title: TASK_BUTTONS.delete,
      buttonStyle: BUTTON_STYLE.danger,
      statusToShow: [idMap.sprint],
      onClick: () => changeStatusTo(idMap.noStatus)
    },
    test: {
      title: TASK_BUTTONS.test,
      statusToShow: [idMap.inProgress],
      onClick: () => changeStatusTo(idMap.test)
    },
    return: {
      title: TASK_BUTTONS.return,
      buttonStyle: BUTTON_STYLE.danger,
      statusToShow: [idMap.test],
      onClick: () => changeStatusTo(idMap.inProgress)
    },
    done: {
      title: TASK_BUTTONS.done,
      buttonStyle: BUTTON_STYLE.success,
      statusToShow: [idMap.test],
      onClick: () => finishTask(idTask)
    },
    close: {
      title: TASK_BUTTONS.close,
      buttonStyle: BUTTON_STYLE.gray,
      onClick: () => closeModal()
    },
  });

  let taskData = $derived(tasksStore.getTaskById(idTask))
  let taskStatus = $derived(taskData?.status ? taskStatusStore.getStatusTitleById(taskData.status) : '-')
  let taskCreated = $derived(taskData?.created ? convertDateToString(taskData.created) : '-');
  let taskDeadline = $derived(taskData?.deadline ? convertDateToString(taskData.deadline) : '-');
  let taskFinished = $derived(taskData?.finished ? convertDateToString(taskData.finished) : '-')

  const closeModal = () => open = false
  /**
   * Меняет статус задачи на указанный и закрывает окно.
   * @param status Новый статус задачи.
   * @param closeModal Закрыть окно после изменения статуса (по умолчанию: true).
   */
  const changeStatusTo = (status: TTaskStatusID, close: boolean = true): void => {
    if (taskData) {
      taskData.status = status

      if (close) {
        closeModal()
      }
    }
  }

  /**
   * Перевод задачи в статус "Завершено".
   * @param id Идентификатор задачи.
   */
  const finishTask = (id: string): void => {
    changeStatusTo(idMap.complete)

    const fieldsToUpdate = {
      finished: new Date().toISOString()
    }
    
    tasksStore.updateTask(id, fieldsToUpdate)
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

    {#snippet buttons()}
      {#each Object.entries(modalButtons) as [key, button] (`modal-button-${key}`)}
        {#if !button?.statusToShow || button.statusToShow.includes(taskData.status)}
          <Button {...button} elevated />
        {/if}
      {/each}
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