import React, { Fragment } from "react";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todoList: TodoItem[];
  toggleComplete: ToggleComplete;
  deleteTodo: DeleteToDo;
  editTodo: EditTodo;
}

const TodoList: React.FC<TodoListProps> = ({
  todoList,
  toggleComplete,
  deleteTodo,
  editTodo,
}) => {
  return (
    <Fragment>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
      ))}
    </Fragment>
  );
};

export default TodoList;
