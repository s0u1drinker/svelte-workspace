<script lang="ts">
  import Workspace from "$components/Workspace.svelte";
  import Backlog from "$components/Backlog.svelte";
  import { onMount } from 'svelte';
  import { projectsStore } from '$stores/projects.svelte';

onMount(() => {
  projectsStore.loadProjectsFromFirebase()
})
</script>

<Backlog />
<Workspace />

<style></style>