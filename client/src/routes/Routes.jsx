import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AddRestaurant from "../pages/AddRestaurant";
import UpdateRestaurant from "../pages/UpdateRestaurant";
import LoginRestaurant from "../pages/LoginRestaurant";
import RegisterRestaurant from "../pages/RegisterRestaurant";
import ProtectedRoute from "../Component/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-restaurant",
    element: (
      <ProtectedRoute>
        <AddRestaurant />
      </ProtectedRoute>
    ),
  },
  {
    path: "/update-restaurant/:id",
    element: (
      <ProtectedRoute>
        <UpdateRestaurant />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginRestaurant />,
  },
  {
    path: "/register",
    element: <RegisterRestaurant />,
  },
]);

export default router;
