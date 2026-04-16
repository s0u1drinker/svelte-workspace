<script lang="ts">
  import { FORM_ID } from '$constants';
  import type { TFormLogin } from '$types';

  let { onSubmit }: TFormLogin = $props();
  let email = $state('');
  let password = $state('');

  function handleSubmit(event: Event) {
    event.preventDefault();

    onSubmit?.({ email, password })
  }
</script>

<form
  id={FORM_ID.login}
  class="form"
  onsubmit={handleSubmit}
>
  <label
    class="form__item"
  >
    <span class="form__label">E-mail</span>
    <input
      class="input"
      type="email"
      bind:value={email}
      placeholder="user@example.com"
      required
      disabled
    />
  </label>

  <label
    class="form__item"
  >
    <span class="form__label">Пароль</span>
    <input
      class="input"
      type="password"
      bind:value={password}
      placeholder="••••••••"
      required
      disabled
    />
  </label>
</form>

<style lang="postcss"></style>
