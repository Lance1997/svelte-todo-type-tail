<script lang="ts">
  import type { Todo } from "src/types";
  import TodoItem from "./TodoItem.svelte";

  export let todoList: Todo[] = [];
</script>

<div>
  <h2 class="font-bold mb-4 text-4xl text-blue-900">List Of Todos</h2>
  <div
    class="grid sm:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-4 grid-cols-1"
  >
    {#each todoList as todo (todo.id)}
      <TodoItem todoInfo={todo} />
    {/each}
  </div>
</div>
