import { render, screen } from "@testing-library/react";
import NotificationPanel from "../Components/UI/NotificationPanel";

it("renders an error notification panel", async () => {
  const message = "An error occured";

  render(<NotificationPanel isError={true} message={message} />);

  expect(screen.getByTestId("notification-panel")).toHaveTextContent(message);
  expect(
    screen.getByTestId("notification-panel").classList.contains("bg-danger")
  ).toBe(true);
});

it("renders an error notification panel", async () => {
  const message = "Todo added successfully";

  render(<NotificationPanel isError={false} message={message} />);

  expect(screen.getByTestId("notification-panel")).toHaveTextContent(message);
  expect(
    screen.getByTestId("notification-panel").classList.contains("bg-success")
  ).toBe(true);
});
