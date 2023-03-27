import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TodoList from "../Components/TodoList";

const testTodos: TodoItem[] = [
    {
      Name: "Add Unit Test",
      Text: "Add Unit test using React Library to the Todo App",
      Done: false,
      Due: new Date(2022, 1, 1),
      id: "1",
      priority: "High",
    },
    {
      Name: "Online Course",
      Text: "Watch Pluralsight course on Docker",
      Done: false,
      Due: new Date(2024, 1, 1),
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
