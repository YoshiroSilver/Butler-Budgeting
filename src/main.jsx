import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <div className="h-screen w-screen bg-background bg-cover dark:bg-dark-background">
    <StrictMode>
      <App />
    </StrictMode>
  </div>,
);
