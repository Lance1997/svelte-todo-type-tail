<script lang="ts">
  import Navigation from "./components/layouts/Navigation.svelte";
  import Modal from "./components/ui/Modal.svelte";
  import TodoList from "./lib/todos/TodoList.svelte";
  import Swal from "sweetalert2";
  import "sweetalert2/dist/sweetalert2.min.css";
  import type { Todo } from "./types";
  import { v4 as uuidv4 } from "uuid";
  import { getFromLocalStorage, refreshLocalStorage } from "./helpers/storage";

  // Modal properties
  let isOpen = false;

  // construct user greeting from data
  let greeting;
  const myDate = new Date();
  const hrs = myDate.getHours();
  if (hrs < 12) greeting = "Good Morning";
  else if (hrs >= 12 && hrs <= 17) greeting = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24) greeting = "Good Evening";

  // set todo list to empty
  let todoList: Todo[] = [];
  //create a filtered list that
  //to avoid touching todo list
  //we'll manipulate and return this list instead
  $: filteredList = todoList;
  // store new todo item here
  let newTodo = "";

  //check local storage
  if (Storage) {
    // check for any todos and refresh the todo list
    const retrievedTodoList = getFromLocalStorage(todoList);
    todoList = retrievedTodoList;
  }

  // respond to adding new item to todo list
  function addNewTodo(event) {
    if (event.key === "Enter" || event.code === "Enter") {
      //send error if input is empty
      if (newTodo === "" || newTodo === null) {
        // ask user to add new item
        Swal.fire({
          title: "Oops",
          text: "Please add an item",
          icon: "error",
          toast: true,
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        addTodo();
      }
    } else {
      //set the value to the new item state
      newTodo = event.target.value;
    }
  }

  //add todo to the list
  function addTodo() {
    //add todos new item
    todoList = [...todoList, { id: uuidv4(), text: newTodo, status: false }];
    refreshLocalStorage(todoList);
    //reset the list of items
    filteredList = todoList;
    //fire success alet
    Swal.fire({
      title: "Yes!",
      text: `${newTodo} added to your tasks`,
      icon: "success",
      toast: true,
      timer: 1000,
      showConfirmButton: false,
    });
    //reset the newTodo
    newTodo = "";
    //disable the modal
    isOpen = false;
  }
  //TODO: remove todo
  function removeTodo(todo: Todo) {
    //TODO: perform action to remove todo
    console.log(todo);

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
    <div slot="header">
      Add New Todo <span class="text-sm text-gray-500"
        >(press enter to after entering todo)</span
      >
    </div>
    <div slot="content">
      <input
        bind:value={newTodo}
        type="text"
        on:keydown={addNewTodo}
        class="outline-none border-gray-300 rounded-t-xl rounded-b-sm w-full text-gray-600 focus:ring-0 focus:outline-none focus:border-gray-500 bg-gray-100"
        placeholder="Enter Todo Item"
      />
    </div>
  </Modal>

  <Navigation {uncompletedFilter} allTodos={allTodosFilter} {completedFilter} />
  <main
    class="max-w-md p-4 mx-auto mt-4 text-xl bg-gray-100 xl:max-w-5xl lg:max-w-3xl sm:max-w-lg md:max-w-2xl mb-12"
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
