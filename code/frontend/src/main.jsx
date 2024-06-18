import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import SignupTempory from "./pages/SignupTempory";

const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SigninPage />,
    },
    {
        path: "/signup",
        element: <SignupTempory />,
    },
    {
        path: "/signup2",
        element: <SignupPage />,
    },
    {
        path: "/",
        element: <App />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>
);
