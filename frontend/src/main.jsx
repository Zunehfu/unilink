import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import SigninPage from "./pages/SigninPage";

const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SigninPage />,
    },
    {
        path: "/",
        element: <Home />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>
);
