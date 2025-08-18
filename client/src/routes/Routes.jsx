import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AddRestaurant from "../pages/AddRestaurant";
import UpdateRestaurant from "../pages/UpdateRestaurant";
import LoginRestaurant from "../pages/LoginRestaurant";
import RegisterRestaurant from "../pages/RegisterRestaurant";
import ProfilePage from "../pages/ProfilePage";
import Notallowed from "../pages/Notallowed";
import Userpage from "../pages/Userpage";
import AdminPage from "../pages/Adminpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-restaurant",
    element: (
      <Userpage>
        <AddRestaurant />
      </Userpage>
    ),
  },
  {
    path: "/update-restaurant/:id",
    element: (
      <Userpage>
        <UpdateRestaurant />
      </Userpage>
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
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/notallowed",
    element: <Notallowed />,
  },
]);

export default router;
