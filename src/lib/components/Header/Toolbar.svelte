<script lang="ts">
  import Button from '$components/Button.svelte'
  import ModalText from '$components/Modal/ModalText.svelte';
  import ModalTaskAdd from '$components/Modal/ModalTaskAdd.svelte';
  import { projectsStore } from '$stores/projects.svelte';
  import { BUTTON_STYLE } from '$constants';

  let modalTextShowed = $state<boolean>(false);
  let open = $state<boolean>(false);

  const closeModalText = () => {
    modalTextShowed = true
  }
</script>

<div class="toolbar">
  <Button
    title="Добавить задачу"
    buttonStyle={BUTTON_STYLE.gray}
    icon="mdi:add"
    outline
    onClick={() => open = true}
    disabled={!projectsStore.currentProjectID}
  />
</div>

{#if !modalTextShowed}
  <ModalText
    bind:open
    title="Простите, не узнаю Вас в гриме..."
    text="Для добавления новой задачи Вам необходимо пройти процесс аутентификации. Но, как Вы, наверное, успели заметить, данная функция сейчас недоступна. Поэтому Ваша задача будет добавлена в хранилище и исчезнет после перезагрузки страницы =("
    buttonText="Не согласен"
    buttonStyle={BUTTON_STYLE.gray}
  >
    {#snippet buttons()}
      <Button
        title="Всё понятно"
        onClick={closeModalText}
        elevated
      />
    {/snippet}
  </ModalText>
{:else}
  <ModalTaskAdd bind:open />
{/if}

<style lang="postcss">
  .toolbar {
    padding: var(--indent-quarter);
    border-top: var(--border);

    @media (--viewport-md) {
      padding: var(--indent-half);
    }

    @media (--viewport-xl) {
      padding: var(--indent-half) var(--indent);
    }
  }
</style>