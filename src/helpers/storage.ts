import type { Todo } from "src/types";

const storageName = "svelteTodos";

export function getFromLocalStorage(todoList: Todo[]) {
  const reference = localStorage.getItem(storageName);
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todoList = JSON.parse(reference);
    return todoList;
  }
}

export function refreshLocalStorage(todoList: Todo[]): void {
  //check if user has local storage available
  if (Storage) {
    //set the todo item in storage
    // conver the array to string then store it.
    localStorage.setItem(storageName, JSON.stringify(todoList));
  }
}
