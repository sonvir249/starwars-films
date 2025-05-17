import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import "./index.css";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
