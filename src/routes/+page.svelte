<script lang="ts">
  import Workspace from "$components/Workspace.svelte";
  import Backlog from "$components/Backlog.svelte";
  import { onMount } from 'svelte';
  import { projectsStore } from '$stores/projects.svelte';
  import { taskStatusStore } from "$stores/taskStatus.svelte";
  import { taskTypeStore } from "$stores/taskType.svelte";

onMount(() => {
  projectsStore.loadProjectsFromFirebase()
  taskStatusStore.loadTaskStatusFromFirebase()
  taskTypeStore.loadTaskTypeFromFirebase()
})
</script>

<Backlog />
<Workspace />

<style></style>