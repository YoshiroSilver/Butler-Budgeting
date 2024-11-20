import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initDB } from "react-indexed-db-hook";
import { DBConfig } from "./db/dbConfig";

import Root from "./pages/Root";
import Home from "./pages/home";
import ErrorPage from "./pages/ErrorPage";
import CategoryPage from "./pages/CategoryPage";
import PaymentSchedule from "./pages/PaymentSchedule";

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
                element: (
                    <CategoryPage
                        dbName="income"
                        defaultItem={{
                            Name: "",
                            Amount: "",
                            Date: "",
                            Interval: "",
                            Category: "deposit",
                        }}
                    />
                ),
            },
            {
                path: "expense",
                element: (
                    <CategoryPage
                        dbName="expense"
                        defaultItem={{
                            Name: "",
                            Amount: "",
                            Date: "",
                            Interval: "",
                            Category: "withdrawal",
                        }}
                    />
                ),
            },
            {
                path: "debt",
                element: (
                    <CategoryPage
                        dbName="debt"
                        defaultItem={{
                            Name: "",
                            Amount: "",
                            Date: "",
                            Interval: "",
                            Total: "",
                            Category: "withdrawal",
                        }}
                    />
                ),
            },
            {
                path: "savings",
                element: (
                    <CategoryPage
                        dbName="savings"
                        defaultItem={{
                            Name: "",
                            Amount: "",
                            Date: "",
                            Interval: "",
                            Category: "other",
                        }}
                    />
                ),
            },
            {
                path: "paymentSchedule",
                element: <PaymentSchedule />,
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
