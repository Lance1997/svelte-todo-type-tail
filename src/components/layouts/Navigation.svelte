<script lang="ts">
  import Logo from "../../assets/icons/logo.png";

  export let completedFilter;
  export let allTodos;
  export let uncompletedFilter;
</script>

<nav class="">
  <div
    class="flex flex-wrap items-center justify-between h-auto max-w-md px-4 mx-auto sm:flex-row xl:max-w-5xl lg:max-w-3xl sm:max-w-lg md:max-w-2xl"
  >
    <div class="flex-grow">
      <img
        src={Logo}
        alt="App Logo"
        class="object-center w-28 h-28 sm:w-36 sm:h-36"
      />
    </div>

    <div>
      <ul class="flex flex-row flex-wrap space-x-8">
        <li
          on:click={allTodos}
          class="flex items-center justify-center p-2 text-white transition duration-150 transform bg-gray-800 rounded-full cursor-pointer hover:bg-gray-600 hover:translate-y-2"
        >
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </li>
        <li
          on:click={uncompletedFilter}
          class="flex items-center justify-center p-2 text-white transition duration-150 transform bg-gray-800 rounded-full cursor-pointer hover:bg-gray-600 hover:translate-y-2"
        >
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
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </li>
        <li
          class="flex items-center justify-center p-2 text-white transition duration-150 transform bg-gray-800 rounded-full cursor-pointer hover:bg-gray-600 hover:translate-y-2"
          on:click={completedFilter}
        >
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
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </li>
      </ul>
    </div>
  </div>
</nav>
