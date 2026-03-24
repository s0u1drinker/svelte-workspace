<script lang="ts">
  import Modal from "./Modal.svelte";
  import ModalText from './ModalText.svelte'
  import Button from "$components/Button.svelte";
  import Icon from "@iconify/svelte";
  import { getTaskById } from "$stores/tasks.svelte";
  import { getTaskStatusByID } from "$lib/utils";
  import { TASK_TYPE, TASK_STATUS, TASK_BUTTONS, BUTTON_STYLE } from "$constants";
  import type { IModalTask, TTaskModalButtons, TTaskStatus } from '$types'

  let { open = $bindable(false), idTask }: IModalTask = $props();
  let modalButtons = $state<TTaskModalButtons>({
    add: {
      title: TASK_BUTTONS.add,
      statusToShow: [TASK_STATUS.noStatus.id],
      onClick: () => changeStatusTo(TASK_STATUS.sprint.id)
    },
    take: {
      title: TASK_BUTTONS.take,
      statusToShow: [TASK_STATUS.sprint.id],
      onClick: () => changeStatusTo(TASK_STATUS.inProgress.id)
    },
    delete: {
      title: TASK_BUTTONS.delete,
      buttonStyle: BUTTON_STYLE.danger,
      statusToShow: [TASK_STATUS.sprint.id],
      onClick: () => changeStatusTo(TASK_STATUS.noStatus.id)
    },
    test: {
      title: TASK_BUTTONS.test,
      statusToShow: [TASK_STATUS.inProgress.id],
      onClick: () => changeStatusTo(TASK_STATUS.test.id)
    },
    return: {
      title: TASK_BUTTONS.return,
      buttonStyle: BUTTON_STYLE.danger,
      statusToShow: [TASK_STATUS.test.id],
      onClick: () => changeStatusTo(TASK_STATUS.inProgress.id)
    },
    done: {
      title: TASK_BUTTONS.done,
      buttonStyle: BUTTON_STYLE.success,
      statusToShow: [TASK_STATUS.test.id],
      onClick: () => changeStatusTo(TASK_STATUS.complete.id)
    },
    close: {
      title: TASK_BUTTONS.close,
      buttonStyle: BUTTON_STYLE.gray,
      onClick: () => closeModal()
    },
  });
  let taskData = $derived(getTaskById(idTask))
  let taskColor = $derived(taskData?.type ? TASK_TYPE[taskData.type].color : 'var(--color-border)')
  let taskStatus = $derived(taskData?.idStatus ? getTaskStatusByID(taskData.idStatus) : '-')

  const closeModal = () => open = false
  /**
   * Меняет статус задачи на указанный и закрывает окно.
   * @param status Новый статус задачи.
   * @param closeModal Закрыть окно после изменения статуса (по умолчанию: true).
   */
  const changeStatusTo = (status: TTaskStatus, close: boolean = true): void => {
    if (taskData) {
      taskData.idStatus = status

      if (close) {
        closeModal()
      }
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
      <h3><span style:color={taskData.urgent ? 'var(--color-danger)' : 'var(--color-primary)'}>{`#${taskData.idTask}`}</span> {taskData.title}</h3>
    {/snippet}

    <div class="modal-task__info">
      <span class="modal-task__created">{taskData.created}</span>
      <span class="modal-task__status">{taskStatus}</span>
    </div>
    <div class="modal-task__descr">{taskData.descr}</div>

    <div class="modal-task__item">
      <span class="modal-task__label">Тип задачи:</span>
      <div class="modal-task__task-type-color" style:--task-type-color={taskColor}></div>
      {TASK_TYPE[taskData.type].title}
    </div>
    <div class="modal-task__item">
      <span class="modal-task__label">Выполнить до:</span>
      {taskData.deadline}
    </div>
    {#if taskData.urgent}
      <Icon
        icon="mdi:fire"
        class="modal-task__urgent"
      />
    {/if}

    {#snippet buttons()}
      {#each Object.entries(modalButtons) as [key, button] (`modal-button-${key}`)}
        {#if !button?.statusToShow || button.statusToShow.includes(taskData.idStatus)}
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

      & + & {
        margin-top: 1rem;
      }
    }

    &__label {
      display: inline-block;
      width: 8rem;
      text-decoration: underline;
    }

    &__task-type-color {
      width: 1rem;
      height: 1rem;
      background-color: var(--task-type-color);
      margin-right: .5rem;
      border-radius: var(--radius-full);
    }
  }
</style>