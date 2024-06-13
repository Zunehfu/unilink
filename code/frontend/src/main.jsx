import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import Signup from "./pages/Signup";
import SigninPage from "./pages/SigninPage";
import NewProfile from "./components/NewProfile";
import Loader from "./components/laoders/Loader";
import ABC from "./components/ABC";

const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SigninPage />,
    },
    {
        path: "/abc",
        element: <ABC />,
    },
    {
        path: "/profile",
        element: <NewProfile />,
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
