import { render, screen, queryByTestId } from "@testing-library/react";
import App from "../App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TodoDueWarning from "../Components/TodoDueWarning";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const todos = [
  {
    id: 0,
    done: true,
    name: "Read Book",
    priority: "High",
    due: "2022-01-01",
    text: "Need to read the Accelerate book Building and Scaling high performing Organization",
  },
  {
    id: 1,
    done: false,
    name: "Buy Drinks",
    priority: "medium",
    due: "2022-01-05",
    text: "Need to buy some drinks for the party.",
  },
];

beforeEach(() => {
  jest.resetAllMocks();
  // Provide the data object to be returned
  mockedAxios.get.mockResolvedValue({
    data: todos,
    status: 200,
    statusText: "Ok",
  });
});

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
