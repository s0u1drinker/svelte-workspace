<script lang="ts">
  import Modal from "./Modal.svelte";
  import ModalProjectsList from "$components/Modal/ModalProjectsList.svelte";
  import type { IModalProjects } from '$types'

  let { open = $bindable(false) }: IModalProjects = $props();

  const closeModal = () => open = false
</script>

<Modal
  bind:open
  class="modal-projects"
>
  {#snippet header()}
    <h3>Выберите проект</h3>
  {/snippet}

  <ModalProjectsList onclick={closeModal} />
</Modal>

<style lang="postcss">
  :global(.modal-projects) {
    width: 30rem;
  }
</style>