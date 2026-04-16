<script lang="ts">
  import Button from "$components/Button.svelte";
  import ModalLogin from "$components/Modal/ModalLogin.svelte";
  import { BUTTON_STYLE } from "$constants";

  let open = $state<boolean>(false);
</script>

<div class="user-panel">
  <Button
    title="Войти"
    buttonStyle={BUTTON_STYLE.primary}
    onClick={() => open = true}
  />

  <ModalLogin
    bind:open
  />
</div>

<style>
  .user-panel {
    display: flex;
    justify-content: end;
  }
</style>