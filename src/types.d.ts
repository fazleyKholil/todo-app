interface TodoItem {
  Done: boolean;
  Name: string;
  priority: string;
  Due: Date;
  Text: string;
  id: string;
}

type AddTodo = (newTodo: TodoItem) => void;
type UpdateTodo = (newTodo: TodoItem) => void;
type HandleError = (message: string) => void;
type ToggleComplete = (selectedTodo: TodoItem) => void;
type DeleteToDo = (todo: TodoItem) => void;
type EditTodo = (todo: TodoItem) => void;

interface TodoFormProps {
  onAddingTodo: AddTodo;
  onUpdateTodo: UpdateTodo;
  existingTodo: TodoItem | undefined;
}
