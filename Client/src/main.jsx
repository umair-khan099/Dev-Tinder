import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./components/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/navbar",
    element: <Navbar />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
