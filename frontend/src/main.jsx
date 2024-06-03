import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import Signup from "./pages/Signup";
import SigninPage from "./pages/SigninPage";

const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SigninPage />,
    },
    {
        path: "/signup",
        element: <Signup />,
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
