interface TodoItem {
  done: boolean;
  name: string;
  priority: string;
  due: Date;
  text: string;
  id: string;
}

type AddTodo = (newTodo: TodoItem) => void;
type UpdateTodo = (newTodo: TodoItem) => void;
type HandleError = (message: string) => void;
type ToggleComplete = (selectedTodo: TodoItem) => void;
type DeleteToDo = (todo: TodoItem) => void;
type EditTodo = (todo: TodoItem) => void;

