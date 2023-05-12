import React from "react";
import ReactDOM from "react-dom/client";
import HomeApp from "./pages/HomeApp";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { NewProduct } from "./pages/NewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeApp />,
  },
  {
    path: "/src/pages/NewProduct.jsx",
    element: <NewProduct />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
