import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/sweetalert-custom.css";
import router from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navber from "./Component/Navbar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProvider></AuthProvider> */}
    {/* <Navber /> */}
    <RouterProvider router={router} />
  </StrictMode>
);