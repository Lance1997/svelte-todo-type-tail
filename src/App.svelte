<script lang="ts">
  import Navigation from "./components/layouts/Navigation.svelte";
  import Modal from "./components/ui/Modal.svelte";
  import TodoList from "./lib/todos/TodoList.svelte";
  import "sweetalert2/dist/sweetalert2.min.css";
  import type { Todo } from "./types";
  import { v4 as uuidv4 } from "uuid";

  // Modal properties
  let isOpen = false;

  // construct user greeting from data
  let greeting;
  const myDate = new Date();
  const hrs = myDate.getHours();
  if (hrs < 12) greeting = "Good Morning";
  else if (hrs >= 12 && hrs <= 17) greeting = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24) greeting = "Good Evening";

  // Generate sample todo list
  const todoList = [
    {
      id: "lksjdf8448",
      text: "Go to school",
      status: true,
    },
    {
      id: "lksj7cd448",
      text: "Go to the market",
      status: false,
    },
    {
      id: "lksjdf8627",
      text: "Go to the mall",
      status: true,
    },
    {
      id: "lksjdf8j8u",
      text: "Find my shoes",
      status: false,
    },
  ];

  //create a filtered list that
  //to avoid touching todo list
  //we'll manipulate and return this list instead
  $: filteredList = todoList;

  //TODO: add todo
  function addTodo(todo: Todo) {
    //TODO: perform action to add todo

    //reset the list of items
    filteredList = todoList;
  }
  //TODO: remove todo
  function removeTodo(todo: Todo) {
    //TODO: perform action to remove todo
    console.log(todo);
    let myuuid = uuidv4();

    console.log("Your UUID is: " + myuuid);

    //reset the list of items
    filteredList = todoList;
  }

  function completedFilter() {
    filteredList = todoList.filter((item) => item.status === true);
  }

  function uncompletedFilter() {
    filteredList = todoList.filter((item) => item.status === false);
  }

  function allTodosFilter() {
    filteredList = todoList;
  }
</script>

<div class="min-h-screen bg-gray-50 relative">
  <Modal bind:open={isOpen}>
    <div slot="header">Add New Todo</div>
    <div slot="content">
      <input
        type="text"
        class="outline-none border-gray-300 rounded-t-xl rounded-b-sm w-full text-gray-600 focus:ring-0 focus:outline-none focus:border-gray-500 bg-gray-100"
        placeholder="Enter Todo Item"
      />
    </div>
    <div slot="action">
      <button
        type="button"
        class="btn-green sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm mt-3 w-full px-4"
      >
        Save
      </button>
    </div>
  </Modal>

  <Navigation {uncompletedFilter} allTodos={allTodosFilter} {completedFilter} />
  <main
    class="max-w-md p-4 mx-auto mt-4 text-xl bg-gray-100 xl:max-w-5xl lg:max-w-3xl sm:max-w-lg md:max-w-2xl"
  >
    <!-- Greet User -->
    <h1 class="text-6xl font-bold text-center text-blue-900">{greeting}</h1>
    <p class="my-4 text-center text-blue-600">
      This is how your day looks like:
    </p>
    <!-- Add New Todo -->
    <div class="flex justify-end mb-4">
      <button class="btn-blue" on:click={() => (isOpen = true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </button>
    </div>
    <!-- Display Todos -->
    <div>
      <TodoList {removeTodo} todoList={filteredList} />
    </div>
  </main>
</div>
