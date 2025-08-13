import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import AddRestaurant from "../pages/Add.jsx";
import UpdateRestaurant from "../pages/Update.jsx";
import LoginRestaurant from "../pages/LoginRestaurant.jsx";
import RegisterRestaurant from "../pages/Register.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

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
    path: "/update-restaurant",
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
