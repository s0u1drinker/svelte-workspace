<script lang="ts">
  import { page } from '$app/state';
  import Modal from "./Modal.svelte";
  import Button from "$components/Button.svelte";
  import FormLogin from "$components/Form/FormLogin.svelte";
  import { FORM_ID, LOGIN_STAGE_DATA, LOGIN_STAGES, LOGIN_STAGE_COUNT } from "$constants";
  import type { IFormLoginData, TLoginStageName } from "$types";

  let { open = $bindable(false) }: { open: boolean } = $props();
  let stopTextElement = $state<HTMLDivElement | null>(null);
  let stageIndex = $state(0);
  let stageName = $derived<TLoginStageName>(LOGIN_STAGES[stageIndex]);
  let showFunnyModal = $derived((stageIndex + 1) < LOGIN_STAGE_COUNT)
  let funnyButtonNextText = $derived(stageName === 'stage4' ? page.data.ip || LOGIN_STAGE_DATA[stageName].buttonNextText : LOGIN_STAGE_DATA[stageName].buttonNextText);

  const closeModal = () => open = false;

  const nextModal = () => stageIndex++

  const handleLogin = (data: IFormLoginData) => {
    console.log('Вход с данными:', data);

    animateStopText();
  }

  function animateStopText() {
    if (!stopTextElement) return;

    stopTextElement.getAnimations().forEach(a => a.cancel());

    stopTextElement.animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.05)' },
        { transform: 'scale(0.95)' },
        { transform: 'scale(1)', opacity: .5 }
      ],
      {
        duration: 1000,
        easing: 'ease-in-out'
      }
    );
  }
</script>

<Modal
  bind:open
  showCloseButton={false}
  class="modal-login"
>
  {#snippet header()}
    <h3>{LOGIN_STAGE_DATA[stageName].header}</h3>
  {/snippet}

  {#if showFunnyModal}
    <p class="modal-login__funny-text">{LOGIN_STAGE_DATA[stageName].text}</p>
  {:else}
    <FormLogin
      onSubmit={handleLogin}
    />
    <div
      class="modal-login__stop-text"
      bind:this={stopTextElement}
    >Форма<br/>не работает</div>
  {/if}

  {#snippet buttons()}
    {#if showFunnyModal}
      <Button
        title={funnyButtonNextText}
        elevated
        onClick={nextModal}
      />
    {:else}
      <Button
        type="submit"
        title="Войти"
        elevated
        form={FORM_ID.login}
      />
    {/if}
    <Button
      title={LOGIN_STAGE_DATA[stageName].buttonCancelText}
      buttonStyle="gray"
      elevated
      onClick={closeModal}
    />
  {/snippet}
</Modal>

<style lang="postcss">
  .modal-login {
    
    :global(&) {
      position: relative;
      width: 25rem;
      overflow: hidden;
    }

    :global(& .modal__buttons) {
      margin-top: 2rem;
    }

    :global(& .form__label) {
      width: 5rem;
    }

    &__stop-text {
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      color: var(--color-danger);
      opacity: .5;
      font-size: 3rem;
      font-weight: bolder;
      user-select: none;
      translate: -50% -50%;
    }

    &__funny-text {
      text-align: center;
    }
  }
</style>