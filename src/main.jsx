import React from "react";
import ReactDOM from "react-dom/client";
import HomeApp from "./pages/HomeApp";
import NewProduct from "./pages/NewProduct";
import PageProduct from "./pages/PageProduct";
import ErrorPage from "./pages/ErrorPage";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "NewProduct",
    element: <NewProduct />,
  },
  {
    path: "PageProduct",
    element: <PageProduct />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
