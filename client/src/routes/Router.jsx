import { createBrowserRouter } from "react-router";
import { Add } from "../pages/Add";
import Update from "../pages/Update";
import Home from "../pages/Home";
import { Register } from "../pages/Register";
import path from "path";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
