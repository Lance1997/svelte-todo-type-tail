<script lang="ts">
  import Navigation from "./components/layouts/Navigation.svelte";
  import TodoList from "./lib/todos/TodoList.svelte";
  import type { Todo } from "./types";

  // construct user greeting from data
  let greeting;
  const myDate = new Date();
  const hrs = myDate.getHours();
  if (hrs < 12) greeting = "Good Morning";
  else if (hrs >= 12 && hrs <= 17) greeting = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24) greeting = "Good Evening";

  // Generate sample todo list
  $: todoList = [
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

<div class="min-h-screen bg-gray-50">
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
      <button class="btn-blue">Add Todo</button>
    </div>
    <!-- Display Todos -->
    <div>
      <TodoList todoList={filteredList} />
    </div>
  </main>
</div>
