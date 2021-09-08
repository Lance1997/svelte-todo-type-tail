<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let open = false;

  function keydown(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.key === "Escape" && open) {
      open = false;
    }
  }
</script>

{#if open}
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        on:click|self|stopPropagation={() => (open = false)}
      />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        in:fly={{ y: -50, duration: 300 }}
        out:fly={{ y: -50, duration: 300, easing: quintOut }}
        on:keydown={keydown}
        tabindex={0}
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <!-- Heroicon name: outline/exclamation -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                <!-- Slot for modal header -->
                <slot name="header">
                  <!-- Fallback Header -->
                  Modal Header
                </slot>
              </h3>
              <div class="mt-5">
                <div class="text-md text-gray-500">
                  <!-- Modal Content -->
                  <slot name="content">
                    <!-- Fallback content -->
                    This is a fallback modal content. Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Voluptates, nemo odit ratione eveniet
                    temporibus consequuntur laudantium repellat fugiat nulla doloribus
                    atque molestiae inventore quos illo sequi expedita distinctio
                    ex quia?
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
          <slot name="action">
            <!-- Fallback Actions button -->
          </slot>
          <button
            on:click={() => (open = false)}
            type="button"
            class="btn-red sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm mt-3 w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
