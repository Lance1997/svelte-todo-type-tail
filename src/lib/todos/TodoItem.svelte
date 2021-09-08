<script lang="ts">
  import type { Todo } from "../../types/index";
  import Swal from "sweetalert2";

  // Modal properties
  let isOpen = false;

  export let todoInfo: Todo;
  export let markComplete: (todo: Todo) => void;
  export let removeTodo: (todo: Todo) => void;

  function markTodoAsComplete(todo) {
    //first mark item completed
    markComplete(todo);
    //fire success alert
    Swal.fire({
      title: "Hurrrayy!",
      text: `You completed ${todo.text}`,
      icon: "success",
      toast: true,
      timer: 1000,
      showConfirmButton: false,
    });
  }

  function removingTodo(todo: Todo) {
    Swal.fire({
      title: "Are you sure?",
      text: `You will not be able to refer to ${todo.text} again`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      position: "center",
    }).then((result) => {
      if (result.value) {
        // call the prop remove todo to remove the todo
        removeTodo(todo);

        Swal.fire({
          title: "Deleted!",
          text: "Your todo item was deleted",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          toast: true,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your todo item is safe :)",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
          toast: true,
        });
      }
    });
  }
</script>

<div class="p-4 bg-gray-200 rounded-t-lg shadow-xl">
  <h3 class="font-bold">
    Task:
    <span class="font-medium tracking-wide text-blue-500">{todoInfo.text}</span>
  </h3>
  <div class="flex items-center justify-start mt-4">
    {#if todoInfo.status}
      <button class="btn-red" on:click={() => removingTodo(todoInfo)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    {:else}
      <button class="btn-green" on:click={() => markTodoAsComplete(todoInfo)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </button>
    {/if}
  </div>
</div>
