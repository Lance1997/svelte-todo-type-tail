<script lang="ts">
  import Navigation from "./components/layouts/Navigation.svelte";
  import Modal from "./components/ui/Modal.svelte";
  import TodoList from "./lib/todos/TodoList.svelte";
  import Swal from "sweetalert2";
  import "sweetalert2/dist/sweetalert2.min.css";
  import type { Todo } from "./types";
  import { v4 as uuidv4 } from "uuid";
  import {
    deleteTodoList,
    getFromLocalStorage,
    refreshLocalStorage,
  } from "./helpers/storage";

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
  //create a filtered list that is rendered
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
    if (todoList !== undefined) {
      todoList = [...todoList, { id: uuidv4(), text: newTodo, status: false }];
    } else {
      todoList = [{ id: uuidv4(), text: newTodo, status: false }];
    }

    refreshLocalStorage(todoList);
    //fire success alert
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

  //remove todo
  function removeTodo(todo: Todo) {
    todoList = todoList.filter((item) => {
      return item.id !== todo.id;
    });
    refreshLocalStorage(todoList);
  }

  //remove all todos
  function removeAllTodos() {
    if (todoList && todoList.length) {
      //fire success alert
      Swal.fire({
        title: "Are you sure?",
        text: "Delete all todos",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete all!",
        cancelButtonText: "No, keep them",
        position: "center",
      }).then((result) => {
        if (result.value) {
          //empty todoList
          todoList = [];
          //empty localstorage
          refreshLocalStorage(todoList);
          //delete all todoList
          deleteTodoList();

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
            text: "Your todo items are safe :)",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
          });
        }
      });
    } else {
      //fire success alert
      Swal.fire({
        title: "Oops!",
        text: "Cannot clear, todo items list is empty",
        icon: "warning",
        toast: true,
        timer: 1000,
        showConfirmButton: false,
      });
    }
  }

  //mark a todo item complete
  function markComplete(todo: Todo) {
    //first find the todo item
    todoList.find((item) => item.id === todo.id).status = true;
    todoList = todoList;
    refreshLocalStorage(todoList);
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

<div class="relative min-h-screen bg-gray-50">
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
        class="w-full text-gray-600 bg-gray-100 border-gray-300 rounded-b-sm outline-none rounded-t-xl focus:ring-0 focus:outline-none focus:border-gray-500"
        placeholder="Enter Todo Item"
      />
    </div>
  </Modal>

  <Navigation {uncompletedFilter} allTodos={allTodosFilter} {completedFilter} />
  <main
    class="max-w-md p-4 mx-auto mt-4 mb-12 text-xl bg-gray-100 xl:max-w-5xl lg:max-w-3xl sm:max-w-lg md:max-w-2xl"
  >
    <!-- Greet User -->
    <h1 class="text-6xl font-bold text-center text-blue-900">{greeting}</h1>
    <p class="my-4 text-center text-blue-600">
      This is how your day looks like:
    </p>
    <!-- Add New Todo -->
    <div class="flex justify-end mb-4 space-x-12">
      <button class="btn-blue" on:click={() => (isOpen = true)}>
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
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </button>
      <button class="btn-red" on:click={removeAllTodos}>
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
    </div>
    <!-- Display Todos -->
    <div>
      <TodoList {markComplete} {removeTodo} todoList={filteredList} />
    </div>
  </main>
</div>
