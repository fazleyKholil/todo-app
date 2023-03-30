import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TodoList from "../Components/TodoList";

const testTodos: TodoItem[] = [
  {
    name: "Add Unit Test",
    text: "Add Unit test using React Library to the Todo App",
    done: false,
    due: new Date(2022, 1, 1),
    id: "1",
    priority: "High",
  },
  {
    name: "Online Course",
    text: "Watch Pluralsight course on Docker",
    done: false,
    due: new Date(2024, 1, 1),
    id: "2",
    priority: "Medium",
  },
];

it("renders a todo list with some todo items", async () => {
  // Render a component
  act(() => {
    render(
      <TodoList
        todoList={testTodos}
        deleteTodo={() => {}}
        editTodo={() => {}}
        toggleComplete={() => {}}
      />
    );
  });

  expect(screen.getByText("Add Unit Test")).toBeInTheDocument();
  expect(screen.getByText("Online Course")).toBeInTheDocument();
});
