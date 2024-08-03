//Keep index.css always at the top (else CSS priority will collapse)
import "./index.css";

//react
import React from "react";
import ReactDOM from "react-dom/client";

//libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//component
import App from "./pages/App";
import SigninPage from "./pages/SigninPage";
import SignupExperimental from "./pages/SignupExperimental";
import SignupPage from "./pages/SignupPage";

const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SigninPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/signup2",
        element: <SignupExperimental />,
    },
    {
        path: "/",
        element: <App />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
