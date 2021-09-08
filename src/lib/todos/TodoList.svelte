<script lang="ts">
  import type { Todo } from "../../types/index";
  import TodoItem from "./TodoItem.svelte";

  export let todoList: Todo[] = [];

  export let removeTodo: (todo: Todo) => void;
  export let markComplete: (todo: Todo) => void;
</script>

<div class="mb-8">
  <h2 class="mb-4 text-4xl font-bold text-blue-900">List Of Todos</h2>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3"
  >
    {#if todoList.length < 1}
      <p class="col-span-6 text-blue-400 text-md">No todo Item available</p>
    {:else}
      {#each todoList as todo (todo.id)}
        <TodoItem {markComplete} todoInfo={todo} {removeTodo} />
      {/each}
    {/if}
  </div>
</div>
