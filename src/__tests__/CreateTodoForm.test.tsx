import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import CreateTodoForm from "../Components/CreateTodoForm";

it("renders a create todo form", async () => {
  let todo: TodoItem = {
    Name: "Add Unit Test",
    Text: "Add Unit test using React Library to the Todo App",
    Done: false,
    Due: new Date(2022, 1, 1),
    id: "1",
    priority: "High",
  };

  render(
    <CreateTodoForm
      existingTodo={todo}
      onAddingTodo={() => {}}
      onUpdateTodo={() => {}}
    />
  );

  expect(screen.getByTestId("create-todo-form")).toBeInTheDocument();
});

it("renders a edit todo form and check if it respond to update when submit button is clicked", async () => {
  let todo: TodoItem = {
    Name: "Add Unit Test",
    Text: "Add Unit test using React Library to the Todo App",
    Done: false,
    Due: new Date(2022, 1, 1),
    id: "1",
    priority: "High",
  };
  const mockOnAddingTodo = jest.fn();
  const mockOnUpdateTodo = jest.fn();

  // Render a component
  act(() => {
    render(
      <CreateTodoForm
        existingTodo={todo}
        onAddingTodo={mockOnAddingTodo}
        onUpdateTodo={mockOnUpdateTodo}
      />
    );
  });

  // Fire event to trigger component update
  await act(async () => {
    await userEvent.click(screen.getByTestId("create-todo-form-submit"));
  });
  // Assert if the function was called
  expect(mockOnUpdateTodo).toHaveBeenCalled();

  expect(screen.getByTestId("create-todo-form-submit")).toHaveTextContent(
    "Edit Task"
  );
});

it("renders a create todo form and check if the validation form prevend the add to be called when submit button is clicked", async () => {
  let todo: TodoItem = {
    Name: "Add Unit Test",
    Text: "Add Unit test using React Library to the Todo App",
    Done: false,
    Due: new Date(2022, 1, 1),
    id: "1",
    priority: "High",
  };

  const mockOnAddingTodo = jest.fn();
  const mockOnUpdateTodo = jest.fn();

  // Render a component
  act(() => {
    render(
      <CreateTodoForm
        existingTodo={undefined}
        onAddingTodo={mockOnAddingTodo}
        onUpdateTodo={mockOnUpdateTodo}
      />
    );
  });

  let nameTextBox = screen.getByRole("textbox", {
    name: /todo name/i,
  });

  let textTextBox = screen.getByRole("textbox", {
    name: /todo text/i,
  });

  // Fire event to trigger component update
  await act(async () => {
    await userEvent.clear(nameTextBox);
    await userEvent.type(nameTextBox, todo.Name);

    await userEvent.clear(textTextBox);
    await userEvent.type(textTextBox, todo.Text);

    await userEvent.click(screen.getByTestId("create-todo-form-submit"));
  });

  expect(nameTextBox).toHaveValue(todo.Name);
  expect(textTextBox).toHaveValue(todo.Text);

  // Assert if the function was called
  expect(mockOnAddingTodo).toHaveBeenCalled();

  expect(screen.getByTestId("create-todo-form-submit")).toHaveTextContent(
    "Add Task"
  );
});

it("renders a create todo form and check if it renders the validation error", async () => {
  let todo: TodoItem = {
    Name: "Add Unit Test",
    Text: "Add Unit test using React Library to the Todo App",
    Done: false,
    Due: new Date(2022, 1, 1),
    id: "1",
    priority: "High",
  };

  const mockOnAddingTodo = jest.fn();
  const mockOnUpdateTodo = jest.fn();

  // Render a component
  act(() => {
    render(
      <CreateTodoForm
        existingTodo={undefined}
        onAddingTodo={mockOnAddingTodo}
        onUpdateTodo={mockOnUpdateTodo}
      />
    );
  });


  // Fire event to trigger component update
  await act(async () => {
    await userEvent.selectOptions(screen.getByTestId('todo priority'), 'None');
    await userEvent.click(screen.getByTestId("create-todo-form-submit"));
  });

  // Assert if the function was called
  expect(mockOnAddingTodo).not.toHaveBeenCalled();
  expect(mockOnUpdateTodo).not.toHaveBeenCalled();

  expect(screen.getByTestId("text-error-name")).toHaveTextContent(
    "String must contain at least 2 character(s)"
  );

  expect(screen.getByTestId("text-error-text")).toHaveTextContent(
    "String must contain at least 2 character(s)"
  );

  expect(screen.getByTestId("text-error-priority")).toHaveTextContent(
    "Priority must be either High , Medium or Low"
  );
});
