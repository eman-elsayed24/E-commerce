import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";

test("renders app shell", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(screen.getByText(/prime market/i)).toBeInTheDocument();
});
