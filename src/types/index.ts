export type Todo = {
  id: string;
  text: string;
  status: boolean;
};

export type ReadOnlyTodo = Readonly<Todo>;

export type CompletedTodo = Todo & {
  readonly status: true;
};
