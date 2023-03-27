import { render, screen, queryByTestId } from "@testing-library/react";
import App from "../App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TodoDueWarning from "../Components/TodoDueWarning";

test("renders default page", async () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/View Todo's/i)).toBeInTheDocument();
});

test("renders Create page", async () => {
  // Render a component
  act(() => {
    render(<App />, { wrapper: BrowserRouter });
  });

  // Fire event to trigger component update
  await act(
    async () =>
      await userEvent.click(
        screen.getByRole("button", {
          name: /create-todo/i,
        })
      )
  );

  expect(screen.getByText(/Create Todo's/i)).toBeInTheDocument();
});

it("Testing the Warning tag", async () => {
  render(<TodoDueWarning due={new Date()} />);
  expect(screen.getByText(new Date().toDateString()));
});