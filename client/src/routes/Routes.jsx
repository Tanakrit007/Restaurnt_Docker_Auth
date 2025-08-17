import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import AddRestaurant from "../pages/AddRestaurant";
import UpdateRestaurant from "../pages/UpdateRestaurant";
import LoginRestaurant from "../pages/LoginRestaurant";
import RegisterRestaurant from "../pages/RegisterRestaurant";
import ProfilePage from "../pages/ProfilePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/add-restaurant",
        element: <AddRestaurant />,
    },
    {
        path: "/update-restaurant/:id",
        element: <UpdateRestaurant />,
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
]);

export default router;