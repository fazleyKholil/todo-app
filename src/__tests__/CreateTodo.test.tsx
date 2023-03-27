import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateTodo from "../Components/Pages/CreateTodo";

test("renders a create todo page", async () => {
  render(<CreateTodo />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Create Todo's/i)).toBeInTheDocument();
});
