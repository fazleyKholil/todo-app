import { render, screen, queryByTestId } from "@testing-library/react";
import TodoItem from "../Components/TodoItem";

it("renders a todo item with a past date, Warning tag should be present", async () => {
  let todo: TodoItem = {
    Name: "Add Unit Test",
    Text: "Add Unit test using React Library to the Todo App",
    Done: false,
    Due: new Date(2022, 1, 1),
    id: "1",
    priority: "High",
  };

  render(
    <TodoItem
      onDeleteTodo={() => {}}
      onEditTodo={() => {}}
      toggleComplete={() => {}}
      todo={todo}
    />
  );

  expect(screen.getByTestId("todo-due-warning")).toBeInTheDocument();
});

it("renders a todo item with a future date, Warning tag should not be present", async () => {
  let todo: TodoItem = {
    Name: "Add Unit Test",
    Text: "Add Unit test using React Library to the Todo App",
    Done: false,
    Due: new Date(2024,5,5),
    id: "1",
    priority: "High",
  };

  render(
    <TodoItem
      onDeleteTodo={() => {}}
      onEditTodo={() => {}}
      toggleComplete={() => {}}
      todo={todo}
    />
  );

  expect(screen.queryByTestId("todo-due-warning")).not.toBeInTheDocument();
});
