import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initDB } from "react-indexed-db-hook";
import { DBConfig } from "./db/dbConfig";

import Root from "./pages/Root";
import Home from "./pages/home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Debt from "./pages/Debt";
import Savings from "./pages/Savings";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "income",
        element: <Income />,
      },
      {
        path: "expense",
        element: <Expense />,
      },
      {
        path: "debt",
        element: <Debt />,
      },
      {
        path: "savings",
        element: <Savings />,
      },
    ],
  },
]);

initDB(DBConfig);

function App() {
  return (
    <div className="bg-background dark:bg-dark-background">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
