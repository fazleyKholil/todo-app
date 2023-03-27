import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TodoItem from "../Components/TodoItem";


it("renders a todo item", async () => {
  let todo: TodoItem = {
    Name: "Add Unit Test",
    Text: "Add Unit test using React Library to the Todo App",
    Done: false,
    Due: new Date(2024, 1, 1),
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

  expect(screen.getByTestId("todo-name")).toHaveTextContent(todo.Name);
  expect(screen.getByTestId("todo-text")).toHaveTextContent(todo.Text);
  expect(screen.getByTestId("todo-due")).toHaveTextContent(
    todo.Due.toDateString()
  );
  expect(screen.queryByTestId("todo-due-warning")).not.toBeInTheDocument();
  // expect(screen.getByTestId('todo-due-warning')).toEqual(null);
});

it("renders a todo item", async () => {
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

  expect(screen.getByTestId("todo-name")).toHaveTextContent(todo.Name);
  expect(screen.getByTestId("todo-text")).toHaveTextContent(todo.Text);
  expect(screen.getByTestId("todo-due")).toHaveTextContent(
    todo.Due.toDateString()
  );
});

it("renders a todo item and click toggle complete", async () => {
  let todo: TodoItem = {
    Name: "Add Unit Test",
    Text: "Add Unit test using React Library to the Todo App",
    Done: true,
    Due: new Date(2022, 1, 1),
    id: "1",
    priority: "High",
  };

  const mockToggleComplete = jest.fn();
  const mockEditTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  // Render a component
  act(() => {
    render(
      <TodoItem
        onDeleteTodo={mockDeleteTodo}
        onEditTodo={mockEditTodo}
        toggleComplete={mockToggleComplete}
        todo={todo}
      />
    );
  });

  // Fire event to trigger component update
  await act(
    async () => {
      await userEvent.click(screen.getByTestId("todo-item-check"))
      await userEvent.click(screen.getByTestId("todo-item-edit"))
      await userEvent.click(screen.getByTestId("todo-item-delete"))
    }
    
  );
  // Assert if the function was called
  expect(mockToggleComplete).toHaveBeenCalled();
  expect(mockEditTodo).toHaveBeenCalled();
  expect(mockDeleteTodo).toHaveBeenCalled();
});

it("renders a todo item and click toggle complete", async () => {
  let todo: TodoItem = {
    Name: "Add Unit Test",
    Text: "Add Unit test using React Library to the Todo App",
    Done: true,
    Due: new Date(2022, 1, 1),
    id: "1",
    priority: "High",
  };


  // Render a component
  act(() => {
    render(
      <TodoItem
        onDeleteTodo={() => {}}
        onEditTodo={() => {}}
        toggleComplete={() => {}}
        todo={todo}
      />
    );
  });

  //assert if the checkbox was checked
  expect(screen.getByRole("checkbox")).toBeChecked();
});

